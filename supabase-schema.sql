-- ============================================================
-- Bust — Recipe App: Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Profiles (auto-created on signup)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Recipes
create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  photo_url text,
  photo_path text,
  rating smallint check (rating >= 1 and rating <= 10),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.recipes enable row level security;
create policy "Users can view own recipes" on public.recipes for select using (auth.uid() = user_id);
create policy "Users can insert own recipes" on public.recipes for insert with check (auth.uid() = user_id);
create policy "Users can update own recipes" on public.recipes for update using (auth.uid() = user_id);
create policy "Users can delete own recipes" on public.recipes for delete using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_recipes_updated_at
  before update on public.recipes
  for each row execute procedure public.set_updated_at();

-- Ingredients
create table public.ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  name text not null,
  measurement text,
  sort_order smallint default 0
);

alter table public.ingredients enable row level security;
create policy "Users can view own ingredients" on public.ingredients for select
  using (auth.uid() = (select user_id from public.recipes where id = recipe_id));
create policy "Users can insert own ingredients" on public.ingredients for insert
  with check (auth.uid() = (select user_id from public.recipes where id = recipe_id));
create policy "Users can update own ingredients" on public.ingredients for update
  using (auth.uid() = (select user_id from public.recipes where id = recipe_id));
create policy "Users can delete own ingredients" on public.ingredients for delete
  using (auth.uid() = (select user_id from public.recipes where id = recipe_id));

-- ============================================================
-- Storage bucket setup (do this in Storage > New Bucket UI,
-- or run via the Supabase Storage API after creating the bucket)
-- ============================================================
-- Bucket name: recipe-photos
-- Public: false (private)
--
-- Storage RLS policies (run AFTER creating the bucket):

insert into storage.buckets (id, name, public) values ('recipe-photos', 'recipe-photos', false)
on conflict do nothing;

create policy "Users can upload own photos" on storage.objects for insert
  with check (bucket_id = 'recipe-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can view own photos" on storage.objects for select
  using (bucket_id = 'recipe-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete own photos" on storage.objects for delete
  using (bucket_id = 'recipe-photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- ============================================================
-- Bookmarks
-- ============================================================
create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, recipe_id)
);

alter table public.bookmarks enable row level security;
create policy "Users can view own bookmarks" on public.bookmarks for select using (auth.uid() = user_id);
create policy "Users can insert own bookmarks" on public.bookmarks for insert with check (auth.uid() = user_id);
create policy "Users can delete own bookmarks" on public.bookmarks for delete using (auth.uid() = user_id);

-- ============================================================
-- Recipe provenance (forking)
-- ============================================================
alter table public.recipes
  add column parent_recipe_id uuid references public.recipes(id) on delete set null;

-- ============================================================
-- Directions
-- ============================================================
create table public.directions (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  step_number smallint not null,
  instruction text not null
);

alter table public.directions enable row level security;
create policy "Users can view own directions" on public.directions for select
  using (auth.uid() = (select user_id from public.recipes where id = recipe_id));
create policy "Users can insert own directions" on public.directions for insert
  with check (auth.uid() = (select user_id from public.recipes where id = recipe_id));
create policy "Users can update own directions" on public.directions for update
  using (auth.uid() = (select user_id from public.recipes where id = recipe_id));
create policy "Users can delete own directions" on public.directions for delete
  using (auth.uid() = (select user_id from public.recipes where id = recipe_id));

-- ============================================================
-- Public read policies (shared recipe pages)
-- ============================================================

-- Anyone can read any recipe (needed for /shared/[id] page)
create policy "Anyone can view recipes" on public.recipes for select using (true);

-- Anyone can read ingredients of any recipe
create policy "Anyone can view ingredients" on public.ingredients for select using (true);

-- Anyone can read directions of any recipe
create policy "Anyone can view directions" on public.directions for select using (true);

-- Any authenticated user can generate signed URLs for recipe photos
drop policy if exists "Users can view own photos" on storage.objects;
create policy "Authenticated users can view recipe photos" on storage.objects for select
  using (bucket_id = 'recipe-photos' and auth.role() = 'authenticated');
