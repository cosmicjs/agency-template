"use client";

import { useAuth } from "@/cosmic/context/AuthContext";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-900 dark:data-[state=open]:bg-zinc-900 md:w-max"
      >
        Login
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        logout();
        router.push("/");
      }}
      className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-900 dark:data-[state=open]:bg-zinc-900 md:w-max"
    >
      Logout
    </button>
  );
}
