import ForgotPasswordForm from "@/cosmic/blocks/user/ForgotPasswordForm";
import { forgotPassword } from "@/cosmic/blocks/user/actions";

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ForgotPasswordForm onSubmit={forgotPassword} />
    </div>
  );
}
