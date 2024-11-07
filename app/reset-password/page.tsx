import { redirect } from "next/navigation";
import ResetPasswordForm from "@/cosmic/blocks/user/ResetPasswordForm";
import { resetPassword } from "@/cosmic/blocks/user/actions";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ResetPasswordForm token={token} onSubmit={resetPassword} />
    </div>
  );
}
