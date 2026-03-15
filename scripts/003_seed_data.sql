-- Insert meditation sessions
INSERT INTO public.meditation_sessions (title, description, duration_minutes, content, category, difficulty_level, image_url)
VALUES 
  (
    'Morning Mindfulness',
    'Start your day with a refreshing 10-minute mindfulness session',
    10,
    'Welcome to Morning Mindfulness. Find a comfortable position and close your eyes. Take a deep breath in through your nose for a count of 4, hold it for 4, and exhale for 4. This breathing technique activates your parasympathetic nervous system, helping you feel calm and centered. Continue this pattern for the next 10 minutes. Notice any thoughts that arise, acknowledge them, and gently return your focus to your breath. As you breathe, imagine a warm, golden light filling your body with each inhale, and releasing any tension with each exhale.',
    'Breathing',
    'Beginner',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop'
  ),
  (
    'Stress Relief',
    'Release tension and anxiety with this guided relaxation',
    15,
    'Welcome to Stress Relief meditation. This session will help you release the accumulated stress from your day. Start by slowly tensing and releasing each muscle group in your body. Begin with your feet - tense them for 5 seconds, then release and notice the difference. Move up through your calves, thighs, abdomen, chest, arms, shoulders, neck, and finally your face. This progressive muscle relaxation technique helps identify where you hold tension and teaches your body how to release it. As you relax each area, imagine it becoming lighter and warmer. By the end of this session, your whole body should feel completely relaxed and rejuvenated.',
    'Relaxation',
    'Beginner',
    'https://images.unsplash.com/photo-1512208736662-a67f1f52c2b1?w=500&h=300&fit=crop'
  ),
  (
    'Sleep Preparation',
    'Prepare your mind and body for restful sleep',
    20,
    'Welcome to Sleep Preparation meditation. This session is designed to help you transition into a peaceful sleep. Lie down in a comfortable position and allow your body to sink into the mattress. Begin by visualizing a peaceful place - perhaps a quiet beach, a calm forest, or a cozy bedroom. Engage all your senses: What do you see? What sounds do you hear? What does the air feel like on your skin? As you deepen this visualization, feel your body becoming heavier and more relaxed. Your eyelids may begin to feel heavy. That is a sign of deep relaxation. Continue breathing slowly and naturally, allowing sleep to come when it is ready.',
    'Sleep',
    'Beginner',
    'https://images.unsplash.com/photo-1516684253335-239b27e42b8d?w=500&h=300&fit=crop'
  ),
  (
    'Anxiety Dissolving',
    'Techniques to calm anxious thoughts and racing mind',
    12,
    'Welcome to Anxiety Dissolving meditation. If you are experiencing anxiety, know that you are safe. This session uses grounding techniques to anchor you to the present moment. Start by noticing 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This 5-4-3-2-1 grounding technique helps shift your focus from anxious thoughts to your immediate physical surroundings. Next, we will use breathing to calm your nervous system. Try the 4-7-8 breathing: inhale for 4 counts, hold for 7, exhale for 8. This longer exhale activates relaxation. Continue this for several minutes. Remember, anxiety is temporary, and you have the power to calm your mind.',
    'Anxiety',
    'Beginner',
    'https://images.unsplash.com/photo-1528715471579-d1129c67ad6d?w=500&h=300&fit=crop'
  ),
  (
    'Love and Compassion',
    'Cultivate kindness and compassion for yourself and others',
    18,
    'Welcome to Love and Compassion meditation. In this session, we practice Metta or loving-kindness meditation. Start by directing loving-kindness to yourself: Silently repeat, "May I be happy, may I be healthy, may I be safe, may I live with ease." Feel the warmth of these wishes in your heart. Now extend these wishes to someone you love: "May you be happy, may you be healthy, may you be safe, may you live with ease." Then extend them to a neutral person, someone you do not know well. Next, extend them to someone difficult - this does not mean you condone their actions, but practice compassion. Finally, extend loving-kindness to all beings everywhere: "May all beings be happy, may all beings be healthy, may all beings be safe, may all beings live with ease." Feel the expansion of compassion.'
    'Compassion',
    'Intermediate',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=300&fit=crop'
  ),
  (
    'Body Scan',
    'Deep awareness of your body and physical sensations',
    25,
    'Welcome to Body Scan meditation. This practice develops awareness of your body and helps release tension you may not realize you are holding. Lie down comfortably or sit with your back supported. Close your eyes and begin at the top of your head. Without trying to change anything, simply notice the sensations: Is it warm or cool? Tense or relaxed? Heavy or light? Slowly move your attention down through your body - your forehead, eyes, nose, jaw, neck, shoulders, arms, hands, chest, abdomen, back, hips, legs, and feet. Spend 30-60 seconds on each area. If you notice tension, breathe into that area and imagine your breath bringing relaxation. By the end of this scan, you will have a complete awareness of your body and deeper relaxation.',
    'Relaxation',
    'Intermediate',
    'https://images.unsplash.com/photo-1599301881399-fde90f7e4230?w=500&h=300&fit=crop'
  );

-- Insert therapists
INSERT INTO public.therapists (name, specialty, bio, location, email, phone, rating, hourly_rate, available)
VALUES
  (
    'Dr. Sarah Johnson',
    'Depression & Anxiety',
    'Licensed therapist with 10+ years of experience in cognitive behavioral therapy',
    'New York, NY',
    'sarah@therapists.com',
    '(555) 001-0001',
    4.9,
    150.00,
    true
  ),
  (
    'Dr. Michael Chen',
    'Trauma & PTSD',
    'Specialized in trauma-focused cognitive behavioral therapy and EMDR',
    'Los Angeles, CA',
    'michael@therapists.com',
    '(555) 002-0002',
    4.8,
    160.00,
    true
  ),
  (
    'Dr. Emma Wilson',
    'Relationship Counseling',
    'Expert in couples therapy and family dynamics',
    'Chicago, IL',
    'emma@therapists.com',
    '(555) 003-0003',
    4.7,
    140.00,
    true
  ),
  (
    'Dr. James Martinez',
    'Stress Management',
    'Specializes in workplace stress and burnout prevention',
    'Houston, TX',
    'james@therapists.com',
    '(555) 004-0004',
    4.8,
    130.00,
    true
  ),
  (
    'Dr. Lisa Anderson',
    'Grief & Loss',
    'Compassionate guidance through the grieving process',
    'Boston, MA',
    'lisa@therapists.com',
    '(555) 005-0005',
    4.9,
    145.00,
    true
  );

-- Insert therapist availability (for the next 30 days)
WITH RECURSIVE dates AS (
  SELECT CURRENT_DATE as date
  UNION ALL
  SELECT date + INTERVAL '1 day'
  FROM dates
  WHERE date < CURRENT_DATE + INTERVAL '30 days'
)
INSERT INTO public.therapist_availability (therapist_id, date, start_time, end_time)
SELECT 
  t.id,
  d.date,
  t1.start_time,
  t1.end_time
FROM (SELECT id FROM public.therapists LIMIT 5) t
CROSS JOIN dates d
CROSS JOIN (
  VALUES 
    ('09:00'::time, '10:00'::time),
    ('10:30'::time, '11:30'::time),
    ('14:00'::time, '15:00'::time),
    ('15:30'::time, '16:30'::time),
    ('17:00'::time, '18:00'::time)
) t1(start_time, end_time)
WHERE EXTRACT(DOW FROM d.date) NOT IN (0, 6); -- Exclude weekends

-- Insert resources
INSERT INTO public.resources (title, description, url, category, resource_type, image_url)
VALUES
  (
    'NAMI: Mental Health Resources',
    'National Alliance on Mental Illness provides comprehensive mental health information and support',
    'https://www.nami.org/home',
    'Organizations',
    'Website',
    'https://images.unsplash.com/photo-1576091160399-1112991f3585?w=500&h=300&fit=crop'
  ),
  (
    'Crisis Text Line',
    'Text HOME to 741741 to reach the Crisis Text Line. Available 24/7 to support those in crisis.',
    'https://www.crisistextline.org/',
    'Crisis Support',
    'Hotline',
    'https://images.unsplash.com/photo-1493514789131-586cb221d816?w=500&h=300&fit=crop'
  ),
  (
    'SAMHSA National Helpline',
    'Free, confidential, 24/7 treatment referral and information service. 1-800-662-4357',
    'https://www.samhsa.gov/find-help/national-helpline',
    'Crisis Support',
    'Hotline',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop'
  ),
  (
    'Psychology Today - Therapist Finder',
    'Search for therapists in your area with detailed profiles and specialties',
    'https://www.psychologytoday.com/us/basics/therapy',
    'Therapist Directory',
    'Website',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop'
  ),
  (
    'Headspace: Meditation & Sleep',
    'App with guided meditations, sleep stories, and mindfulness exercises',
    'https://www.headspace.com/',
    'Meditation & Mindfulness',
    'App',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop'
  ),
  (
    'Calm: Sleep & Relaxation',
    'Meditation app with sleep stories, breathing exercises, and relaxation programs',
    'https://www.calm.com/',
    'Meditation & Mindfulness',
    'App',
    'https://images.unsplash.com/photo-1512208736662-a67f1f52c2b1?w=500&h=300&fit=crop'
  ),
  (
    'Anxiety and Depression Association of America',
    'ADAA provides information, resources, and support for anxiety and depression',
    'https://adaa.org/',
    'Organizations',
    'Website',
    'https://images.unsplash.com/photo-1576091160599-112ba8d25d1d?w=500&h=300&fit=crop'
  ),
  (
    'Mental Health America',
    'Resources, screening tools, and information about mental health conditions',
    'https://www.mhanational.org/',
    'Organizations',
    'Website',
    'https://images.unsplash.com/photo-1577992937873-74a440642117?w=500&h=300&fit=crop'
  ),
  (
    'BetterHelp - Online Therapy',
    'Connect with licensed therapists online for affordable mental health support',
    'https://www.betterhelp.com/',
    'Online Therapy',
    'Platform',
    'https://images.unsplash.com/photo-1493514789131-586cb221d816?w=500&h=300&fit=crop'
  ),
  (
    'Insight Timer - Free Meditation',
    'Largest free meditation app with over 100,000 guided meditations',
    'https://insighttimer.com/',
    'Meditation & Mindfulness',
    'App',
    'https://images.unsplash.com/photo-1599301881399-fde90f7e4230?w=500&h=300&fit=crop'
  ),
  (
    'MindBodyGreen - Wellness Articles',
    'Expert-written articles on mental health, wellness, and mindfulness',
    'https://www.mindbodygreen.com/basics/mental-health',
    'Education',
    'Blog',
    'https://images.unsplash.com/photo-1516384740408-7cc556caf0d6?w=500&h=300&fit=crop'
  ),
  (
    'The Jed Foundation - Teen Mental Health',
    'Resources and support for adolescent mental health and suicide prevention',
    'https://jedfoundation.org/',
    'Youth Resources',
    'Website',
    'https://images.unsplash.com/photo-1576091160568-112de355e42d?w=500&h=300&fit=crop'
  );
