"use server";

import { redirect } from "next/navigation";
import { createActionServer } from "@/lib/supabase/actions";

export const signInWithPassword = async (data: FormData) => {
  const supabase = await createActionServer();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.get("email") as string,
    password: data.get("password") as string,
  });
  if (error) {
    throw error;
  }
  redirect("/");
};

export const signUpWithPassword = async (data: FormData) => {
  const supabase = await createActionServer();
  const { error } = await supabase.auth.signUp({
    email: data.get("email") as string,
    password: data.get("password") as string,
  });
  if (error) {
    throw error;
  }
  redirect("/auth/confirmation");
};

export const sendResetPassword = async (email: string) => {
  const supabase = await createActionServer();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  const supabase = await createActionServer();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw error;
  }
};

export const sendMagicLink = async (email: string) => {
  const supabase = await createActionServer();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });
  if (error) {
    return { message: error.message };
  }
};

export const signOut = async () => {
  const supabase = await createActionServer();
  await supabase.auth.signOut();
  redirect("/auth");
};
