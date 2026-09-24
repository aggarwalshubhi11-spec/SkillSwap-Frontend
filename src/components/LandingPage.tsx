import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Sparkles, 
  Coins, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onOpenSwapModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenSwapModal }) => {
  // Interactive mini simulation state for student demonstration
  const [demoOffer, setDemoOffer] = useState('Python Programming');
  const [demoWant, setDemoWant] = useState('Canva & Social Design');

  const popularSkills = [
    'Python', 'Canva', 'Figma', 'Conversational Spanish', 
    'Excel Modeling', 'React', 'Calculus', 'Video Editing'
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Anti-slop notice: quiet unboxed text kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wide">
                <span>CAMPUS PEER EXCHANGE</span>
                <span aria-hidden="true">·</span>
                <span>ZERO REAL MONEY</span>
                <span aria-hidden="true">·</span>
                <span>TIME-BANKING MODEL</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-stone-950 tracking-tight leading-none text-balance">
                Learn what you need by teaching what you know.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl text-pretty">
                SkillSwap connects college students for direct, 1-to-1 peer skill bartering. 
                No tuition, no expensive bootcamps, and no cash exchange—just fellow students 
                helping each other succeed on campus.
              </p>

              {/* Real World Concrete Example Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <HeartHandshake className="w-4 h-4 text-amber-600" />
                  <span>The Classic SkillSwap Match</span>
                </div>
                <p className="text-sm text-amber-950 leading-relaxed font-medium">
                  &ldquo;A student knows <strong className="text-amber-900 underline decoration-amber-400">Python</strong> and wants to learn <strong className="text-amber-900 underline decoration-amber-400">Canva</strong>. Another student knows <strong className="text-amber-900 underline decoration-amber-400">Canva</strong> and wants to learn <strong className="text-amber-900 underline decoration-amber-400">Python</strong>. SkillSwap pairs them for a 1-hour reciprocal exchange in the campus library.&rdquo;
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('matches')}
                  className="px-6 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Find Your Match</span>
                </button>
                <button
                  onClick={() => onNavigate('explore')}
                  className="px-6 py-3.5 text-sm font-semibold text-stone-700 hover:text-stone-950 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Explore 20+ Skills</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Social Proof & Trust adjacency */}
              <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-500 border-t border-stone-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Student ID Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Non-Monetary Credits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span>Campus Library Safe Zones</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Fidelity Imagery & Quick Barter Simulator */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-4/3 bg-stone-100">
                <img
                  src={HERO_IMAGE}
                  alt="Two college students collaborating over laptops and notes in a university library"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                    Campus Co-Working
                  </span>
                  <p className="text-sm font-medium text-stone-100">
                    Maya & Alex in a 1-on-1 Python & Canva exchange at Central Library.
                  </p>
                </div>
              </div>

              {/* Quick Interactive Match Simulator */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Interactive Match Simulator
                  </span>
                  <span className="text-[11px] font-mono text-stone-400 tabular-nums">Prototype Test</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-stone-500 block mb-1">I can teach:</label>
                    <input
                      type="text"
                      value={demoOffer}
                      onChange={(e) => setDemoOffer(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 font-medium text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-stone-500 block mb-1">I want to learn:</label>
                    <input
                      type="text"
                      value={demoWant}
                      onChange={(e) => setDemoWant(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 font-medium text-stone-900"
                    />
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <p className="text-xs text-stone-600">
                    Potential matches found: <strong className="text-emerald-700">3 compatible students</strong>
                  </p>
                  <button
                    onClick={() => onNavigate('matches')}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-4"
                  >
                    View Matches &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How SkillSwap Works in 3 Editorial Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            How The Ecosystem Operates
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            A sustainable academic knowledge economy
          </h2>
          <p className="text-sm text-stone-600">
            Every student has at least one skill to share. SkillSwap makes reciprocal learning simple, structured, and safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-stone-900">Publish Your Skill Profile</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              List the tools, coursework, or languages you can mentor others in, plus what you want to master this semester.
            </p>
            <div className="pt-2 text-xs text-stone-500">
              <span>Example: Python Scripting</span>
              <span className="mx-1">→</span>
              <span>Canva Templates</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-stone-900">Smart Match & Swap Request</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our matching engine highlights reciprocal peers where skills align 1:1, or you can spend non-monetary Learning Points.
            </p>
            <div className="pt-2 text-xs text-stone-500">
              <span>100% Reciprocal or 10 pts/hr</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-stone-900">Meet, Exchange & Review</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Connect at verified public campus spots or Zoom. Confirm completion to unlock learning points and peer reviews.
            </p>
            <div className="pt-2 text-xs text-stone-500">
              <span>Campus Library · Makerspaces · Zoom</span>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Wallet Teaser & Academic Ethics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 text-white overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-semibold">
                <Coins className="w-3.5 h-3.5" />
                <span>The Non-Monetary Credit Wallet</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                What if you want to learn, but haven&apos;t found a direct barter?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                SkillSwap solves the &ldquo;coincidence of wants&rdquo; problem using <strong>SkillPoints</strong>. 
                Teach anyone for 1 hour to bank 10 points. Then spend those 10 points to learn whatever you want from another student anytime.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>1 Hour Taught = +10 Points</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>1 Hour Learned = -10 Points</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>100 Starter Points Included</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <button
                onClick={() => onNavigate('wallet')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors text-center"
              >
                Inspect Credit Wallet &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Hackathon Compliance Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-stone-100 border border-stone-200 text-stone-600 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-stone-800 uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Hackathon Prototype & Safety Compliance Notice</span>
          </div>
          <p className="leading-relaxed">
            SkillSwap is an academic peer-learning prototype demonstrated for the student hackathon. 
            All user profiles and reviews displayed are synthetic sample data. 
            SkillSwap facilitates peer-to-peer mutual assistance; it does not claim certified automatic skill accreditation, 
            licensed tutoring credentials, or guaranteed employment outcomes. Always follow campus safety protocols and meet in public university facilities.
          </p>
        </div>
      </section>
    </div>
  );
};
