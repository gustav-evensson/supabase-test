import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/supabase/actions";
import { getServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const supabase = getServerClient()

  const { data , error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/sign-in')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p className="mb-4">Welcome <span>{data?.user?.email}</span></p>
      <SignOutButton />
    </main>
  );
}

