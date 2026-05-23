
-- Storage bucket (public read)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Public read policy for objects in the media bucket
create policy "Public read media bucket"
on storage.objects for select
using (bucket_id = 'media');

-- Media items table
create table public.media_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('image','video')),
  path text not null,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.media_items enable row level security;

-- Anyone can read the list
create policy "Anyone can view media items"
on public.media_items for select
using (true);
-- No insert/update/delete policies — only service role (server fns) can write.
