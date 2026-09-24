import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  UserX, 
  MapPin, 
  Lock, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2, 
  Check, 
  X,
  FileText
} from 'lucide-react';
import { CAMPUS_SAFETY_RULES } from '../data/mockData';
import { SafetyReport, StudentProfile } from '../types';

interface SafetyPageProps {
  reports: SafetyReport[];
  blockedUsers: { id: string; name: string; date: string }[];
  onUnblockUser: (userId: string) => void;
  onOpenReportModalWithStudent?: () => void;
  students: StudentProfile[];
  onOpenReportForStudent: (student: StudentProfile) => void;
}

export const SafetyPage: React.FC<SafetyPageProps> = ({
  reports,
  blockedUsers,
  onUnblockUser,
  students,
  onOpenReportForStudent
}) => {
  const [selectedStudentToReport, setSelectedStudentToReport] = useState<string>(students[0]?.id || '');

  const handleLaunchReport = () => {
    const target = students.find((s) => s.id === selectedStudentToReport);
    if (target) {
      onOpenReportForStudent(target);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Campus Trust &amp; Safety Framework</span>
          <span aria-hidden="true">·</span>
          <span>Zero-Tolerance Policy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-950">Safety, Ethics &amp; Reporting</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-1">
          SkillSwap is built exclusively for peer-to-peer student growth. We enforce strict public-meetup guidelines, 
          zero-money rules, and immediate safety reporting tools.
        </p>
      </div>

      {/* Mandatory Hackathon Disclaimer Callout */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Hackathon Prototype Notice &amp; Legal Disclaimers</span>
        </div>
        <p className="leading-relaxed">
          <strong>1. Sample Data:</strong> All profiles, ratings, and feedback shown within this application are synthetic sample data created for demonstration purposes.
        </p>
        <p className="leading-relaxed">
          <strong>2. No Automatic Accreditation or Guaranteed Employment:</strong> SkillSwap facilitates informal peer study swaps. It makes no claim of automatic skill verification, institutional testing certification, or guaranteed post-graduation employment outcomes.
        </p>
        <p className="leading-relaxed">
          <strong>3. Non-Commercial Academic Sandbox:</strong> No financial transaction processing or fiat currency deposit exists in this application.
        </p>
      </div>

      {/* 4 Pillars of Campus Safety */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAMPUS_SAFETY_RULES.map((rule, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-xs">
              0{idx + 1}
            </div>
            <h3 className="font-bold text-sm text-stone-900">{rule.title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {rule.description}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Safety Actions: Report & Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Report Launcher */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">File a Safety Report</h2>
              <p className="text-xs text-stone-500">Confidential campus moderator triage</p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Report any student asking for cash fees, demonstrating inappropriate behavior, or missing confirmed sessions without notice.
          </p>

          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Select Classmate to Report
              </label>
              <select
                value={selectedStudentToReport}
                onChange={(e) => setSelectedStudentToReport(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.major})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleLaunchReport}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Open Safety Report Form</span>
            </button>
          </div>
        </div>

        {/* Right Column: Blocked Users Management */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
              <UserX className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Blocked Students List</h2>
              <p className="text-xs text-stone-500">Prevent future messages &amp; swap proposals</p>
            </div>
          </div>

          {blockedUsers.length === 0 ? (
            <div className="p-6 text-center text-xs text-stone-500 border border-dashed border-stone-200 rounded-xl">
              You have no blocked users. Your swap requests are open to all campus classmates.
            </div>
          ) : (
            <div className="space-y-2.5">
              {blockedUsers.map((b) => (
                <div
                  key={b.id}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-stone-900 block">{b.name}</span>
                    <span className="text-[11px] text-stone-400">Blocked on {b.date}</span>
                  </div>

                  <button
                    onClick={() => onUnblockUser(b.id)}
                    className="px-3 py-1 text-xs font-medium text-stone-700 hover:text-stone-950 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg transition-colors"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Submitted Reports Log */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900">Your Filed Reports History</h2>
            <p className="text-xs text-stone-500">Track status of reports submitted to campus peer safety</p>
          </div>
          <span className="text-xs font-mono text-stone-500 tabular-nums">
            {reports.length} reports logged
          </span>
        </div>

        {reports.length === 0 ? (
          <div className="p-6 text-center text-xs text-stone-500">
            No incident reports submitted.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {reports.map((rep) => (
              <div key={rep.id} className="py-3 flex items-center justify-between text-xs gap-4">
                <div className="space-y-0.5">
                  <span className="font-semibold text-stone-900">
                    Report against {rep.reportedUserName}
                  </span>
                  <p className="text-stone-500 text-[11px]">
                    <strong>Reason:</strong> {rep.reason}
                    {rep.details && ` — "${rep.details}"`}
                  </p>
                  <span className="text-[10px] text-stone-400 block">{rep.timestamp}</span>
                </div>

                <span className="px-2.5 py-0.5 rounded font-bold text-[11px] bg-amber-100 text-amber-900 shrink-0">
                  {rep.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Campus Emergency Resources */}
      <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-3">
        <h3 className="font-bold text-sm text-amber-300">University Campus Support Directory</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300 pt-1">
          <div>
            <strong>Campus Safety Escort:</strong>
            <p className="text-stone-400 font-mono">555-0199 (Ext. 2)</p>
          </div>
          <div>
            <strong>Library Help Desk:</strong>
            <p className="text-stone-400 font-mono">library@campus.edu</p>
          </div>
          <div>
            <strong>Student Mediation Office:</strong>
            <p className="text-stone-400 font-mono">honorcode@campus.edu</p>
          </div>
        </div>
      </div>
    </div>
  );
};
