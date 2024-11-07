"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/cosmic/blocks/user/AuthContext";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/cosmic/elements/Button";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit?: (data: FormData) => Promise<any>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (type === "login") {
        if (onSubmit) {
          const response = await onSubmit(formData);
          if (response && response.token && response.user) {
            authLogin(response.token, response.user);
            setTimeout(() => {
              router.push("/dashboard");
              router.refresh();
            }, 100);
          } else {
            throw new Error("Invalid login response");
          }
        }
      } else {
        if (onSubmit) {
          await onSubmit(formData);
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        {type === "login" ? "Login" : "Sign Up"}
      </h1>

      {type === "signup" && (
        <>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="Enter your first name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="Enter your last name"
              className="w-full p-2 border rounded"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email address"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Enter your password"
          className="w-full p-2 border rounded"
        />
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : type === "login" ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </Button>

      <div className="text-center text-sm">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="text-orange-600">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-orange-600">
              Login
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
