"use client";

import { useAuth } from "@/cosmic/context/AuthContext";
import { UserProfileForm } from "@/cosmic/blocks/user/UserProfileForm";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getUserData } from "@/cosmic/blocks/user/actions";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login");
    }

    if (user) {
      getUserData(user.id).then(({ data, error }) => {
        if (error) {
          setError(error);
          return;
        }
        setUserData(data);
      });
    }
  }, [user, isLoading]);

  if (isLoading || !userData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="py-4">
      <section className="pb-8 m-auto px-4">
        <div className="m-auto max-w-[950px] flex flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl md:text-4xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
            Welcome, {userData.metadata.first_name}!
          </h1>
          <UserProfileForm user={userData} />
        </div>
      </section>
    </main>
  );
}
