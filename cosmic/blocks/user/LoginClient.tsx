"use client";
import { useAuth } from "@/cosmic/context/AuthContext";
import AuthForm from "@/cosmic/blocks/user/AuthForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginClient({ onSubmit }: { onSubmit: any }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return <AuthForm type="login" onSubmit={onSubmit} />;
}
