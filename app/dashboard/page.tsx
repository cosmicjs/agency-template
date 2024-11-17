// app/dashboard/page.tsx
import { Suspense } from "react";
import DashboardClient from "@/cosmic/blocks/user-management/DashboardClient";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense
        fallback={
          <Loader2 className="text-orange-600 mx-auto w-8 h-8 animate-spin" />
        }
      >
        <DashboardClient />
      </Suspense>
    </div>
  );
}
