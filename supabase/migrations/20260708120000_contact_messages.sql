-- Messages sent from the Contact page form.
-- Public form: anonymous visitors may INSERT; no public read (no SELECT policy).

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  full_name   text not null,
  email       text not null,
  phone       text,
  company     text,
  besoin      text,
  message     text,
  tracking    jsonb not null default '{}'::jsonb
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

grant insert on table public.contact_messages to anon, authenticated;

create policy "Public can send a contact message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
