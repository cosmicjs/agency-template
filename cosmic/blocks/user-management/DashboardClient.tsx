"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/cosmic/blocks/user-management/actions";
import { useAuth } from "@/cosmic/blocks/user-management/AuthContext";
import { UserProfileForm } from "@/cosmic/blocks/user-management/UserProfileForm";
import { Loader2 } from "lucide-react";

export default function DashboardClient() {
  const { user, isLoading, logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkUserAndFetchData = async () => {
      if (isLoading) return;

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const { data, error } = await getUserData(user.id);

        if (!isMounted) return;

        if (error) {
          if (error === "Account is not active") {
            logout();
            router.push("/login?error=Your account is no longer active");
            return;
          }
          setError(error);
        } else {
          setUserData(data);
        }
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to fetch user data");
      }
    };

    checkUserAndFetchData();

    return () => {
      isMounted = false;
    };
  }, [user, isLoading, logout, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <Loader2 className="size-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (error === "Account is not active") {
    return null; // Don't show anything while redirecting
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <Loader2 className="size-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 px-4">
      <h1 className="font-display mb-4 text-3xl leading-tight tracking-tighter text-zinc-900 dark:text-zinc-100 md:text-4xl">
        Welcome, {userData.metadata.first_name}!
      </h1>
      <UserProfileForm user={userData} />
    </div>
  );
}
