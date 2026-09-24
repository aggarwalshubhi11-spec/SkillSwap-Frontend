import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  ArrowLeftRight, 
  ShieldAlert, 
  CheckCircle2, 
  GraduationCap,
  Sparkles,
  X,
  BookOpen
} from 'lucide-react';
import { StudentProfile, LearningMode } from '../types';
import { SKILL_CATEGORIES } from '../data/mockData';

interface ExplorePageProps {
  students: StudentProfile[];
  onSelectStudentForSwap: (student: StudentProfile) => void;
  onOpenReportModal: (student: StudentProfile) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  students,
  onSelectStudentForSwap,
  onOpenReportModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMode, setSelectedMode] = useState<string>('All Modes');
  const [detailStudent, setDetailStudent] = useState<StudentProfile | null>(null);

  // Filter students based on query, category, and mode
  const filteredStudents = students.filter((student) => {
    // Search matching
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      query === '' ||
      student.name.toLowerCase().includes(query) ||
      student.major.toLowerCase().includes(query) ||
      student.skillsOffered.some((s) => s.name.toLowerCase().includes(query)) ||
      student.skillsWanted.some((s) => s.name.toLowerCase().includes(query)) ||
      student.campusSpots.some((spot) => spot.toLowerCase().includes(query));

    // Category matching
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      student.skillsOffered.some((s) => s.category === selectedCategory) ||
      student.skillsWanted.some((s) => s.category === selectedCategory);

    // Mode matching
    const matchesMode =
      selectedMode === 'All Modes' ||
      student.learningMode === selectedMode ||
      student.learningMode === 'Hybrid';

    return matchesQuery && matchesCategory && matchesMode;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Mission */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wide mb-1 uppercase">
            <span>Student Knowledge Directory</span>
            <span aria-hidden="true">·</span>
            <span>Non-Monetary Barter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-950">Explore Campus Skills</h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-1">
            Browse skills offered by fellow students on campus. Request a direct 1-to-1 swap or spend your earned learning points.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-mono tabular-nums">
          Showing <strong className="text-stone-900">{filteredStudents.length}</strong> active student tutors
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill (e.g. Python, Canva, Figma, Spanish), student name, or major..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs (Zero-Pill discipline: segmented button control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Mode Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Learning Mode:</span>
            {['All Modes', 'In-Person (Campus)', 'Virtual (Zoom)', 'Hybrid'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedMode === mode
                    ? 'font-bold text-amber-900 bg-amber-100'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {(searchQuery || selectedCategory !== 'All Categories' || selectedMode !== 'All Modes') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setSelectedMode('All Modes');
              }}
              className="text-stone-500 hover:text-stone-800 underline underline-offset-2"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Student Cards Grid */}
      {filteredStudents.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-stone-300 space-y-3">
          <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-900">No student profiles match your filters</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try searching for broader skills like &quot;Python&quot;, &quot;Design&quot;, &quot;Writing&quot;, or change your selected category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setSelectedMode('All Modes');
            }}
            className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Avatar, Name & Trust Indicator */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-stone-950">{student.name}</h3>
                        {student.isVerifiedStudent && (
                          <span className="w-4 h-4 text-emerald-600" title="Verified Campus Student">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        <span>{student.major}</span>
                        <span className="mx-1">·</span>
                        <span>{student.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating with tabular figures */}
                  <div className="flex items-center gap-1 text-xs text-stone-700 bg-stone-50 px-2 py-1 rounded-md border border-stone-100">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                    <span className="font-bold font-mono tabular-nums">{student.rating}</span>
                    <span className="text-[10px] text-stone-400">({student.reviewsCount})</span>
                  </div>
                </div>

                {/* Bio Snippet */}
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {student.bio}
                </p>

                {/* Skills Offered (Clean unboxed tags) */}
                <div className="space-y-1.5 pt-1 border-t border-stone-100">
                  <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                    Offers to Teach:
                  </span>
                  <div className="space-y-1">
                    {student.skillsOffered.map((sk) => (
                      <div key={sk.id} className="flex items-center justify-between text-xs">
                        <span className="text-stone-900 font-medium truncate max-w-[200px]">
                          {sk.name}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono">
                          {sk.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Wanted */}
                <div className="space-y-1 pt-1 border-t border-stone-100">
                  <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                    Wants to Learn:
                  </span>
                  <div className="text-xs text-amber-900 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                    {student.skillsWanted.map((sk) => sk.name).join(' · ')}
                  </div>
                </div>

                {/* Safe Campus Spot & Mode */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="truncate max-w-[140px]">{student.campusSpots[0] || 'Campus Library'}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{student.learningMode}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenReportModal(student)}
                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Safety report or block student"
                >
                  <ShieldAlert className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDetailStudent(student)}
                    className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => onSelectStudentForSwap(student)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Swap</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student Detail Modal */}
      {detailStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={detailStudent.avatar}
                    alt={detailStudent.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
                  />
                  <div>
                    <h3 className="font-bold text-base text-stone-950">{detailStudent.name}</h3>
                    <p className="text-xs text-stone-500">
                      {detailStudent.major} · {detailStudent.year}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-stone-600 pt-0.5">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-500 mr-1" />
                        <span className="font-bold font-mono">{detailStudent.rating}</span>
                      </div>
                      <span>({detailStudent.reviewsCount} peer reviews)</span>
                      <span>·</span>
                      <span>{detailStudent.completedSwaps} swaps completed</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setDetailStudent(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                  About Me
                </span>
                <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                  {detailStudent.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-stone-700 block mb-1">Teaching Skills</span>
                  <div className="space-y-1">
                    {detailStudent.skillsOffered.map((sk) => (
                      <div key={sk.id} className="text-stone-800">
                        • {sk.name} <span className="text-stone-400 font-mono text-[11px]">({sk.level})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-stone-700 block mb-1">Learning Interests</span>
                  <div className="space-y-1 text-amber-900">
                    {detailStudent.skillsWanted.map((sk) => (
                      <div key={sk.id}>• {sk.name}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div><strong>Availability:</strong> {detailStudent.availability}</div>
                <div><strong>Learning Mode:</strong> {detailStudent.learningMode}</div>
                <div><strong>Verified Campus Spots:</strong> {detailStudent.campusSpots.join(', ')}</div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setDetailStudent(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const st = detailStudent;
                    setDetailStudent(null);
                    onSelectStudentForSwap(st);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs"
                >
                  Propose Swap with {detailStudent.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
