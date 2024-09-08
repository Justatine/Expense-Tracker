import { UserButton, SignedIn } from "@clerk/nextjs";
import { authRole } from "./middlewares/authenticate";

export default async function Home() {
  await authRole();
  return (
    <div>
      <SignedIn>
        <div>Root Page Waiting room</div>
        <UserButton showName />
      </SignedIn>
    </div>
  );
}