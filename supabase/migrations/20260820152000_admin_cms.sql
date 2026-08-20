create schema if not exists private;

create table if not exists public.admin_users (
  email text primary key check (email = lower(email)),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.admin_users (email)
values ('katey.coaching.newlife@gmail.com')
on conflict (email) do nothing;

alter table public.admin_users enable row level security;
revoke all on table public.admin_users from anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
      and active = true
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

create table if not exists public.cms_entries (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('program', 'recipe', 'website')),
  content_key text not null check (content_key ~ '^[a-z0-9][a-z0-9-]*$'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  image_path text,
  data jsonb not null default '{}'::jsonb,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (content_type, content_key)
);

create index if not exists cms_entries_public_idx
  on public.cms_entries (content_type, status, sort_order)
  where deleted_at is null;

alter table public.cms_entries enable row level security;
revoke all on table public.cms_entries from anon, authenticated;
grant select on table public.cms_entries to anon;
grant select, insert, update, delete on table public.cms_entries to authenticated;

create policy "Public can read published CMS content"
on public.cms_entries
for select
to anon
using (status = 'published' and deleted_at is null);

create policy "Admins can read all CMS content"
on public.cms_entries
for select
to authenticated
using ((select private.is_admin()));

create policy "Admins can create CMS content"
on public.cms_entries
for insert
to authenticated
with check ((select private.is_admin()));

create policy "Admins can update CMS content"
on public.cms_entries
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can delete CMS content"
on public.cms_entries
for delete
to authenticated
using ((select private.is_admin()));

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cms_entries_updated_at on public.cms_entries;
create trigger cms_entries_updated_at
before update on public.cms_entries
for each row execute function private.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Admins can upload site media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'site-media'
  and (select private.is_admin())
);

create policy "Admins can update site media"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-media' and (select private.is_admin()))
with check (bucket_id = 'site-media' and (select private.is_admin()));

create policy "Admins can delete site media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-media' and (select private.is_admin()));
