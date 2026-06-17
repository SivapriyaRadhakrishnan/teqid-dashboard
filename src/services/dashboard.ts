import { supabase } from "../lib/supabase";

export async function getClientCount() {
  const { count, error } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true });

  if (error) throw error;

  return count || 0;
}

export async function getDomainCount() {
  const { count, error } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true })
    .eq("service_type", "Domain");

  if (error) throw error;

  return count || 0;
}

export async function getServerCount() {
  const { count, error } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true })
    .in("service_type", ["Hosting", "VPS"]);

  if (error) throw error;

  return count || 0;
}

export async function getUpcomingServices() {
  const { data, error } = await supabase
    .from("services")
    .select(`
      *,
      clients (
        company_name,
        email
      )
    `)
    .order("expiry_date", { ascending: true })
    .limit(4);

  if (error) throw error;

  return data || [];
}