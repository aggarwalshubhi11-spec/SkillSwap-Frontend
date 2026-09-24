export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type LearningMode = 'In-Person (Campus)' | 'Virtual (Zoom)' | 'Hybrid';

export type RequestStatus = 'pending' | 'accepted' | 'completed' | 'declined';

export interface StudentSkill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  experienceYears?: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  university: string;
  major: string;
  year: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  completedSwaps: number;
  learningMode: LearningMode;
  campusSpots: string[];
  availability: string;
  hoursPerWeek: number;
  skillsOffered: StudentSkill[];
  skillsWanted: StudentSkill[];
  isVerifiedStudent?: boolean;
}

export interface ExchangeRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  skillRequested: string; // Skill to learn
  skillOffered: string;   // Skill offered in return, or "Learning Points (10 pts)"
  mode: LearningMode;
  proposedTime: string;
  location: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
  pointsCost: number;
}

export interface WalletTransaction {
  id: string;
  title: string;
  description: string;
  amount: number; // positive = earned, negative = spent
  type: 'earned_teaching' | 'spent_learning' | 'campus_grant' | 'bonus';
  timestamp: string;
  peerName?: string;
  skillName?: string;
}

export interface SafetyReport {
  id: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: string;
  details: string;
  timestamp: string;
  status: 'Under Review' | 'Resolved';
}

export interface MatchRecommendation {
  student: StudentProfile;
  matchType: 'direct_reciprocal' | 'complementary' | 'campus_proximity';
  compatibilityScore: number;
  matchingReasons: string[];
  teachesYouWant: string[];
  wantsYouTeach: string[];
}
