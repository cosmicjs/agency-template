"use client";
import { useAuth } from "@/cosmic/blocks/user/AuthContext";
import AuthForm from "@/cosmic/blocks/user/AuthForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginClient({ onSubmit }: { onSubmit: any }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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

  return <AuthForm type="login" onSubmit={onSubmit} />;
}
