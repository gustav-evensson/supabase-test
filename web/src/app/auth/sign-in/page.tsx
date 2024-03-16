"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { login } from "@/lib/supabase/actions";


export default function SignInPage() {

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    if(!data.get("email") || !data.get("password")) {
      toast.error("Please fill in all fields");
      return;
    } 

    const email = data.get("email") as string;
    const password = data.get("password") as string;

    await login(data);

  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={onSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" type="email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
            </div>
            <Button type="submit">Sign In</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/auth/sign-up" className="mx-auto hover:underline text-sm">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
