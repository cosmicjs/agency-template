"use server";

import { cosmic } from "@/cosmic/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // Check if user already exists
  let existingUser;
  try {
    existingUser = await cosmic.objects
      .findOne({
        type: "users",
        "metadata.email": email,
      })
      .props(["metadata"])
      .depth(0);
  } catch (err) {
    console.error(err);
  }

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  await cosmic.objects.insertOne({
    title: `${firstName} ${lastName}`,
    type: "users",
    metadata: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
      active_status: true,
      email_verified: false,
    },
  });

  return { success: true };
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await cosmic.objects
      .findOne({
        type: "users",
        "metadata.email": email,
      })
      .props(["id", "title", "metadata"])
      .depth(0);

    if (!result.object) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(
      password,
      result.object.metadata.password
    );

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const user = {
      id: result.object.id,
      name: result.object.title,
      email: result.object.metadata.email,
      image: result.object.metadata.avatar?.imgix_url,
    };

    // Generate token
    const token = Buffer.from(result.object.id).toString("base64");

    return { token, user };
  } catch (error) {
    throw new Error("Login failed");
  }
}

export async function getUserData(userId: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({
        id: userId,
        type: "users",
      })
      .props("id,title,metadata")
      .depth(0);

    return { data: object, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch user data" };
  }
}

export async function getUserFromCookie() {
  const cookieStore = cookies();
  const userId = cookieStore.get("user_id");

  if (!userId) {
    return null;
  }

  try {
    const result = await cosmic.objects
      .findOne({
        type: "users",
        id: userId.value,
      })
      .props(["id", "metadata.name", "metadata.email", "metadata.image"])
      .depth(0);

    if (!result) {
      return null;
    }

    return {
      id: result.object.id,
      name: result.object.metadata.name,
      email: result.object.metadata.email,
      image: result.object.metadata.image,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

async function uploadFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const media = { originalname: file.name, buffer };
  return await cosmic.media.insertOne({
    media,
  });
}

export async function updateUserProfile(userId: string, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const avatar = formData.get("avatar") as File;

    const metadata: any = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    let updates: {
      title: string;
      metadata: any;
      thumbnail?: string;
    } = {
      title: `${firstName} ${lastName}`,
      metadata,
    };

    // Handle avatar upload if provided
    if (avatar && avatar.size > 0) {
      const { media } = await uploadFile(avatar);
      metadata.avatar = media.name;
      updates.thumbnail = media.name;
    }

    const { object } = await cosmic.objects.updateOne(userId, updates);

    return { success: true, data: object };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
