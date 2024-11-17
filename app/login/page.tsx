// app/login/page.tsx
import { Suspense } from "react";
import LoginClient from "@/cosmic/blocks/user-management/LoginClient";
import { login } from "@/cosmic/blocks/user-management/actions";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense
        fallback={
          <Loader2 className="text-orange-600 mx-auto w-8 h-8 animate-spin" />
        }
      >
        <LoginClient onSubmit={login} redirect="/dashboard" />
      </Suspense>
    </div>
  );
}
