import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  MessageSquare, 
  Send, 
  Coins, 
  ShieldAlert,
  Calendar,
  Check,
  X
} from 'lucide-react';
import { ExchangeRequest, StudentProfile } from '../types';

interface RequestsPageProps {
  currentUser: StudentProfile;
  requests: ExchangeRequest[];
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onCompleteSession: (requestId: string) => void;
  onCancelRequest: (requestId: string) => void;
  onOpenSwapModal: () => void;
}

export const RequestsPage: React.FC<RequestsPageProps> = ({
  currentUser,
  requests,
  onAcceptRequest,
  onDeclineRequest,
  onCompleteSession,
  onCancelRequest,
  onOpenSwapModal
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'incoming' | 'outgoing' | 'history'>('incoming');

  const incomingRequests = requests.filter((r) => r.receiverId === currentUser.id && r.status === 'pending');
  const outgoingRequests = requests.filter((r) => r.senderId === currentUser.id && r.status === 'pending');
  const activeSessions = requests.filter(
    (r) => (r.senderId === currentUser.id || r.receiverId === currentUser.id) && r.status === 'accepted'
  );
  const completedOrDeclined = requests.filter(
    (r) => (r.senderId === currentUser.id || r.receiverId === currentUser.id) && (r.status === 'completed' || r.status === 'declined')
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wide uppercase mb-1">
            <span>Exchange Manager</span>
            <span aria-hidden="true">·</span>
            <span>Frontend State Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-950">SkillSwap Requests</h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Review incoming proposals from classmates, track outgoing swap offers, and mark finished sessions.
          </p>
        </div>

        <button
          onClick={onOpenSwapModal}
          className="px-4 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>New Swap Proposal</span>
        </button>
      </div>

      {/* Segmented Sub-Navigation (Zero-Pill Discipline) */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('incoming')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'incoming'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Incoming Offers</span>
          {incomingRequests.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">
              {incomingRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('outgoing')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'outgoing'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Outgoing Sent</span>
          {outgoingRequests.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-stone-300 text-stone-900 text-[10px]">
              {outgoingRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeSubTab === 'history'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <span>Active & Completed Sessions ({activeSessions.length + completedOrDeclined.length})</span>
        </button>
      </div>

      {/* Content for Incoming */}
      {activeSubTab === 'incoming' && (
        <div className="space-y-4">
          {incomingRequests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-stone-300 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-stone-400 mx-auto" />
              <h3 className="text-sm font-bold text-stone-900">All caught up!</h3>
              <p className="text-xs text-stone-500">
                You have no pending incoming proposals. Make sure your profile has up-to-date skills offered.
              </p>
            </div>
          ) : (
            incomingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.senderAvatar}
                      alt={req.senderName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h3 className="font-bold text-stone-950 text-sm">{req.senderName} wants to exchange skills</h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>Submitted {req.createdAt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{req.mode}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    Pending Decision
                  </span>
                </div>

                {/* Trade Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-[11px] font-semibold text-stone-500 block mb-0.5">
                      They Want to Learn From You:
                    </span>
                    <strong className="text-stone-900">{req.skillRequested}</strong>
                  </div>

                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-semibold text-amber-900 block mb-0.5">
                      They Offer in Return:
                    </span>
                    <strong className="text-amber-950">{req.skillOffered}</strong>
                  </div>
                </div>

                {/* Message & Logistics */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-stone-700">
                    <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span><strong>Proposed Time:</strong> {req.proposedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span><strong>Meetup Location:</strong> {req.location}</span>
                  </div>
                  <div className="pt-1 text-stone-600 border-t border-stone-200/60 italic">
                    &ldquo;{req.message}&rdquo;
                  </div>
                </div>

                {/* Accept / Decline Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => onDeclineRequest(req.id)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Decline</span>
                  </button>

                  <button
                    onClick={() => onAcceptRequest(req.id)}
                    className="px-5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Accept Swap & Schedule</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Content for Outgoing */}
      {activeSubTab === 'outgoing' && (
        <div className="space-y-4">
          {outgoingRequests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-stone-300 space-y-3">
              <Send className="w-8 h-8 text-stone-400 mx-auto" />
              <h3 className="text-sm font-bold text-stone-900">No pending sent proposals</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore campus peers and propose your first barter swap session!
              </p>
              <button
                onClick={onOpenSwapModal}
                className="px-4 py-2 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs"
              >
                Propose a Swap Now
              </button>
            </div>
          ) : (
            outgoingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.receiverAvatar}
                      alt={req.receiverName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h3 className="font-bold text-stone-950 text-sm">
                        You sent a swap proposal to {req.receiverName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>Submitted {req.createdAt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{req.mode}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md">
                    Awaiting Classmate Response
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-[11px] font-semibold text-stone-500 block mb-0.5">
                      You Want to Learn:
                    </span>
                    <strong className="text-stone-900">{req.skillRequested}</strong>
                  </div>

                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-semibold text-amber-900 block mb-0.5">
                      You Offered in Return:
                    </span>
                    <strong className="text-amber-950">{req.skillOffered}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="text-stone-500">
                    Target location: {req.location}
                  </div>
                  <button
                    onClick={() => onCancelRequest(req.id)}
                    className="text-stone-500 hover:text-stone-800 text-xs underline underline-offset-2"
                  >
                    Withdraw Proposal
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Content for Active & Completed History */}
      {activeSubTab === 'history' && (
        <div className="space-y-6">
          {/* Active Confirmed Sessions */}
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
              Confirmed Upcoming Sessions
            </h2>
            {activeSessions.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 bg-white border border-stone-200 rounded-xl">
                No sessions currently in progress. Accept an incoming offer to start learning!
              </div>
            ) : (
              <div className="space-y-3">
                {activeSessions.map((req) => {
                  const otherPartyName = req.senderId === currentUser.id ? req.receiverName : req.senderName;
                  return (
                    <div
                      key={req.id}
                      className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Session with {otherPartyName}</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                          Confirmed &amp; Scheduled
                        </span>
                      </div>

                      <div className="text-xs text-stone-600 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-emerald-50/30 p-3 rounded-xl border border-emerald-100">
                        <div><strong>Topic:</strong> {req.skillRequested} &harr; {req.skillOffered}</div>
                        <div><strong>Meeting:</strong> {req.location} ({req.mode})</div>
                        <div className="sm:col-span-2"><strong>Time:</strong> {req.proposedTime}</div>
                      </div>

                      <div className="pt-1 flex items-center justify-end">
                        <button
                          onClick={() => onCompleteSession(req.id)}
                          className="px-4 py-2 text-xs font-bold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Session Completed (+10 pts)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Past History */}
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
              Completed & Past Exchanges
            </h2>
            {completedOrDeclined.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 bg-white border border-stone-200 rounded-xl">
                No past exchange history recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {completedOrDeclined.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl bg-white border border-stone-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {req.skillRequested} ({req.senderName} & {req.receiverName})
                      </span>
                      <span className="text-stone-500">
                        {req.proposedTime} · {req.mode}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                      req.status === 'completed' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {req.status === 'completed' ? 'Completed Session' : 'Declined'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
