import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Compass, 
  ArrowLeftRight, 
  Coins, 
  ShieldCheck, 
  User, 
  Menu, 
  X,
  Bell,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  walletBalance: number;
  pendingRequestsCount: number;
  onOpenSwapModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  walletBalance,
  pendingRequestsCount,
  onOpenSwapModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Overview' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'explore', label: 'Explore Skills' },
    { id: 'matches', label: 'Smart Matches' },
    { 
      id: 'requests', 
      label: 'Requests', 
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined 
    },
    { id: 'wallet', label: 'Credit Wallet' },
    { id: 'safety', label: 'Safety & Trust' },
    { id: 'profile', label: 'My Profile' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Prototype & Hackathon Notice Ribbon */}
      <div className="bg-stone-900 text-stone-200 text-xs px-4 py-1.5 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] shrink-0">Hackathon Prototype</span>
          <span className="text-stone-400 hidden sm:inline">·</span>
          <span className="text-stone-300 truncate">Peer-to-peer student skill bartering without real money</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-stone-400 text-[11px] shrink-0">
          <span>Non-monetary Time Banking</span>
          <span>·</span>
          <span>Campus Safety Monitored</span>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav links) — Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark with collegiate graduation motif */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabClick('landing')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-xl text-stone-950 tracking-tight">
                SkillSwap
              </span>
            </button>
          </div>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative text-sm font-medium transition-colors py-2 whitespace-nowrap ${
                    isActive 
                      ? 'text-stone-950 font-semibold' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-white">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-950 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions (Wallet Points & Propose Swap) */}
          <div className="flex items-center gap-3">
            {/* Wallet Quick Balance Button */}
            <button
              onClick={() => handleTabClick('wallet')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors text-xs font-medium text-stone-800"
              title="View your learning points wallet"
            >
              <Coins className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-mono tabular-nums font-bold text-stone-900">{walletBalance}</span>
              <span className="text-stone-500 hidden sm:inline">pts</span>
            </button>

            {/* Quick Action Button */}
            <button
              onClick={onOpenSwapModal}
              className="px-3.5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Propose Swap</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="px-2 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
            Navigation Menu
          </div>
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-white">
                    {item.badge} pending
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
