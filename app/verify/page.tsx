// app/verify/page.tsx
import { Suspense } from "react";
import VerifyClient from "@/cosmic/blocks/user-management/VerifyClient";
import { Loader2 } from "lucide-react";

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <Loader2 className="text-orange-600 mx-auto w-8 h-8 animate-spin" />
      }
    >
      <VerifyClient />
    </Suspense>
  );
}
