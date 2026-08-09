-- Continuum landing page — Supabase schema
-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query).
--
-- All writes to these tables happen through the app's API routes using the
-- service_role key (server-side only). Row Level Security is enabled with
-- no public policies, so the anon/public key cannot read or write these
-- tables directly — that's intentional, not an oversight.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'landing_page',
  converting_intent text check (converting_intent in ('free', 'paid')) default 'free',
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_email_key on public.waitlist (lower(email));

create table if not exists public.preorders (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  preferred_payment text,
  amount_naira integer not null,
  payment_status text check (payment_status in ('pending', 'paid', 'failed')) default 'pending',
  paystack_reference text,
  created_at timestamptz not null default now()
);

create index if not exists preorders_email_idx on public.preorders (lower(email));
create index if not exists preorders_status_idx on public.preorders (payment_status);

create table if not exists public.events (
  id bigint generated always as identity primary key,
  event text not null,
  path text,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists events_event_idx on public.events (event);
create index if not exists events_created_at_idx on public.events (created_at desc);

alter table public.waitlist enable row level security;
alter table public.preorders enable row level security;
alter table public.events enable row level security;

-- No policies are defined for anon/authenticated roles on purpose.
-- The service_role key (used only in server-side API routes) bypasses RLS
-- by design, which is the only way this app writes to these tables.
