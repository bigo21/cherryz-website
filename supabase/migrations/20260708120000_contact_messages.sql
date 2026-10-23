-- Messages sent from the Contact page form.
-- Public form: anonymous visitors may INSERT; no public read (no SELECT policy).
-- Lives in the dedicated "cherryz" schema (created in the quote_requests migration).

create table if not exists cherryz.contact_messages (
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
  on cherryz.contact_messages (created_at desc);

alter table cherryz.contact_messages enable row level security;

grant insert on table cherryz.contact_messages to anon, authenticated;

drop policy if exists "Public can send a contact message" on cherryz.contact_messages;
create policy "Public can send a contact message"
  on cherryz.contact_messages
  for insert
  to anon, authenticated
  with check (true);
