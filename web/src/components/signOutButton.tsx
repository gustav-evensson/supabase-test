'use client'

import { Button } from "./ui/button"
import { signout } from "@/lib/supabase/actions"

export default function SignOutButton() {
  return (
    <Button onClick={() => signout()}>Sign Out</Button>
  )
}

