import { StudentProfile, ExchangeRequest, WalletTransaction } from '../types';

import heroImg from '../assets/images/hero_campus_collab_1790258798925.jpg';
import mayaImg from '../assets/images/avatar_student_maya_1790258811314.jpg';
import liamImg from '../assets/images/avatar_student_liam_1790258824476.jpg';
import priyaImg from '../assets/images/avatar_student_priya_1790258834892.jpg';

export const HERO_IMAGE = heroImg;

export const SKILL_CATEGORIES = [
  'All Categories',
  'Tech & Coding',
  'Design & Creative',
  'Academics & STEM',
  'Languages',
  'Business & Career',
  'Music & Audio'
];

export const CURRENT_USER: StudentProfile = {
  id: 'user_alex',
  name: 'Alex Chen',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', // fallback or styled avatar
  university: 'University Campus & Hackathon Lab',
  major: 'Computer Science & HCI',
  year: 'Junior (3rd Year)',
  bio: 'CS student passionate about building intuitive web applications and data scrapers. Eager to level up my design eye in Canva & Figma, and practice conversational Spanish!',
  rating: 4.9,
  reviewsCount: 14,
  completedSwaps: 11,
  learningMode: 'Hybrid',
  campusSpots: ['Central Library 3rd Floor', 'Student Innovation Hub', 'Campus Starbucks'],
  availability: 'Mon, Wed, Fri after 4:30 PM & Saturday mornings',
  hoursPerWeek: 5,
  skillsOffered: [
    { id: 'sk_py', name: 'Python for Beginners & Scripting', category: 'Tech & Coding', level: 'Advanced', experienceYears: 2 },
    { id: 'sk_react', name: 'React & Frontend Fundamentals', category: 'Tech & Coding', level: 'Intermediate', experienceYears: 1 },
    { id: 'sk_algo', name: 'Data Structures & Algorithms', category: 'Academics & STEM', level: 'Advanced', experienceYears: 2 }
  ],
  skillsWanted: [
    { id: 'sk_canva', name: 'Canva Design & Social Graphics', category: 'Design & Creative', level: 'Beginner' },
    { id: 'sk_spanish', name: 'Conversational Spanish', category: 'Languages', level: 'Beginner' },
    { id: 'sk_figma', name: 'Figma UI Prototyping', category: 'Design & Creative', level: 'Intermediate' }
  ],
  isVerifiedStudent: true
};

export const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    id: 'user_maya',
    name: 'Maya Sharma',
    avatar: mayaImg,
    university: 'University Campus & Hackathon Lab',
    major: 'Digital Media & Visual Communications',
    year: 'Sophomore (2nd Year)',
    bio: 'Visual designer creating social graphics and brand templates. Looking to learn Python to automate tedious data and asset batching tasks!',
    rating: 5.0,
    reviewsCount: 19,
    completedSwaps: 16,
    learningMode: 'Hybrid',
    campusSpots: ['Media Arts Lab 102', 'Library Quiet Pods', 'Student Union Cafe'],
    availability: 'Tue & Thu 2 PM - 6 PM, Sunday afternoons',
    hoursPerWeek: 6,
    skillsOffered: [
      { id: 'm_canva', name: 'Canva Design & Social Graphics', category: 'Design & Creative', level: 'Expert', experienceYears: 3 },
      { id: 'm_video', name: 'Short-Form Video Editing (CapCut & Premiere)', category: 'Design & Creative', level: 'Intermediate', experienceYears: 2 },
      { id: 'm_brand', name: 'Personal Branding & Slide Decks', category: 'Business & Career', level: 'Advanced', experienceYears: 2 }
    ],
    skillsWanted: [
      { id: 'm_py', name: 'Python for Beginners & Scripting', category: 'Tech & Coding', level: 'Beginner' },
      { id: 'm_scrape', name: 'Web Scraping & Data Extraction', category: 'Tech & Coding', level: 'Beginner' }
    ],
    isVerifiedStudent: true
  },
  {
    id: 'user_liam',
    name: 'Liam O’Connor',
    avatar: liamImg,
    university: 'University Campus & Hackathon Lab',
    major: 'Software Engineering',
    year: 'Junior (3rd Year)',
    bio: 'Product designer and frontend enthusiast. I love wireframing user flows in Figma. Want to prep for technical interviews with algorithms.',
    rating: 4.8,
    reviewsCount: 12,
    completedSwaps: 9,
    learningMode: 'Virtual (Zoom)',
    campusSpots: ['Engineering Building Lobby', 'Student Union Lounge'],
    availability: 'Weekdays after 6:00 PM, Saturday all day',
    hoursPerWeek: 4,
    skillsOffered: [
      { id: 'l_figma', name: 'Figma UI Prototyping', category: 'Design & Creative', level: 'Advanced', experienceYears: 2 },
      { id: 'l_git', name: 'Git, GitHub & Team Collaboration', category: 'Tech & Coding', level: 'Expert', experienceYears: 3 }
    ],
    skillsWanted: [
      { id: 'l_algo', name: 'Data Structures & Algorithms', category: 'Academics & STEM', level: 'Intermediate' },
      { id: 'l_react', name: 'React & Frontend Fundamentals', category: 'Tech & Coding', level: 'Intermediate' }
    ],
    isVerifiedStudent: true
  },
  {
    id: 'user_priya',
    name: 'Priya Patel',
    avatar: priyaImg,
    university: 'University Campus & Hackathon Lab',
    major: 'Business Analytics & Finance',
    year: 'Senior (4th Year)',
    bio: 'Data spreadsheet wizard with 2 investment banking internships. Happy to teach Excel modeling & resume optimization in exchange for Python!',
    rating: 4.9,
    reviewsCount: 24,
    completedSwaps: 21,
    learningMode: 'In-Person (Campus)',
    campusSpots: ['Business School Atrium', 'Central Library Study Room 4'],
    availability: 'Fridays 10 AM - 3 PM, Sundays',
    hoursPerWeek: 5,
    skillsOffered: [
      { id: 'p_excel', name: 'Advanced Excel & Financial Modeling', category: 'Business & Career', level: 'Expert', experienceYears: 3 },
      { id: 'p_resume', name: 'Tech & Business Resume Review', category: 'Business & Career', level: 'Advanced', experienceYears: 2 },
      { id: 'p_pres', name: 'Public Speaking & Pitch Decks', category: 'Business & Career', level: 'Advanced', experienceYears: 2 }
    ],
    skillsWanted: [
      { id: 'p_py', name: 'Python for Beginners & Scripting', category: 'Tech & Coding', level: 'Beginner' },
      { id: 'p_sql', name: 'SQL Querying for Beginners', category: 'Tech & Coding', level: 'Beginner' }
    ],
    isVerifiedStudent: true
  },
  {
    id: 'user_carlos',
    name: 'Carlos Mendez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    university: 'University Campus & Hackathon Lab',
    major: 'Modern Languages & International Studies',
    year: 'Senior (4th Year)',
    bio: 'Native Spanish speaker from Bogota, minoring in International Business. Love helping students speak naturally with confidence without grammar dread.',
    rating: 5.0,
    reviewsCount: 17,
    completedSwaps: 15,
    learningMode: 'In-Person (Campus)',
    campusSpots: ['Language Commons 2nd Floor', 'Campus Quad Tables'],
    availability: 'Mon & Wed 12 PM - 3 PM, Thu after 5 PM',
    hoursPerWeek: 6,
    skillsOffered: [
      { id: 'c_spanish', name: 'Conversational Spanish', category: 'Languages', level: 'Expert', experienceYears: 10 },
      { id: 'c_academic', name: 'Academic Essay Structure & Editing', category: 'Academics & STEM', level: 'Advanced', experienceYears: 3 }
    ],
    skillsWanted: [
      { id: 'c_py', name: 'Python for Beginners & Scripting', category: 'Tech & Coding', level: 'Beginner' },
      { id: 'c_react', name: 'React & Frontend Fundamentals', category: 'Tech & Coding', level: 'Beginner' }
    ],
    isVerifiedStudent: true
  },
  {
    id: 'user_marcus',
    name: 'Marcus Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    university: 'University Campus & Hackathon Lab',
    major: 'Robotics & Mechanical Engineering',
    year: 'Junior (3rd Year)',
    bio: 'Maker and hardware tinkerer. Can walk you through 3D modeling in CAD/Blender and Arduino microcontroller basics.',
    rating: 4.7,
    reviewsCount: 11,
    completedSwaps: 8,
    learningMode: 'In-Person (Campus)',
    campusSpots: ['Engineering Makerspace', 'Robotics Lab B14'],
    availability: 'Tuesdays and Thursdays 5 PM - 8 PM',
    hoursPerWeek: 4,
    skillsOffered: [
      { id: 'mk_cad', name: '3D Modeling & CAD (Blender / Fusion 360)', category: 'Design & Creative', level: 'Advanced', experienceYears: 2 },
      { id: 'mk_arduino', name: 'Arduino & Microcontroller Basics', category: 'Tech & Coding', level: 'Intermediate', experienceYears: 2 }
    ],
    skillsWanted: [
      { id: 'mk_react', name: 'React & Frontend Fundamentals', category: 'Tech & Coding', level: 'Beginner' }
    ],
    isVerifiedStudent: true
  },
  {
    id: 'user_sarah',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    university: 'University Campus & Hackathon Lab',
    major: 'Music Production & Audio Tech',
    year: 'Sophomore (2nd Year)',
    bio: 'Musician and sound designer. Teaching Ableton Live beat-making, acoustic guitar fundamentals, and podcast audio mastering.',
    rating: 4.9,
    reviewsCount: 15,
    completedSwaps: 13,
    learningMode: 'Virtual (Zoom)',
    campusSpots: ['Fine Arts Studio C', 'Online Zoom'],
    availability: 'Friday afternoons & Weekends',
    hoursPerWeek: 5,
    skillsOffered: [
      { id: 's_ableton', name: 'Music Production & Beat Making (Ableton / Logic)', category: 'Music & Audio', level: 'Expert', experienceYears: 4 },
      { id: 's_guitar', name: 'Acoustic Guitar Chords & Fingerstyle', category: 'Music & Audio', level: 'Advanced', experienceYears: 5 }
    ],
    skillsWanted: [
      { id: 's_canva', name: 'Canva Design & Social Graphics', category: 'Design & Creative', level: 'Beginner' }
    ],
    isVerifiedStudent: true
  }
];

export const INITIAL_REQUESTS: ExchangeRequest[] = [
  {
    id: 'req_01',
    senderId: 'user_maya',
    senderName: 'Maya Sharma',
    senderAvatar: mayaImg,
    receiverId: 'user_alex',
    receiverName: 'Alex Chen',
    receiverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    skillRequested: 'Python for Beginners & Scripting',
    skillOffered: 'Canva Design & Social Graphics',
    mode: 'Hybrid',
    proposedTime: 'This Thursday at 4:30 PM (60 mins)',
    location: 'Central Library 3rd Floor Study Room',
    message: 'Hey Alex! Saw on your profile that you want Canva help. I can teach you banner layouts & typography tricks if you can help me write my first Python file parser script!',
    status: 'pending',
    createdAt: '2 hours ago',
    pointsCost: 0 // Direct barter swap
  },
  {
    id: 'req_02',
    senderId: 'user_alex',
    senderName: 'Alex Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    receiverId: 'user_carlos',
    receiverName: 'Carlos Mendez',
    receiverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    skillRequested: 'Conversational Spanish',
    skillOffered: 'Learning Points (10 pts)',
    mode: 'In-Person (Campus)',
    proposedTime: 'Friday at 2:00 PM (45 mins)',
    location: 'Student Union Patio Tables',
    message: 'Hola Carlos! I am preparing for a study trip next summer and would love 45 minutes of casual Spanish speaking practice. Offering 10 Learning Points!',
    status: 'accepted',
    createdAt: '1 day ago',
    pointsCost: 10
  },
  {
    id: 'req_03',
    senderId: 'user_liam',
    senderName: 'Liam O’Connor',
    senderAvatar: liamImg,
    receiverId: 'user_alex',
    receiverName: 'Alex Chen',
    receiverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    skillRequested: 'Data Structures & Algorithms',
    skillOffered: 'Figma UI Prototyping',
    mode: 'Virtual (Zoom)',
    proposedTime: 'Completed session: Sunday Sept 20',
    location: 'Campus Zoom Room 849',
    message: 'Session completed: We covered binary tree traversals and Figma auto-layout responsive components.',
    status: 'completed',
    createdAt: '3 days ago',
    pointsCost: 0
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_01',
    title: 'Taught Python Basics',
    description: '1-on-1 peer mentoring session with Maya S. on loops & functions',
    amount: 10,
    type: 'earned_teaching',
    timestamp: 'Yesterday at 3:15 PM',
    peerName: 'Maya Sharma',
    skillName: 'Python for Beginners'
  },
  {
    id: 'tx_02',
    title: 'Learned Figma Component Systems',
    description: 'Session with Liam O. covering nested auto-layout and variant states',
    amount: -10,
    type: 'spent_learning',
    timestamp: '3 days ago',
    peerName: 'Liam O’Connor',
    skillName: 'Figma UI Prototyping'
  },
  {
    id: 'tx_03',
    title: 'Campus Hackathon Welcome Grant',
    description: 'Non-monetary starter learning points credited to all verified student accounts',
    amount: 100,
    type: 'campus_grant',
    timestamp: 'Campus Onboarding'
  },
  {
    id: 'tx_04',
    title: 'Peer Review 5-Star Quality Bonus',
    description: 'Received top rating for being punctual and well-prepared',
    amount: 20,
    type: 'bonus',
    timestamp: 'Last week'
  }
];

export const CAMPUS_SAFETY_RULES = [
  {
    title: 'Always Meet in Designated Public Campus Spaces',
    description: 'Use monitored university locations like the Central Library, Student Union, campus cafes, or department makerspaces. Never hold exchanges in private dorm rooms or off-campus residences.'
  },
  {
    title: 'Zero Real Money — 100% Academic Skill Barter',
    description: 'SkillSwap strictly prohibits cash transactions, paid tutoring fees, venmo/zelle, or monetary solicitation. Keep knowledge free, peer-driven, and equitable for all students.'
  },
  {
    title: 'Use Campus Email & Authorized Virtual Rooms',
    description: 'When meeting remotely, use official university Zoom or Google Meet links. Keep your communication respectful and aligned with the Campus Student Code of Conduct.'
  },
  {
    title: 'Instant Report & Safety Shield',
    description: 'If any user exhibits disrespectful behavior, asks for payment, or misses scheduled sessions repeatedly, report or block them immediately. Campus moderators review all flagged accounts.'
  }
];
