import React from 'react';
import { 
  User, 
  Coins, 
  ArrowLeftRight, 
  Clock, 
  MapPin, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  ExternalLink,
  Plus
} from 'lucide-react';
import { StudentProfile, ExchangeRequest, MatchRecommendation } from '../types';

interface DashboardProps {
  currentUser: StudentProfile;
  walletBalance: number;
  requests: ExchangeRequest[];
  recommendedMatches: MatchRecommendation[];
  onNavigate: (tab: string) => void;
  onOpenSwapModal: (student?: StudentProfile) => void;
  onAcceptRequest: (requestId: string) => void;
  onCompleteSession: (requestId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  walletBalance,
  requests,
  recommendedMatches,
  onNavigate,
  onOpenSwapModal,
  onAcceptRequest,
  onCompleteSession
}) => {
  const pendingIncoming = requests.filter(
    (r) => r.receiverId === currentUser.id && r.status === 'pending'
  );
  const activeExchanges = requests.filter(
    (r) => (r.receiverId === currentUser.id || r.senderId === currentUser.id) && r.status === 'accepted'
  );
  const completedExchanges = requests.filter(
    (r) => (r.receiverId === currentUser.id || r.senderId === currentUser.id) && r.status === 'completed'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome & Profile Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-stone-200 flex items-center justify-center text-stone-900 font-bold text-xl overflow-hidden shadow-xs">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>AC</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" title="Active on Campus" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-stone-950">{currentUser.name}</h1>
                <span className="text-xs text-stone-500 font-medium">·</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified Student
                </span>
              </div>
              {/* Unboxed metadata with typographic separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span>{currentUser.major}</span>
                <span aria-hidden="true">·</span>
                <span>{currentUser.year}</span>
                <span aria-hidden="true">·</span>
                <span>{currentUser.learningMode}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-600 pt-0.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500 mr-1" />
                  <span className="font-bold text-stone-900 font-mono tabular-nums">{currentUser.rating}</span>
                </div>
                <span>({currentUser.reviewsCount} peer reviews)</span>
                <span aria-hidden="true">·</span>
                <span>{currentUser.completedSwaps} exchanges completed</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Wallet points card */}
            <div 
              onClick={() => onNavigate('wallet')}
              className="cursor-pointer px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-colors flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] text-stone-500 uppercase font-semibold">Credit Balance</span>
                <span className="font-mono tabular-nums font-bold text-base text-stone-900">
                  {walletBalance} <span className="text-xs text-stone-500 font-normal">SkillPoints</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('profile')}
              className="px-4 py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors"
            >
              Edit Profile & Skills
            </button>

            <button
              onClick={() => onOpenSwapModal()}
              className="px-4 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Propose Swap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Skills Summary & Active Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Skills Offered & Wanted */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Skills Offered Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">Skills You Offer to Teach</h2>
                <p className="text-xs text-stone-500">Other students can request these in exchange for their skills or points</p>
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
              >
                + Add Skill
              </button>
            </div>

            <div className="space-y-3">
              {currentUser.skillsOffered.map((skill) => (
                <div 
                  key={skill.id}
                  className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-sm text-stone-900">{skill.name}</span>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>{skill.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Level: <strong className="text-stone-700">{skill.level}</strong></span>
                      {skill.experienceYears && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{skill.experienceYears} yrs experience</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Active Offering
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Wanted Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">Skills You Want to Learn</h2>
                <p className="text-xs text-stone-500">Used by the matching engine to find reciprocal peers</p>
              </div>
              <button
                onClick={() => onNavigate('matches')}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Find Tutors</span>
              </button>
            </div>

            <div className="space-y-3">
              {currentUser.skillsWanted.map((skill) => (
                <div 
                  key={skill.id}
                  className="p-3.5 rounded-xl border border-stone-200 bg-amber-50/30 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-sm text-stone-900">{skill.name}</span>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>{skill.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Target Level: {skill.level}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('matches')}
                    className="text-xs font-semibold text-stone-800 hover:text-amber-800 bg-white border border-stone-200 hover:border-amber-300 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Match Peers
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Availability & Campus Hotspots */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 text-sm">Campus Availability & Safe Meetup Spots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <span className="font-semibold text-stone-500 block mb-1">Weekly Schedule</span>
                <p className="text-stone-800 font-medium">{currentUser.availability}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-500 block mb-1">Designated Study Spots</span>
                <ul className="text-stone-800 space-y-0.5">
                  {currentUser.campusSpots.map((spot, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{spot}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pending Inbound & Active Exchanges */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Inbound Swap Requests Notice */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-stone-900">Incoming Requests</h2>
                {pendingIncoming.length > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-white">
                    {pendingIncoming.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => onNavigate('requests')}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
              >
                View All
              </button>
            </div>

            {pendingIncoming.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 border border-dashed border-stone-200 rounded-xl">
                No pending incoming requests right now. Check back soon or explore peers!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingIncoming.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={req.senderAvatar}
                          alt={req.senderName}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover border border-stone-200"
                        />
                        <div>
                          <span className="font-bold text-xs text-stone-900 block">{req.senderName}</span>
                          <span className="text-[11px] text-stone-500">{req.createdAt}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        Swap Offer
                      </span>
                    </div>

                    <div className="text-xs space-y-1 bg-white p-2.5 rounded-lg border border-stone-200">
                      <div>
                        <span className="text-stone-500">Wants to learn: </span>
                        <strong className="text-stone-900">{req.skillRequested}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500">Offers in return: </span>
                        <strong className="text-amber-800">{req.skillOffered}</strong>
                      </div>
                      <p className="text-[11px] text-stone-600 italic pt-1 line-clamp-2">
                        &ldquo;{req.message}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onAcceptRequest(req.id)}
                        className="flex-1 py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Accept Swap
                      </button>
                      <button
                        onClick={() => onNavigate('requests')}
                        className="py-1.5 px-3 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active / Scheduled Sessions */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">Scheduled Sessions</h2>
              <span className="text-xs text-stone-500 font-mono tabular-nums">{activeExchanges.length} active</span>
            </div>

            {activeExchanges.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 border border-dashed border-stone-200 rounded-xl">
                No active exchanges scheduled. Propose a swap to get started!
              </div>
            ) : (
              <div className="space-y-3">
                {activeExchanges.map((req) => (
                  <div key={req.id} className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/20 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">
                        {req.senderId === currentUser.id ? `Teaching with ${req.receiverName}` : `Learning with ${req.senderName}`}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Confirmed
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{req.proposedTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{req.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onCompleteSession(req.id)}
                      className="w-full py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete & Claim Learning Points</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Smart Match Teaser */}
          <div className="bg-stone-900 rounded-2xl p-5 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Top Reciprocal Match</span>
              </span>
              <span className="text-[11px] text-stone-400">100% Synergy</span>
            </div>

            {recommendedMatches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={recommendedMatches[0].student.avatar}
                    alt={recommendedMatches[0].student.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-stone-700"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{recommendedMatches[0].student.name}</h4>
                    <p className="text-xs text-stone-400">{recommendedMatches[0].student.major}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed pt-1">
                  Maya teaches <strong>Canva</strong> & wants your <strong>Python</strong> skills!
                </p>

                <button
                  onClick={() => onNavigate('matches')}
                  className="w-full mt-2 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-colors"
                >
                  View Smart Match &rarr;
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
