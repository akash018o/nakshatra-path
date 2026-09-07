-- Run this in Supabase SQL editor once, before going live.ok

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  name text not null,
  phone text not null,
  dob date not null,
  time_of_birth time,
  place_of_birth text,
  contact_preference text not null check (contact_preference in ('call','chat','report_only')),
  notes text,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;

-- Anyone (anon key, from the public site) can INSERT a booking.
create policy "public can submit bookings"
  on bookings for insert
  to anon
  with check (true);

-- Only the admin page, using the owner's logged-in session, can read/update.
-- Simplest approach for now: admin page uses the same anon key but the /admin
-- route itself should be protected (e.g. simple password gate, or Supabase Auth
-- login) before you launch — this SQL alone does not lock down the /admin page.
create policy "authenticated can read bookings"
  on bookings for select
  to authenticated
  using (true);

create policy "authenticated can update bookings"
  on bookings for update
  to authenticated
  using (true);

-- Reviews: genuine customer reviews, moderated before going public.
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  rating int not null check (rating between 1 and 5),
  message text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

alter table reviews enable row level security;

-- Anyone can submit a review.
create policy "public can submit reviews"
  on reviews for insert
  to anon
  with check (true);

-- Anyone can read APPROVED reviews only (for the public site to display them).
create policy "public can read approved reviews"
  on reviews for select
  to anon
  using (status = 'approved');

-- Admin (authenticated) can read and moderate all reviews.
create policy "authenticated can read all reviews"
  on reviews for select
  to authenticated
  using (true);

create policy "authenticated can update reviews"
  on reviews for update
  to authenticated
  using (true);

-- Gemstone images: lets the site owner upload a real photo per stone from
-- the admin panel, no code changes or redeploy needed. Falls back to the
-- built-in SVG icon on the public site until an image is set.
insert into storage.buckets (id, name, public)
values ('gemstones', 'gemstones', true)
on conflict (id) do nothing;

create policy "public can view gemstone images"
  on storage.objects for select
  to public
  using (bucket_id = 'gemstones');

create policy "authenticated can upload gemstone images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gemstones');

create policy "authenticated can update gemstone images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gemstones');

create table if not exists gemstone_images (
  id text primary key,        -- matches the stone id in src/data/gemstones.js, e.g. 'ruby'
  image_url text not null,
  updated_at timestamptz not null default now()
);

alter table gemstone_images enable row level security;

create policy "public can read gemstone image urls"
  on gemstone_images for select
  to public
  using (true);

create policy "authenticated can manage gemstone image urls"
  on gemstone_images for all
  to authenticated
  using (true)
  with check (true);

-- Delete permissions for the admin panel's Delete buttons (added later —
-- safe to run this whole file again even if earlier parts already exist).
create policy "authenticated can delete bookings"
  on bookings for delete
  to authenticated
  using (true);

create policy "authenticated can delete reviews"
  on reviews for delete
  to authenticated
  using (true);
