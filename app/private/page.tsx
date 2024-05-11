import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signin");
  }

  const userData = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id);

  return <p>Hello {JSON.stringify(data.user.user_metadata)}</p>;
}
