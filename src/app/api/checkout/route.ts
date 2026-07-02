import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { Resend } from "resend";

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

  // Send email notification
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const itemsList = items
      .map((i: { name: string; size: number; quantity: number; price: number }) =>
        `• ${i.name} — Size ${i.size} x${i.quantity} = Rs. ${(i.price * i.quantity).toLocaleString()}`
      )
      .join("\n");

    await resend.emails.send({
      from: "Roger Wear Orders <onboarding@resend.dev>",
      to: "sharptricks901@gmail.com",
      subject: `🛍️ New Order — Rs. ${total.toLocaleString()} from ${name}`,
      text: `NEW ORDER RECEIVED\n\nOrder ID: ${order.id}\n\nCUSTOMER DETAILS\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nAddress: ${address}\n\nITEMS ORDERED\n${itemsList}\n\nTOTAL: Rs. ${total.toLocaleString()}\n\nView all orders: https://roger-wear.vercel.app/admin`,
    });
  } catch (e) {
    // Email failure should not block the order
    console.error("Email error:", e);
  }

  return NextResponse.json({ id: order.id });
}
