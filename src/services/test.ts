import { supabase } from "../lib/supabase";

export async function testConnection() {
  const { data, error } = await supabase
    .from("clients")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);
}