import SignUpClient from "@/cosmic/blocks/user/SignUpClient";
import { signUp } from "@/cosmic/blocks/user/actions";

export default function SignUpPage() {
  return <SignUpClient onSubmit={signUp} />;
}
