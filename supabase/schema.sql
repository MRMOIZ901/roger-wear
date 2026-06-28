-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price integer not null,
  description text,
  features text[],
  images text[],
  category text not null default 'men',
  sizes integer[] not null default '{39,40,41,42,43,44}',
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

create policy "Public can read products"
  on products for select
  using (true);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  total integer not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

create policy "Anyone can create an order"
  on orders for insert
  with check (true);

-- Order items
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_slug text not null,
  product_name text not null,
  size integer not null,
  quantity integer not null,
  price integer not null
);

alter table order_items enable row level security;

create policy "Anyone can add order items"
  on order_items for insert
  with check (true);
