import React, { useState } from 'react';
import { X, ArrowLeftRight, Coins, Clock, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { StudentProfile, ExchangeRequest, LearningMode } from '../types';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: StudentProfile;
  students: StudentProfile[];
  preselectedStudent?: StudentProfile | null;
  walletBalance: number;
  onSubmitRequest: (newRequest: Omit<ExchangeRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  students,
  preselectedStudent,
  walletBalance,
  onSubmitRequest
}) => {
  if (!isOpen) return null;

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    preselectedStudent ? preselectedStudent.id : (students[0]?.id || '')
  );

  const targetStudent = students.find((s) => s.id === selectedStudentId) || preselectedStudent || students[0];

  const [skillToLearn, setSkillToLearn] = useState<string>(
    targetStudent?.skillsOffered[0]?.name || 'Canva Design & Social Graphics'
  );

  const [exchangeType, setExchangeType] = useState<'skill' | 'points'>('skill');
  const [offeredSkill, setOfferedSkill] = useState<string>(
    currentUser.skillsOffered[0]?.name || 'Python for Beginners & Scripting'
  );

  const [learningMode, setLearningMode] = useState<LearningMode>(targetStudent?.learningMode || 'Hybrid');
  const [preferredTime, setPreferredTime] = useState<string>('This Thursday between 4:00 PM - 6:00 PM');
  const [meetingLocation, setMeetingLocation] = useState<string>(
    targetStudent?.campusSpots[0] || 'Central University Library - 2nd Floor Study Commons'
  );
  const [message, setMessage] = useState<string>(
    `Hi ${targetStudent?.name.split(' ')[0] || 'there'}! I saw your profile and would love to exchange an hour of learning with you.`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudent) return;

    const skillOfferedText = exchangeType === 'skill' 
      ? offeredSkill 
      : 'Learning Points (10 pts)';

    onSubmitRequest({
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: targetStudent.id,
      receiverName: targetStudent.name,
      receiverAvatar: targetStudent.avatar,
      skillRequested: skillToLearn,
      skillOffered: skillOfferedText,
      mode: learningMode,
      proposedTime: preferredTime,
      location: meetingLocation,
      message,
      pointsCost: exchangeType === 'points' ? 10 : 0
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Propose a SkillSwap</h2>
            <p className="text-xs text-stone-500">Zero real money · 1-on-1 peer learning session</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-sm">
          {/* Target Student Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Swap Partner
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                setSelectedStudentId(e.target.value);
                const s = students.find((item) => item.id === e.target.value);
                if (s && s.skillsOffered.length > 0) {
                  setSkillToLearn(s.skillsOffered[0].name);
                  if (s.campusSpots.length > 0) {
                    setMeetingLocation(s.campusSpots[0]);
                  }
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} · {student.major} ({student.year})
                </option>
              ))}
            </select>
          </div>

          {/* Skill you want to learn */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Skill You Want to Learn from {targetStudent?.name}
            </label>
            <select
              value={skillToLearn}
              onChange={(e) => setSkillToLearn(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {targetStudent?.skillsOffered.map((sk) => (
                <option key={sk.id} value={sk.name}>
                  {sk.name} ({sk.level} level)
                </option>
              ))}
              <option value="Custom Topic / Portfolio Review">Custom Topic / Portfolio Review</option>
            </select>
          </div>

          {/* Exchange Method: Barter skill vs Non-monetary points */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              How Will You Return the Knowledge?
            </label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                type="button"
                onClick={() => setExchangeType('skill')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  exchangeType === 'skill'
                    ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-stone-900 text-xs mb-1">
                  <ArrowLeftRight className="w-4 h-4 text-amber-600" />
                  <span>Direct Skill Barter</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-tight">
                  Teach them one of your skills in return (0 points cost).
                </p>
              </button>

              <button
                type="button"
                onClick={() => setExchangeType('points')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  exchangeType === 'points'
                    ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-stone-900 text-xs mb-1">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span>Use Learning Points</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-tight">
                  Deduct 10 non-monetary points from your credit wallet ({walletBalance} available).
                </p>
              </button>
            </div>

            {exchangeType === 'skill' ? (
              <div>
                <label className="block text-xs text-stone-600 mb-1">Select which skill you offer:</label>
                <select
                  value={offeredSkill}
                  onChange={(e) => setOfferedSkill(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {currentUser.skillsOffered.map((sk) => (
                    <option key={sk.id} value={sk.name}>
                      {sk.name} ({sk.level})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
                <span>Session Fee: 10 Learning Points</span>
                <span className="font-mono font-bold">Remaining balance: {walletBalance - 10} pts</span>
              </div>
            )}
          </div>

          {/* Logistics: Mode & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Learning Mode
              </label>
              <select
                value={learningMode}
                onChange={(e) => setLearningMode(e.target.value as LearningMode)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs"
              >
                <option value="In-Person (Campus)">In-Person (Campus)</option>
                <option value="Virtual (Zoom)">Virtual (Campus Zoom)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Safe Campus Spot / Platform
              </label>
              <input
                type="text"
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
                placeholder="e.g. Campus Library 2nd Floor"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs"
              />
            </div>
          </div>

          {/* Time & Session Message */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Proposed Schedule / Availability
            </label>
            <input
              type="text"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              placeholder="e.g. This Thursday after 4:30 PM (approx 60 mins)"
              className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Session Goal / Note
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and specify what you'd like to work on..."
              className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Send Swap Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
