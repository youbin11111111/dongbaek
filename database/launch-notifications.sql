-- Schema reference for the hosted create_launch_notifications migration.
create table public.launch_notifications (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (
    email = lower(trim(email)) and length(email) <= 254
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
  ),
  consent boolean not null check (consent = true),
  consent_version text not null default 'launch-v1',
  created_at timestamptz not null default now()
);
alter table public.launch_notifications enable row level security;
revoke all on public.launch_notifications from anon, authenticated;
grant insert (email, consent) on public.launch_notifications to anon, authenticated;
create policy "Visitors can request launch notification"
  on public.launch_notifications for insert to anon, authenticated
  with check (consent = true and consent_version = 'launch-v1');
