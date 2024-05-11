"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signin } from "@/actions/auth";
import { useFormStatus } from "react-dom";
import { Loader2, TriangleAlert } from "lucide-react";
import GoogleSignInBtn from "./_components/GoogleSignInBtn";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="mt-2 text-lg tracking-wide font-bold"
    >
      {pending ? (
        <span className="flex items-center gap-x-2">
          <Loader2 className="animate-spin size-4" /> Signing In...
        </span>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default function SignInPage() {
  const [state, action] = useFormState(signin, undefined);

  return (
    <div className="flex flex-col gap-y-5 mt-10 w-[400px] mx-auto pt-5 pb-8 px-7 rounded-md border border-input shadow">
      {state?.error && (
        <span className="py-2 px-4 rounded-md bg-destructive/10 flex items-center justify-center border border-destructive/40 gap-x-2 pl-1 text-sm font-semibold text-red-500">
          <TriangleAlert className="size-[0.9rem]" /> {state.error}
        </span>
      )}

      <h1 className="opacity-80">Sign In</h1>
      <form action={action} className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <Input name="email" placeholder="Enter Email" />
          {state?.errors?.email && (
            <span className="flex gap-x-2 pl-1 text-xs font-semibold text-red-500">
              <TriangleAlert className="size-[0.9rem]" /> {state.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Input type="password" name="password" placeholder="Enter Password" />
          {state?.errors?.password && (
            <span className="flex gap-x-2 pl-1 text-xs font-semibold text-red-500">
              <TriangleAlert className="size-[0.9rem]" />{" "}
              {state.errors.password}
            </span>
          )}
        </div>

        <SubmitBtn />

        <div className="flex items-center justify-center">
          <p className="flex items-center gap-x-2 text-sm opacity-80 text-center">
            Don't have a account?
            <Link
              href={"/signup"}
              className="text-primary font-semibold underline underline-offset-4"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="relative w-full flex items-center justify-center">
          <hr className="bg-primary w-full" />
          <p className="px-4">OR</p>
          <hr className="bg-primary w-full" />
        </div>

        <GoogleSignInBtn />
      </form>
    </div>
  );
}
