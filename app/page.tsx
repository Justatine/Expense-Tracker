import { UserButton, SignedIn } from "@clerk/nextjs";
import { authenticate } from "./middlewares/authenticate";

export default async function Home() {
  await authenticate();
  return (
    <div>
      <SignedIn>
        <div>Root Page Waiting room</div>
        <UserButton showName />
      </SignedIn>
    </div>
  );
}