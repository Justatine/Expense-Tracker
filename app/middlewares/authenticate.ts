'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function setRole(id:string) {

  try {
    const res = await clerkClient().users.updateUser(id, {
      publicMetadata: { role: "User" },
    })
    
    return { message: res.publicMetadata }
  } catch (err) {
    return { message: err }
  }
}

export async function authRole() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  redirect('/my');
}