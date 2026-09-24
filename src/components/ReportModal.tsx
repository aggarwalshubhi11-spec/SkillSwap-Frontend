import React, { useState } from 'react';
import { X, ShieldAlert, AlertTriangle, UserX, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetStudent: StudentProfile | null;
  onSubmitReport: (report: {
    reportedUserId: string;
    reportedUserName: string;
    reason: string;
    details: string;
    blockUser: boolean;
  }) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetStudent,
  onSubmitReport
}) => {
  if (!isOpen || !targetStudent) return null;

  const [reason, setReason] = useState<string>('Unresponsive or Repeated No-Show');
  const [details, setDetails] = useState<string>('');
  const [alsoBlock, setAlsoBlock] = useState<boolean>(true);

  const reportReasons = [
    'Unresponsive or Repeated No-Show',
    'Attempted to charge real money / Venmo / Cash',
    'Off-campus / unsafe meeting pressure',
    'Inappropriate, offensive, or harassing behavior',
    'Spam, advertising, or academic dishonesty'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport({
      reportedUserId: targetStudent.id,
      reportedUserName: targetStudent.name,
      reason,
      details,
      blockUser: alsoBlock
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-red-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Safety Report & Block</h2>
              <p className="text-xs text-stone-500">Target Student: {targetStudent.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            <p className="font-semibold mb-1">Campus Community Honor Code</p>
            <p>
              SkillSwap is built for safe peer academic enrichment. If a student is violating platform guidelines or making you uncomfortable, let us know immediately.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Reason for Reporting
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs focus:ring-2 focus:ring-red-500"
            >
              {reportReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what occurred during the exchange or communication..."
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={alsoBlock}
                onChange={(e) => setAlsoBlock(e.target.checked)}
                className="mt-0.5 rounded border-stone-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-xs text-stone-700">
                <strong>Block {targetStudent.name}</strong> from viewing my profile or sending me future swap proposals.
              </span>
            </label>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <UserX className="w-4 h-4" />
              <span>Submit Report & Restrict</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
