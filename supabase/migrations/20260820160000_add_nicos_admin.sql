insert into public.admin_users (email, active)
values ('nicoschmidt1029@gmail.com', true)
on conflict (email) do update set active = true;
