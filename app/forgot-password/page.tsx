import ForgotPasswordForm from "@/cosmic/blocks/user/ForgotPasswordForm";
import { forgotPassword } from "@/cosmic/blocks/user/actions";

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <ForgotPasswordForm onSubmit={forgotPassword} />
    </div>
  );
}
