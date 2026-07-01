import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminDashboard from "./AdminDashboard";
import { getAdminClient } from "@/lib/supabase";

export const revalidate = 0;

export const metadata = {
  title: "Admin | Roger Wear",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("rw_admin");
  if (auth?.value !== "yes") redirect("/admin/login");

  const { data: orders } = await getAdminClient()
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  return <AdminDashboard orders={orders ?? []} />;
}
