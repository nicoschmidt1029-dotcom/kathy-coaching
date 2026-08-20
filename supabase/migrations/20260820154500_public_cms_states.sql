create or replace function public.cms_entry_states(requested_type text)
returns table (content_key text, status text, deleted boolean)
language sql
stable
security definer
set search_path = ''
as $$
  select entry.content_key, entry.status, entry.deleted_at is not null
  from public.cms_entries as entry
  where entry.content_type = requested_type;
$$;

revoke all on function public.cms_entry_states(text) from public;
grant execute on function public.cms_entry_states(text) to anon, authenticated;
