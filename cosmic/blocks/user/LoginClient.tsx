"use client";
import { useAuth } from "@/cosmic/blocks/user/AuthContext";
import AuthForm from "@/cosmic/blocks/user/AuthForm";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginClient({ onSubmit }: { onSubmit: any }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");

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

  return (
    <>
      {success && (
        <div className="max-w-md mx-auto mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="max-w-md mx-auto mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <AuthForm type="login" onSubmit={onSubmit} />
    </>
  );
}
