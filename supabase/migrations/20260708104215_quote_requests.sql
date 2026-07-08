-- Quote requests submitted from the maintenance page (IP Dédiée + WiFi Zone wizards).
-- Public form: anonymous visitors may INSERT, but no one can read rows back via the
-- Data API (no SELECT policy) — submissions are read from the dashboard / a trusted
-- service-role context only.

create table if not exists public.quote_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null check (type in ('ip', 'wifi')),
  full_name   text,
  email       text,
  phone       text,
  company     text,
  answers     jsonb not null default '{}'::jsonb,
  tracking    jsonb not null default '{}'::jsonb
);

create index if not exists quote_requests_created_at_idx
  on public.quote_requests (created_at desc);

create index if not exists quote_requests_type_idx
  on public.quote_requests (type);

-- RLS is mandatory on any table reachable through the Data API.
alter table public.quote_requests enable row level security;

-- Since April 2026, new public tables are not auto-exposed to the Data API:
-- granting INSERT to anon/authenticated is what makes the insert endpoint available.
grant insert on table public.quote_requests to anon, authenticated;

-- Allow the public form to create a submission. No USING/SELECT policy exists,
-- so inserted rows cannot be read back by these roles.
create policy "Public can submit a quote request"
  on public.quote_requests
  for insert
  to anon, authenticated
  with check (true);
