import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Clock, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Save, 
  ShieldCheck,
  Star,
  GraduationCap
} from 'lucide-react';
import { StudentProfile, StudentSkill, SkillLevel, LearningMode } from '../types';
import { SKILL_CATEGORIES } from '../data/mockData';

interface ProfilePageProps {
  currentUser: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  showToast: (msg: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  onUpdateProfile,
  showToast
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(currentUser);

  // New skill offering form states
  const [newOfferName, setNewOfferName] = useState('');
  const [newOfferCategory, setNewOfferCategory] = useState('Tech & Coding');
  const [newOfferLevel, setNewOfferLevel] = useState<SkillLevel>('Intermediate');

  // New skill wanted form states
  const [newWantName, setNewWantName] = useState('');
  const [newWantCategory, setNewWantCategory] = useState('Design & Creative');
  const [newWantLevel, setNewWantLevel] = useState<SkillLevel>('Beginner');

  const handleSave = () => {
    onUpdateProfile(profile);
    setIsEditing(false);
    showToast('Profile and skills updated successfully!');
  };

  const handleAddOfferedSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferName.trim()) return;
    const newSkill: StudentSkill = {
      id: `off_${Date.now()}`,
      name: newOfferName.trim(),
      category: newOfferCategory,
      level: newOfferLevel,
      experienceYears: 1
    };
    setProfile((prev) => ({
      ...prev,
      skillsOffered: [...prev.skillsOffered, newSkill]
    }));
    setNewOfferName('');
    showToast(`Added "${newOfferName}" to your offered skills!`);
  };

  const handleRemoveOfferedSkill = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((s) => s.id !== id)
    }));
  };

  const handleAddWantedSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWantName.trim()) return;
    const newSkill: StudentSkill = {
      id: `want_${Date.now()}`,
      name: newWantName.trim(),
      category: newWantCategory,
      level: newWantLevel
    };
    setProfile((prev) => ({
      ...prev,
      skillsWanted: [...prev.skillsWanted, newSkill]
    }));
    setNewWantName('');
    showToast(`Added "${newWantName}" to your learning interests!`);
  };

  const handleRemoveWantedSkill = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter((s) => s.id !== id)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wide uppercase mb-1">
            <span>Student Academic Portfolio</span>
            <span aria-hidden="true">·</span>
            <span>SkillSwap Credential</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-950">My Student Profile</h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Control what knowledge you offer to teach, what topics you want to learn, and your campus meetup preferences.
          </p>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
            isEditing
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-stone-900 hover:bg-stone-800 text-white'
          }`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <User className="w-4 h-4" />
              <span>Edit Profile Details</span>
            </>
          )}
        </button>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={profile.avatar}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-stone-200 shadow-xs"
          />
          <div className="space-y-1.5 flex-1">
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Major & Field</label>
                  <input
                    type="text"
                    value={profile.major}
                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-stone-950">{profile.name}</h2>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified Student ID
                  </span>
                </div>
                <div className="text-xs text-stone-500">
                  {profile.major} · {profile.year} · {profile.university}
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500 mr-1" />
                    <span className="font-bold font-mono">{profile.rating}</span>
                  </div>
                  <span>({profile.reviewsCount} reviews)</span>
                  <span>·</span>
                  <span>{profile.completedSwaps} completed swaps</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Student Bio & Academic Focus
          </label>
          {isEditing ? (
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500"
            />
          ) : (
            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Availability & Mode Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Weekly Availability
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.availability}
                onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs"
              />
            ) : (
              <div className="flex items-center gap-2 text-xs text-stone-800">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{profile.availability}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Learning Mode Preference
            </label>
            {isEditing ? (
              <select
                value={profile.learningMode}
                onChange={(e) => setProfile({ ...profile, learningMode: e.target.value as LearningMode })}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs"
              >
                <option value="In-Person (Campus)">In-Person (Campus)</option>
                <option value="Virtual (Zoom)">Virtual (Campus Zoom)</option>
                <option value="Hybrid">Hybrid (Both)</option>
              </select>
            ) : (
              <span className="text-xs text-stone-800 font-medium">
                {profile.learningMode}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Skills Offered Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900">Skills You Offer to Teach</h2>
            <p className="text-xs text-stone-500">Other students will request peer sessions for these topics</p>
          </div>
          <span className="text-xs font-mono text-stone-500 tabular-nums">
            {profile.skillsOffered.length} active skills
          </span>
        </div>

        {/* Existing Offered Skills */}
        <div className="space-y-2.5">
          {profile.skillsOffered.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-xs text-stone-900">{skill.name}</span>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-0.5">
                  <span>{skill.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Proficiency: <strong className="text-stone-700">{skill.level}</strong></span>
                  {skill.experienceYears && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{skill.experienceYears} yrs practice</span>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleRemoveOfferedSkill(skill.id)}
                className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-200 transition-colors"
                title="Remove skill"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Form to Add Skill Offered */}
        <form onSubmit={handleAddOfferedSkill} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
            + Offer a New Skill
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-stone-600 mb-1">Skill Name</label>
              <input
                type="text"
                placeholder="e.g. SQL Querying, Graphic Design..."
                value={newOfferName}
                onChange={(e) => setNewOfferName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1">Category</label>
              <select
                value={newOfferCategory}
                onChange={(e) => setNewOfferCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
              >
                {SKILL_CATEGORIES.filter(c => c !== 'All Categories').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-600 mb-1">Proficiency Level</label>
              <select
                value={newOfferLevel}
                onChange={(e) => setNewOfferLevel(e.target.value as SkillLevel)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="Beginner">Beginner (Foundations)</option>
                <option value="Intermediate">Intermediate (Coursework)</option>
                <option value="Advanced">Advanced (Projects/Internships)</option>
                <option value="Expert">Expert (Teaching Experience)</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Teaching Skill</span>
          </button>
        </form>
      </div>

      {/* Skills Wanted Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900">Skills You Want to Learn</h2>
            <p className="text-xs text-stone-500">SkillSwap uses these to match you with compatible peer mentors</p>
          </div>
          <span className="text-xs font-mono text-stone-500 tabular-nums">
            {profile.skillsWanted.length} wanted
          </span>
        </div>

        {/* Existing Wanted Skills */}
        <div className="space-y-2.5">
          {profile.skillsWanted.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/30 flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-xs text-stone-900">{skill.name}</span>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-0.5">
                  <span>{skill.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Target: {skill.level}</span>
                </div>
              </div>

              <button
                onClick={() => handleRemoveWantedSkill(skill.id)}
                className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-200 transition-colors"
                title="Remove skill"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Form to Add Skill Wanted */}
        <form onSubmit={handleAddWantedSkill} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
            + Add Learning Goal
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-stone-600 mb-1">Topic / Skill</label>
              <input
                type="text"
                placeholder="e.g. Video Editing, French..."
                value={newWantName}
                onChange={(e) => setNewWantName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1">Category</label>
              <select
                value={newWantCategory}
                onChange={(e) => setNewWantCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
              >
                {SKILL_CATEGORIES.filter(c => c !== 'All Categories').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-600 mb-1">Target Proficiency</label>
              <select
                value={newWantLevel}
                onChange={(e) => setNewWantLevel(e.target.value as SkillLevel)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="Beginner">Beginner (Getting started)</option>
                <option value="Intermediate">Intermediate (Leveling up)</option>
                <option value="Advanced">Advanced (Mastery)</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Learning Goal</span>
          </button>
        </form>
      </div>

    </div>
  );
};
