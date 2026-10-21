export interface DiscoverProfile {
  id: string;
  name: string;
  age: number;
  isVerified: boolean;
  matchScore: number; // e.g. 94
  profession: string;
  location: string;
  community: string;
  heightReligion: string; // e.g. "5'4\" • Hindu"
  tags: string[];
  about: string;
  preferenceHighlight: string; // e.g. "Prefers partner from Pune or nearby"
  photos: string[];
  education?: string;
  university?: string;
  occupationDetail?: string;
  lifestyle?: string;
  familyDetails?: string;
  familyLocation?: string;
}

export const DISCOVER_PROFILES: DiscoverProfile[] = [
  {
    id: 'disc_1',
    name: 'Prajakta',
    age: 25,
    isVerified: true,
    matchScore: 94,
    profession: 'Software Engineer',
    location: 'Pune, Maharashtra',
    community: 'Maratha',
    heightReligion: `5'4" • Hindu`,
    tags: ['🎵 Music', '✈ Travel', '🍴 Foodie'],
    about:
      'A cheerful, ambitious and family-oriented person\nI love traveling and exploring new places.',
    preferenceHighlight: 'Prefers partner from Pune or nearby',
    education: 'B.E. in Computer Engineering',
    university: 'Savitribai Phule Pune University',
    occupationDetail: 'Working since 2021',
    lifestyle: 'Non-vegetarian',
    familyDetails: 'Parents • 1 Younger Brother',
    familyLocation: 'Living in Pune',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    ],
  },
  {
    id: 'disc_2',
    name: 'Ananya',
    age: 26,
    isVerified: true,
    matchScore: 92,
    profession: 'Architect & Interior Designer',
    location: 'Mumbai, Maharashtra',
    community: 'Brahman',
    heightReligion: `5'5" • Hindu`,
    tags: ['🎨 Painting', '✈ Travel', '☕ Coffee Lover'],
    about:
      'Passionate about design, heritage architecture, and classical music. Looking for a supportive and understanding partner.',
    preferenceHighlight: 'Prefers partner from Mumbai or Pune',
    education: 'B.Arch in Interior Architecture',
    university: 'Sir J.J. College of Architecture, Mumbai',
    occupationDetail: 'Senior Designer at Studio Craft',
    lifestyle: 'Vegetarian',
    familyDetails: 'Parents • 1 Elder Sister',
    familyLocation: 'Living in South Mumbai',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    ],
  },
  {
    id: 'disc_3',
    name: 'Radhika',
    age: 24,
    isVerified: true,
    matchScore: 89,
    profession: 'Doctor (MD)',
    location: 'Nashik, Maharashtra',
    community: 'CKP',
    heightReligion: `5'3" • Hindu`,
    tags: ['🩺 Medicine', '📚 Reading', '🎾 Badminton'],
    about:
      'Doctor dedicated to medical care with a deep love for literature, outdoor sports, and traditional Maharashtrian culture.',
    preferenceHighlight: 'Prefers partner from Nashik, Pune or Mumbai',
    education: 'MBBS, MD General Medicine',
    university: 'BJ Government Medical College, Pune',
    occupationDetail: 'Resident Doctor at City Hospital',
    lifestyle: 'Eggetarian',
    familyDetails: 'Parents • Single Child',
    familyLocation: 'Living in Nashik',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    ],
  },
  {
    id: 'disc_4',
    name: 'Neha',
    age: 27,
    isVerified: true,
    matchScore: 95,
    profession: 'Financial Analyst',
    location: 'Nagpur, Maharashtra',
    community: 'Maratha',
    heightReligion: `5'6" • Hindu`,
    tags: ['📈 Finance', '✈ World Explorer', '🧘 Yoga'],
    about:
      'Working with a global investment firm. Family values are very important to me. Enjoy yoga, weekend road trips, and cooking.',
    preferenceHighlight: 'Prefers partner from Maharashtra',
    education: 'MBA in Finance',
    university: 'IIM Nagpur',
    occupationDetail: 'Assistant Vice President at Global Capital',
    lifestyle: 'Non-vegetarian',
    familyDetails: 'Parents • 1 Elder Brother',
    familyLocation: 'Living in Nagpur',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    ],
  },
];
