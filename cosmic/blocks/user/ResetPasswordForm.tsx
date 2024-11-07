"use client";

import { useState } from "react";
import { Button } from "@/cosmic/elements/Button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  token: string;
  onSubmit: (token: string, formData: FormData) => Promise<any>;
}

export default function ResetPasswordForm({
  token,
  onSubmit,
}: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const result = await onSubmit(token, formData);

      if (result.error) {
        throw new Error(result.error);
      }

      // Redirect to login with success message
      router.push(
        "/login?success=Password reset successful. Please login with your new password."
      );
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Reset Your Password</h1>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          placeholder="Enter your new password"
          className="w-full p-2 border rounded"
        />
        <p className="text-sm text-gray-500 mt-1">
          Password must be at least 8 characters long and contain both letters
          and numbers
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          minLength={8}
          placeholder="Confirm your new password"
          className="w-full p-2 border rounded"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
