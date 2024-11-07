"use client";

import { useState } from "react";
import { cosmic } from "@/cosmic/client";
import { useAuth } from "@/cosmic/context/AuthContext";
import Image from "next/image";
import { Button } from "@/cosmic/elements/Button";

interface UserProfileFormProps {
  user: {
    id: string;
    metadata: {
      first_name: string;
      last_name: string;
      email: string;
      email_verified: boolean;
      avatar?: {
        imgix_url: string;
      };
    };
  };
}

export function UserProfileForm({ user }: UserProfileFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    setIsUpdating(true);
    setMessage("");

    try {
      // Update user logic here
      const response = await cosmic.objects.updateOne(user.id, {
        metadata: {
          first_name: formData.get("firstName"),
          last_name: formData.get("lastName"),
          email: formData.get("email"),
        },
      });

      // Update local storage with new user data
      login(localStorage.getItem("token") || "", {
        id: response.object.id,
        name: response.object.title,
        email: response.object.metadata.email,
        image: response.object.metadata.avatar?.imgix_url,
      });

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.metadata.avatar?.imgix_url || null
  );

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <form action={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32">
          <Image
            src={
              avatarPreview ||
              "https://imgix.cosmicjs.com/fe57f880-b0a3-11ee-9844-f9a09795e2a3-Visual_dark.png?w=300&h=300"
            }
            alt="Profile avatar"
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>
        <div>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <label
            htmlFor="avatar"
            className="cursor-pointer px-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Change Avatar
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          defaultValue={user.metadata.first_name}
          required
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          defaultValue={user.metadata.last_name}
          required
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user.metadata.email}
          required
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
        />
        {!user.metadata.email_verified && (
          <p className="text-sm text-amber-600 mt-1">Email not verified</p>
        )}
      </div>

      {message && <div className="text-green-500 text-center">{message}</div>}

      <Button type="submit" disabled={isUpdating}>
        Update Profile
      </Button>
    </form>
  );
}
