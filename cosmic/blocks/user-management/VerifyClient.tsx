"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/cosmic/blocks/user-management/actions";
import { Loader2 } from "lucide-react";

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (verificationAttempted.current) return;

      const code = searchParams.get("code");
      verificationAttempted.current = true;

      if (!code) {
        router.push("/login?error=Invalid verification link");
        return;
      }

      try {
        await verifyEmail(code);
        router.push(
          "/login?success=Email verified successfully. You may now log in."
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Verification failed";
        router.push(`/login?error=${encodeURIComponent(errorMessage)}`);
      }
    };

    verifyUserEmail();
  }, [searchParams, router]);

  return (
    <div className="flex h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="size-8 animate-spin text-orange-600" />
        <p className="text-gray-600 dark:text-gray-400">
          Verifying your email...
        </p>
      </div>
    </div>
  );
}
