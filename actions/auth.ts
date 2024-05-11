"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Schemas for Form validation
const SignupFormSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .min(1, { message: "Username is required." }),
  email: z.string({ required_error: "Email is required." }).email(),
  password: z
    .string({ required_error: "Password is required." })
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password should be at least 8 characters long." })
    .trim(),
});

const SigninFormSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
  password: z
    .string({ required_error: "Password is required." })
    .min(1, { message: "Password is required." })
    .trim(),
});

// For SignIn

export async function signin(state: any, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const supabase = createClient();

  const response = await supabase.auth.signInWithPassword(data);

  if (response.error) {
    return { error: response?.error?.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// For SignUp

export async function signup(state: any, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const data = {
    username: validatedFields.data.username,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const supabase = createClient();

  const response = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        username: data.username,
      },
    },
  });

  if (response.error) {
    return { error: response?.error?.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// For Google Sign In
export async function GoogleSignIn() {
  const supabase = createClient();

  const response = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (response.data.url) {
    redirect(response.data.url);
  }

  if (response.error) {
    return { error: response?.error?.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
