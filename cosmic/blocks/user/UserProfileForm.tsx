"use client";

import { useState } from "react";
import { useAuth } from "@/cosmic/blocks/user/AuthContext";
import Image from "next/image";
import { Button } from "@/cosmic/elements/Button";
import { updateUserProfile } from "./actions";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : (
        "Update Profile"
      )}
    </Button>
  );
}

export function UserProfileForm({ user }: UserProfileFormProps) {
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    setMessage("");

    try {
      const result = await updateUserProfile(user.id, formData);

      if (result.success) {
        // Update local storage with new user data
        login(localStorage.getItem("token") || "", {
          id: result.data.id,
          name: result.data.title,
          email: result.data.metadata.email,
          image: result.data.metadata.avatar?.imgix_url,
        });

        setMessage("Profile updated successfully!");
      } else {
        setMessage("Error updating profile");
      }
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.metadata.avatar?.imgix_url || null
  );

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsAvatarUploading(true);
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setIsAvatarUploading(false);
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
            className={`rounded-full object-cover ${isAvatarUploading ? "opacity-50" : ""}`}
            priority
          />
          {isAvatarUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
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

      {message && (
        <div
          className={`text-center ${message.startsWith("Error") ? "text-red-500" : "text-green-500"}`}
        >
          {message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
