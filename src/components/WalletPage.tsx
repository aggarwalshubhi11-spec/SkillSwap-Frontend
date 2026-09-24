import React, { useState } from 'react';
import { 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { WalletTransaction } from '../types';

interface WalletPageProps {
  walletBalance: number;
  transactions: WalletTransaction[];
  onAddPoints: (amount: number, title: string, desc: string, type: 'campus_grant' | 'bonus' | 'earned_teaching') => void;
}

export const WalletPage: React.FC<WalletPageProps> = ({
  walletBalance,
  transactions,
  onAddPoints
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [claimedBonus, setClaimedBonus] = useState(false);

  const handleClaimBonus = () => {
    if (claimedBonus) return;
    onAddPoints(15, 'Campus Study Streak Check-In', 'Daily active peer student learning incentive', 'bonus');
    setClaimedBonus(true);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === 'earned') return tx.amount > 0;
    if (filterType === 'spent') return tx.amount < 0;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wide uppercase mb-1">
          <Coins className="w-3.5 h-3.5" />
          <span>Non-Monetary Credit System</span>
          <span aria-hidden="true">·</span>
          <span>Educational Time Banking</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-950">Learning Points Wallet</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-1">
          SkillSwap operates on an egalitarian educational credit ledger. Real money is never exchanged—learning 
          credits represent hours dedicated to peer teaching.
        </p>
      </div>

      {/* Balance Hero Card */}
      <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Available Credit Balance</span>
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-display font-black text-4xl sm:text-6xl text-white font-mono tabular-nums">
                {walletBalance}
              </span>
              <span className="text-stone-400 font-medium text-lg">SkillPoints</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed">
              Equivalent to <strong className="text-white">{Math.floor(walletBalance / 10)} hours</strong> of 1-on-1 tutoring from any student on campus, or direct reciprocal skill barter (0 points cost).
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col items-start md:items-end justify-center space-y-3">
            {/* Interactive Demo simulation button */}
            <button
              onClick={handleClaimBonus}
              disabled={claimedBonus}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 ${
                claimedBonus
                  ? 'bg-stone-800 text-stone-400 cursor-not-allowed border border-stone-700'
                  : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{claimedBonus ? 'Daily Check-In Claimed (+15 pts)' : 'Claim Daily Study Bonus (+15 pts)'}</span>
            </button>

            <button
              onClick={() => onAddPoints(10, 'Taught 1-hr Calculus Help', 'Peer tutoring session with freshman engineering student', 'earned_teaching')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
            >
              Simulate 1-hr Tutoring (+10 pts)
            </button>
          </div>
        </div>

        {/* Anti-Monetization Policy Notice */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-2 text-xs text-stone-400">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Zero Real-Currency Value:</strong> SkillPoints cannot be purchased, sold, converted to fiat money, or used for third-party commerce.
          </span>
        </div>
      </div>

      {/* Time-Banking Rules Explained in 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">Teach to Earn</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every 1 hour you spend mentoring a peer in Python, Figma, or Spanish credits <strong>+10 SkillPoints</strong> to your balance.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">Learn Without Barter</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            When you want to learn from someone who doesn&apos;t need your skill right now, spend <strong>10 points/hr</strong> to book their time fairly.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <Gift className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">Reciprocal Barter = 0 Pts</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Direct 1:1 exchanges (e.g. Python for Canva) cost <strong>0 points</strong> because both students exchange equal knowledge simultaneously!
          </p>
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-base font-bold text-stone-900">Points Activity Ledger</h2>
            <p className="text-xs text-stone-500">Transparent record of peer teaching and learning hours</p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 text-xs">
            {['all', 'earned', 'spent'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg font-medium capitalize transition-colors ${
                  filterType === type
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Rows (Tabular numerals applied) */}
        <div className="divide-y divide-stone-100">
          {filteredTransactions.map((tx) => {
            const isPositive = tx.amount > 0;
            return (
              <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                  </div>

                  <div className="space-y-0.5">
                    <span className="font-semibold text-stone-950 block text-xs">{tx.title}</span>
                    <p className="text-[11px] text-stone-500">{tx.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400">
                      <span>{tx.timestamp}</span>
                      {tx.peerName && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Peer: {tx.peerName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`font-mono font-bold text-sm tabular-nums ${
                    isPositive ? 'text-emerald-700' : 'text-stone-700'
                  }`}>
                    {isPositive ? `+${tx.amount}` : tx.amount} pts
                  </span>
                  <span className="block text-[10px] text-stone-400 capitalize">
                    {tx.type.replace('_', ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
