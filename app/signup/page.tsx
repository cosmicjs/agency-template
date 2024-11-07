import SignUpClient from "@/cosmic/blocks/user/SignUpClient";
import { signUp } from "@/cosmic/blocks/user/actions";

export default function SignUpPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SignUpClient onSubmit={signUp} />
    </div>
  );
}
