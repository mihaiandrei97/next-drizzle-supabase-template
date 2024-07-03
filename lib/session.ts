import "server-only";
import { createSupabaseServerInstance } from "./supabase";
import { cookies } from "next/headers";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const supabase = createSupabaseServerInstance(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
});
