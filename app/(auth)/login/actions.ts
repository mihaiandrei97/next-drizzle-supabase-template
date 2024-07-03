"use server";
import { getBaseUrl } from "@/lib/helpers";
import { createSupabaseActionInstance } from "@/lib/supabase";
import { Provider } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const provider = formData.get("provider") as string;
  const baseUrl = getBaseUrl();
  const supabase = createSupabaseActionInstance(cookies());
  const { data } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      redirectTo: `${baseUrl}/api/auth/callback`,
    },
  });
  redirect(data?.url || "");
}
