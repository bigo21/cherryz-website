-- Quote requests submitted from the /demandes wizards (IP Dédiée + WiFi Zone).
-- Public form: anonymous visitors may INSERT, but no one can read rows back via the
-- Data API (no SELECT policy) — submissions are read from the dashboard / a trusted
-- service-role context only.
--
-- The Supabase project is shared between projects: everything Cherryz lives in its
-- own "cherryz" schema, never in "public". The schema must also be listed in
-- Project Settings → Data API → Exposed schemas for the insert endpoint to exist.

create schema if not exists cherryz;
grant usage on schema cherryz to anon, authenticated;

create table if not exists cherryz.quote_requests (
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
  on cherryz.quote_requests (created_at desc);

create index if not exists quote_requests_type_idx
  on cherryz.quote_requests (type);

-- RLS is mandatory on any table reachable through the Data API.
alter table cherryz.quote_requests enable row level security;

-- Granting INSERT to anon/authenticated is what makes the insert endpoint available.
grant insert on table cherryz.quote_requests to anon, authenticated;

-- Allow the public form to create a submission. No USING/SELECT policy exists,
-- so inserted rows cannot be read back by these roles.
drop policy if exists "Public can submit a quote request" on cherryz.quote_requests;
create policy "Public can submit a quote request"
  on cherryz.quote_requests
  for insert
  to anon, authenticated
  with check (true);
