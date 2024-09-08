import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage() {
  return (
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  );
}