-- BizLink: its form (on /bizlink) stores its requests
-- in cherryz.quote_requests with type 'bizlink'.

alter table cherryz.quote_requests
  drop constraint if exists quote_requests_type_check;

alter table cherryz.quote_requests
  add constraint quote_requests_type_check
  check (type in ('ip', 'wifi', 'bizlink'));
