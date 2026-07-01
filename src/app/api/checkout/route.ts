import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { name, phone, address, city, total, items } = await req.json();

  const supabase = getAdminClient();

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({ customer_name: name, phone, address, city, total, status: "pending" })
    .select()
    .single();

  if (orderErr) return NextResponse.json({ error: orderErr.message }, { status: 500 });

  const orderItems = items.map((item: { slug: string; name: string; size: number; quantity: number; price: number }) => ({
    order_id: order.id,
    product_slug: item.slug,
    product_name: item.name,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
  if (itemsErr) return NextResponse.json({ error: itemsErr.message }, { status: 500 });

  return NextResponse.json({ id: order.id });
}
