-- ============================================================
--  Schema for spending tracker app
--  Paste this into Supabase SQL Editor and hit Run
-- ============================================================


-- ── 1. USERS (extends Supabase auth.users) ──────────────────
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  phone         text,
  avatar_url    text,
  created_at    timestamptz default now()
);

-- Auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── 2. CATEGORIES ────────────────────────────────────────────
create table public.categories (
  id          serial primary key,
  name        text not null unique,           -- e.g. "Food & Dining"
  icon        text,                           -- emoji or icon key
  color       text,                           -- hex color for UI
  is_system   boolean default true            -- false = user-created
);

-- Seed default categories
insert into public.categories (name, icon, color) values
  ('Food & Dining',     '🍔', '#E8593C'),
  ('Transport',         '🚗', '#378ADD'),
  ('Shopping',          '🛍️', '#7F77DD'),
  ('Subscriptions',     '📱', '#1D9E75'),
  ('Entertainment',     '🎬', '#BA7517'),
  ('Health',            '💊', '#D85A30'),
  ('Utilities',         '💡', '#888780'),
  ('Groceries',         '🛒', '#639922'),
  ('Travel',            '✈️', '#534AB7'),
  ('Education',         '📚', '#0F6E56'),
  ('Transfers',         '💸', '#5F5E5A'),
  ('Others',            '📦', '#B4B2A9');


-- ── 3. PAYMENT SOURCES ───────────────────────────────────────
create table public.payment_sources (
  id          serial primary key,
  user_id     uuid references public.profiles(id) on delete cascade,
  name        text not null,                  -- "GPay", "HDFC Credit Card"
  type        text not null                   -- 'upi' | 'card' | 'wallet' | 'netbanking'
    check (type in ('upi', 'card', 'wallet', 'netbanking')),
  last_four   text,                           -- last 4 digits for cards
  is_active   boolean default true,
  created_at  timestamptz default now()
);


-- ── 4. TRANSACTIONS (core table) ─────────────────────────────
create table public.transactions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles(id) on delete cascade,
  amount          numeric(12, 2) not null,
  type            text not null               -- 'debit' | 'credit'
    check (type in ('debit', 'credit')),
  category_id     int references public.categories(id),
  payment_source_id int references public.payment_sources(id),
  merchant        text,                       -- "Swiggy", "Amazon"
  raw_description text,                       -- original SMS/AA text
  note            text,                       -- user-added note
  date            date not null,
  is_recurring    boolean default false,
  ai_categorised  boolean default false,      -- was category set by AI?
  created_at      timestamptz default now()
);

-- Indexes for common dashboard queries
create index idx_transactions_user_date
  on public.transactions(user_id, date desc);

create index idx_transactions_category
  on public.transactions(category_id);

create index idx_transactions_recurring
  on public.transactions(user_id, is_recurring)
  where is_recurring = true;


-- ── 5. BUDGETS ───────────────────────────────────────────────
create table public.budgets (
  id            serial primary key,
  user_id       uuid references public.profiles(id) on delete cascade,
  category_id   int references public.categories(id),
  amount        numeric(12, 2) not null,      -- monthly limit
  month         date not null,                -- first day of the month
  created_at    timestamptz default now(),
  unique(user_id, category_id, month)
);


-- ── 6. INSIGHTS (AI-generated, cached) ───────────────────────
create table public.insights (
  id          serial primary key,
  user_id     uuid references public.profiles(id) on delete cascade,
  month       date not null,                  -- which month this covers
  content     text not null,                  -- the generated insight text
  type        text,                           -- 'summary' | 'alert' | 'tip'
  created_at  timestamptz default now(),
  unique(user_id, month, type)
);


-- ── 7. WHATSAPP SESSIONS ─────────────────────────────────────
create table public.whatsapp_sessions (
  id          serial primary key,
  user_id     uuid references public.profiles(id) on delete cascade,
  phone       text not null,
  last_active timestamptz default now(),
  created_at  timestamptz default now(),
  unique(phone)
);

create table public.whatsapp_messages (
  id          serial primary key,
  session_id  int references public.whatsapp_sessions(id) on delete cascade,
  role        text not null check (role in ('user', 'assistant')),
  content     text not null,
  created_at  timestamptz default now()
);


-- ── 8. ROW LEVEL SECURITY ────────────────────────────────────
alter table public.profiles           enable row level security;
alter table public.payment_sources    enable row level security;
alter table public.transactions       enable row level security;
alter table public.budgets            enable row level security;
alter table public.insights           enable row level security;
alter table public.whatsapp_sessions  enable row level security;
alter table public.whatsapp_messages  enable row level security;

-- Profiles: own row only
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Transactions: own rows only
create policy "Users can view own transactions"
  on public.transactions for select using (auth.uid() = user_id);
create policy "Users can insert own transactions"
  on public.transactions for insert with check (auth.uid() = user_id);
create policy "Users can update own transactions"
  on public.transactions for update using (auth.uid() = user_id);
create policy "Users can delete own transactions"
  on public.transactions for delete using (auth.uid() = user_id);

-- Payment sources: own rows only
create policy "Users can manage own payment sources"
  on public.payment_sources for all using (auth.uid() = user_id);

-- Budgets: own rows only
create policy "Users can manage own budgets"
  on public.budgets for all using (auth.uid() = user_id);

-- Insights: own rows only
create policy "Users can view own insights"
  on public.insights for select using (auth.uid() = user_id);

-- Categories: everyone can read system categories
create policy "Anyone can read categories"
  on public.categories for select using (true);

-- ── Done ─────────────────────────────────────────────────────
