"use client";

import { useState } from "react";
import { Button } from "@/cosmic/elements/Button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface ForgotPasswordFormProps {
  onSubmit: (formData: FormData) => Promise<any>;
}

export default function ForgotPasswordForm({
  onSubmit,
}: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await onSubmit(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      setSuccess(true);
    } catch (err: any) {
      console.error(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 text-center">
        <h2 className="text-xl font-bold mb-4">Check Your Email</h2>
        <p className="mb-4">
          If an account exists with that email address, we've sent instructions
          to reset your password.
        </p>
        <Link href="/login" className="text-orange-600">
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Reset Password</h1>
      <p className="text-center text-gray-600">
        Enter your email address and we'll send you instructions to reset your
        password.
      </p>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email address"
          className="w-full p-2 border rounded"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Send Reset Instructions"
        )}
      </Button>

      <div className="text-sm text-center">
        <Link href="/login" className="text-orange-600">
          Back to login
        </Link>
      </div>
    </form>
  );
}