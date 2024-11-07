"use client";
import { useAuth } from "@/cosmic/blocks/user/AuthContext";
import AuthForm from "@/cosmic/blocks/user/AuthForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignUpClient({ onSubmit }: { onSubmit: any }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isSignupComplete, setIsSignupComplete] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] p-4">
        <Loader2 className="text-orange-600 w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isSignupComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Check your email</h2>
        <p className="text-gray-600 mb-6 dark:text-gray-300">
          We've sent you a verification link. Please check your email to
          complete the signup process.
        </p>
        <Link href="/login" className="text-orange-600 hover:text-orange-700">
          Go to login
        </Link>
      </div>
    );
  }

  const handleSubmit = async (...args: any[]) => {
    try {
      const result = await onSubmit(...args);
      if (result.success) {
        setIsSignupComplete(true);
      }
    } catch (error) {
      // Error handling is already done in AuthForm
      console.error(error);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSubmit} />;
}
