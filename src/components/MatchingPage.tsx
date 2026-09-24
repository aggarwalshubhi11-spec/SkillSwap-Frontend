import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeftRight, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  HeartHandshake,
  Layers,
  ChevronRight
} from 'lucide-react';
import { StudentProfile, MatchRecommendation } from '../types';

interface MatchingPageProps {
  currentUser: StudentProfile;
  recommendations: MatchRecommendation[];
  onSelectStudentForSwap: (student: StudentProfile) => void;
  onOpenReportModal: (student: StudentProfile) => void;
}

export const MatchingPage: React.FC<MatchingPageProps> = ({
  currentUser,
  recommendations,
  onSelectStudentForSwap,
  onOpenReportModal
}) => {
  const [filterType, setFilterType] = useState<'all' | 'reciprocal' | 'complementary'>('all');

  const filteredMatches = recommendations.filter((match) => {
    if (filterType === 'reciprocal') return match.matchType === 'direct_reciprocal';
    if (filterType === 'complementary') return match.matchType !== 'direct_reciprocal';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wide uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart Matching Engine</span>
          <span aria-hidden="true">·</span>
          <span>Reciprocal Peer Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-950">Compatible Study Partners</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-1">
          SkillSwap analyzes what you offer to teach and what you desire to learn, 
          finding classmates with reciprocal needs so you can barter knowledge without spending real money.
        </p>
      </div>

      {/* Filter Tabs (Zero-Pill discipline: segmented button control) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            All Compatible Matches ({recommendations.length})
          </button>
          <button
            onClick={() => setFilterType('reciprocal')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              filterType === 'reciprocal'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
            <span>100% Direct Barters (Reciprocal)</span>
          </button>
          <button
            onClick={() => setFilterType('complementary')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'complementary'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            Complementary Skills & Proximity
          </button>
        </div>

        <div className="text-xs text-stone-500">
          Ranked by skill compatibility &amp; campus availability
        </div>
      </div>

      {/* Matches Grid */}
      <div className="space-y-6">
        {filteredMatches.map((rec) => {
          const isDirectReciprocal = rec.matchType === 'direct_reciprocal';
          return (
            <div
              key={rec.student.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs transition-all ${
                isDirectReciprocal
                  ? 'border-amber-300 ring-2 ring-amber-400/20'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Column 1: Student info */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={rec.student.avatar}
                      alt={rec.student.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-stone-950">{rec.student.name}</h3>
                        {rec.student.isVerifiedStudent && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <div className="text-xs text-stone-500">
                        {rec.student.major} · {rec.student.year}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-stone-700 pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                        <span className="font-bold font-mono">{rec.student.rating}</span>
                        <span className="text-stone-400">({rec.student.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {rec.student.bio}
                  </p>

                  <div className="text-xs text-stone-500 space-y-1 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{rec.student.campusSpots[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{rec.student.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: The Exact Match Reason & Skill Alignment Box */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Highlight Box */}
                  <div className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                    isDirectReciprocal 
                      ? 'bg-amber-50/70 border-amber-200' 
                      : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDirectReciprocal ? 'text-amber-900' : 'text-stone-700'
                      }`}>
                        {isDirectReciprocal ? '⭐ 1-to-1 Reciprocal Match Found' : 'Complementary Knowledge Match'}
                      </span>
                      <span className="font-mono font-bold text-emerald-800">
                        {rec.compatibilityScore}% Compatibility
                      </span>
                    </div>

                    {/* Reasons breakdown list */}
                    <div className="space-y-1.5">
                      {rec.matchingReasons.map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-stone-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Alignment Comparison */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-[11px] font-semibold text-stone-600 block mb-1">
                        They Teach What You Want:
                      </span>
                      <ul className="space-y-0.5 font-medium text-stone-900">
                        {rec.teachesYouWant.map((s, idx) => (
                          <li key={idx} className="text-amber-950 font-bold">• {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-[11px] font-semibold text-stone-600 block mb-1">
                        You Teach What They Want:
                      </span>
                      <ul className="space-y-0.5 font-medium text-stone-900">
                        {rec.wantsYouTeach.length > 0 ? (
                          rec.wantsYouTeach.map((s, idx) => (
                            <li key={idx} className="text-emerald-900 font-bold">• {s}</li>
                          ))
                        ) : (
                          <li className="text-stone-500 italic">• Will accept Learning Points</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Column 3: Quick Action */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-4 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-stone-200 lg:pl-6">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-stone-700 block">Proposed Swap Format</span>
                    <div className="text-xs text-stone-600 space-y-1">
                      <p>• 60-min reciprocal session</p>
                      <p>• {rec.student.learningMode}</p>
                      <p>• Zero dollar cost</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => onSelectStudentForSwap(rec.student)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                      <span>Initiate SkillSwap</span>
                    </button>

                    <button
                      onClick={() => onOpenReportModal(rec.student)}
                      className="w-full py-1.5 text-[11px] font-medium text-stone-400 hover:text-stone-600 transition-colors text-center"
                    >
                      Report / Safety
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
