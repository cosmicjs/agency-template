// Split into client and server components
import LoginClient from "@/cosmic/blocks/user/LoginClient";
import { login } from "@/cosmic/blocks/user/actions";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <LoginClient onSubmit={login} />
    </div>
  );
}
