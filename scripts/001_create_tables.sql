-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  emotion_score INT CHECK (emotion_score >= 1 AND emotion_score <= 5),
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mood_entries_select_own" ON public.mood_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mood_entries_insert_own" ON public.mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mood_entries_update_own" ON public.mood_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "mood_entries_delete_own" ON public.mood_entries FOR DELETE USING (auth.uid() = user_id);

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  is_private BOOLEAN DEFAULT true,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "journal_entries_select_own" ON public.journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "journal_entries_insert_own" ON public.journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "journal_entries_update_own" ON public.journal_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "journal_entries_delete_own" ON public.journal_entries FOR DELETE USING (auth.uid() = user_id);

-- Create meditation_sessions table
CREATE TABLE IF NOT EXISTS public.meditation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INT NOT NULL,
  content TEXT,
  category TEXT,
  difficulty_level TEXT,
  image_url TEXT,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.meditation_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "meditation_sessions_select_all" ON public.meditation_sessions FOR SELECT USING (true);

-- Create user meditation progress table
CREATE TABLE IF NOT EXISTS public.meditation_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.meditation_sessions(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_completed_minutes INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.meditation_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "meditation_progress_select_own" ON public.meditation_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "meditation_progress_insert_own" ON public.meditation_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "meditation_progress_update_own" ON public.meditation_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create therapists table
CREATE TABLE IF NOT EXISTS public.therapists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  location TEXT,
  phone TEXT,
  email TEXT,
  rating DECIMAL(3,2),
  hourly_rate DECIMAL(8,2),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "therapists_select_all" ON public.therapists FOR SELECT USING (true);

-- Create therapist availability table
CREATE TABLE IF NOT EXISTS public.therapist_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES public.therapists(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.therapist_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "therapist_availability_select_all" ON public.therapist_availability FOR SELECT USING (true);

-- Create therapist bookings table
CREATE TABLE IF NOT EXISTS public.therapist_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapists(id) ON DELETE CASCADE,
  availability_id UUID NOT NULL REFERENCES public.therapist_availability(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.therapist_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "therapist_bookings_select_own" ON public.therapist_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "therapist_bookings_insert_own" ON public.therapist_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "therapist_bookings_update_own" ON public.therapist_bookings FOR UPDATE USING (auth.uid() = user_id);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_messages_select_own" ON public.chat_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "chat_messages_insert_own" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create forum_posts table
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_posts_select_all" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "forum_posts_insert_own" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "forum_posts_update_own" ON public.forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "forum_posts_delete_own" ON public.forum_posts FOR DELETE USING (auth.uid() = user_id);

-- Create forum_replies table
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_replies_select_all" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "forum_replies_insert_own" ON public.forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "forum_replies_update_own" ON public.forum_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "forum_replies_delete_own" ON public.forum_replies FOR DELETE USING (auth.uid() = user_id);

-- Create resources table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  resource_type TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "resources_select_all" ON public.resources FOR SELECT USING (true);

-- Create user saved resources table
CREATE TABLE IF NOT EXISTS public.user_saved_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, resource_id)
);

ALTER TABLE public.user_saved_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_saved_resources_select_own" ON public.user_saved_resources FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_saved_resources_insert_own" ON public.user_saved_resources FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_saved_resources_delete_own" ON public.user_saved_resources FOR DELETE USING (auth.uid() = user_id);
