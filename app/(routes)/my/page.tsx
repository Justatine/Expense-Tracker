import { SignedIn, UserButton } from '@clerk/nextjs';
const HomePage = () => {
  return (
    <div>
      <SignedIn>
        <UserButton showName/>
      </SignedIn>  
    </div>
  )
}

export default HomePage
