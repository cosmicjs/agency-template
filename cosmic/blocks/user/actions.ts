"use server";

import { cosmic } from "@/cosmic/client";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function signUp(formData: FormData) {
  try {
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
      // User does not exist
    }

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    // Generate verification code
    const verificationCode = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

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
        verification_code: verificationCode,
        verification_expiry: verificationExpiry,
      },
    });

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?code=${verificationCode}`;

    try {
      await resend.emails.send({
        from: "Cosmic Support <support@cosmicjs.com>",
        to: email,
        subject: "Verify your email address",
        html: `
          <h1>Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}!</h1>
          <p>Please click the link below to verify your email address:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>
        `,
      });
      console.log(`Verification email sent to ${email}`);
    } catch (error) {
      console.error("Error sending verification email:", error);
      return {
        success: false,
        error: "Failed to send verification email. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: "Failed to create account. Please try again.",
    };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await cosmic.objects
      .findOne({
        type: "users",
        "metadata.email": email,
        "metadata.email_verified": true,
      })
      .props(["id", "title", "metadata"])
      .depth(0);

    if (!result.object) {
      return { error: "Invalid email or password" };
    }

    const isValid = await bcrypt.compare(
      password,
      result.object.metadata.password
    );

    if (!isValid) {
      return { error: "Invalid email or password" };
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
    return { error: "Invalid email or password" };
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

// Add new verification function
export async function verifyEmail(code: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: "users",
        "metadata.verification_code": code,
      })
      .props(["id", "metadata"])
      .depth(0);

    if (!object) {
      throw new Error("Invalid verification code");
    }

    const verificationExpiry = new Date(object.metadata.verification_expiry);
    if (verificationExpiry < new Date()) {
      throw new Error("Verification code has expired");
    }

    await cosmic.objects.updateOne(object.id, {
      metadata: {
        email_verified: true,
        verification_code: "",
        verification_expiry: "",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error verifying email:", error);
    throw new Error("Email verification failed");
  }
}
