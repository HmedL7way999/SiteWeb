-- 1. Create Moods Table
create table moods (
  id uuid default uuid_generate_v4() primary key,
  user_name text unique not null, -- 'Ahmed' or 'Lilya'
  mood_color text not null, -- hex code
  mood_name text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create Memories Table (Constellation)
create table memories (
  id uuid default uuid_generate_v4() primary key,
  author text not null,
  content text not null,
  type text default 'text', -- 'text', 'date', 'image'
  x_pos float not null, -- 0 to 100
  y_pos float not null, -- 0 to 100
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Row Level Security policies (Public for now)
alter table moods enable row level security;
alter table memories enable row level security;

create policy "Public Moods" on moods for all using (true);
create policy "Public Memories" on memories for all using (true);
