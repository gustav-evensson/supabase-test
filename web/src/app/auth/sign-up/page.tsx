"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { signup } from "@/lib/supabase/actions";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    if (!data.get("email") || !data.get("password") || !data.get("rePassword")) {
      toast.error("Please fill in all fields");
      return;
    }
    if (data.get("password") !== data.get("rePassword")) {
      toast.error("Passwords do not match");
      return;
    }

    await signup(data);

  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account</CardDescription>
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
            <div>
              <Label htmlFor="rePassword">Re-enter password</Label>
              <Input name="rePassword" id="rePassword" type="password" />
            </div>
            <Button type="submit">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/auth/sign-in" className="mx-auto hover:underline text-sm">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
