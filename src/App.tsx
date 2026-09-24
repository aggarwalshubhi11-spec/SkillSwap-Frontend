/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ExplorePage } from './components/ExplorePage';
import { MatchingPage } from './components/MatchingPage';
import { ProfilePage } from './components/ProfilePage';
import { RequestsPage } from './components/RequestsPage';
import { WalletPage } from './components/WalletPage';
import { SafetyPage } from './components/SafetyPage';
import { SwapModal } from './components/SwapModal';
import { ReportModal } from './components/ReportModal';
import { Toast } from './components/Toast';

import { 
  CURRENT_USER, 
  SAMPLE_STUDENTS, 
  INITIAL_REQUESTS, 
  INITIAL_TRANSACTIONS 
} from './data/mockData';

import { 
  StudentProfile, 
  ExchangeRequest, 
  WalletTransaction, 
  SafetyReport, 
  MatchRecommendation 
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [currentUser, setCurrentUser] = useState<StudentProfile>(CURRENT_USER);
  const [students, setStudents] = useState<StudentProfile[]>(SAMPLE_STUDENTS);
  const [walletBalance, setWalletBalance] = useState<number>(120);
  const [requests, setRequests] = useState<ExchangeRequest[]>(INITIAL_REQUESTS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Safety & Block state
  const [safetyReports, setSafetyReports] = useState<SafetyReport[]>([
    {
      id: 'rep_01',
      reportedUserId: 'user_fake_demo',
      reportedUserName: 'Jordan Blake',
      reason: 'Repeated No-Show',
      details: 'Missed scheduled library study session twice without notice.',
      timestamp: 'Sep 18, 2026',
      status: 'Resolved'
    }
  ]);

  const [blockedUsers, setBlockedUsers] = useState<{ id: string; name: string; date: string }[]>([
    { id: 'user_fake_demo', name: 'Jordan Blake', date: 'Sep 18, 2026' }
  ]);

  // Modal states
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [swapTargetStudent, setSwapTargetStudent] = useState<StudentProfile | null>(null);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTargetStudent, setReportTargetStudent] = useState<StudentProfile | null>(null);

  // Active unblocked student list
  const activeStudents = useMemo(() => {
    const blockedIds = new Set(blockedUsers.map((b) => b.id));
    return students.filter((s) => !blockedIds.has(s.id));
  }, [students, blockedUsers]);

  // Dynamic Matching Engine
  const recommendations: MatchRecommendation[] = useMemo(() => {
    return activeStudents.map((student) => {
      // Find skills student offers that current user wants
      const userWants = currentUser.skillsWanted.map((s) => s.name.toLowerCase());
      const teachesYouWant = student.skillsOffered
        .filter((so) => userWants.some((w) => so.name.toLowerCase().includes(w) || w.includes(so.name.toLowerCase())))
        .map((s) => s.name);

      // Find skills user offers that student wants
      const studentWants = student.skillsWanted.map((s) => s.name.toLowerCase());
      const wantsYouTeach = currentUser.skillsOffered
        .filter((uo) => studentWants.some((w) => uo.name.toLowerCase().includes(w) || w.includes(uo.name.toLowerCase())))
        .map((s) => s.name);

      const isDirectReciprocal = teachesYouWant.length > 0 && wantsYouTeach.length > 0;

      const matchingReasons: string[] = [];
      let score = 70;

      if (isDirectReciprocal) {
        score = 98;
        matchingReasons.push(
          `Direct Reciprocal Barter: ${student.name.split(' ')[0]} teaches ${teachesYouWant[0]} and wants your ${wantsYouTeach[0]} skill!`
        );
      } else if (teachesYouWant.length > 0) {
        score = 88;
        matchingReasons.push(
          `Teaches ${teachesYouWant[0]}, which is currently on your learning wishlist.`
        );
      } else if (wantsYouTeach.length > 0) {
        score = 82;
        matchingReasons.push(
          `Eager to learn ${wantsYouTeach[0]} from you using non-monetary SkillPoints.`
        );
      } else {
        score = 75;
        matchingReasons.push(
          `High campus rating (${student.rating}★) and active weekly availability.`
        );
      }

      // Check campus spot alignment
      const commonSpot = student.campusSpots.find((sp) => currentUser.campusSpots.includes(sp));
      if (commonSpot) {
        matchingReasons.push(`Shares preferred campus study spot: ${commonSpot}`);
        score = Math.min(100, score + 4);
      }

      // Check learning mode alignment
      if (student.learningMode === currentUser.learningMode || student.learningMode === 'Hybrid' || currentUser.learningMode === 'Hybrid') {
        matchingReasons.push(`Compatible learning mode (${student.learningMode})`);
      }

      return {
        student,
        matchType: (isDirectReciprocal ? 'direct_reciprocal' : 'complementary') as 'direct_reciprocal' | 'complementary',
        compatibilityScore: score,
        matchingReasons,
        teachesYouWant: teachesYouWant.length > 0 ? teachesYouWant : [student.skillsOffered[0]?.name || 'Skills'],
        wantsYouTeach
      };
    }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }, [activeStudents, currentUser]);

  const pendingRequestsCount = useMemo(() => {
    return requests.filter((r) => r.receiverId === currentUser.id && r.status === 'pending').length;
  }, [requests, currentUser.id]);

  // Handlers
  const handleOpenSwapModal = (student?: StudentProfile) => {
    setSwapTargetStudent(student || null);
    setIsSwapModalOpen(true);
  };

  const handleOpenReportModal = (student: StudentProfile) => {
    setReportTargetStudent(student);
    setIsReportModalOpen(true);
  };

  const handleSubmitSwapRequest = (
    newReqData: Omit<ExchangeRequest, 'id' | 'createdAt' | 'status'>
  ) => {
    const newRequest: ExchangeRequest = {
      ...newReqData,
      id: `req_${Date.now()}`,
      createdAt: 'Just now',
      status: 'pending'
    };

    setRequests((prev) => [newRequest, ...prev]);

    // If using points, deduct from wallet
    if (newReqData.pointsCost > 0) {
      setWalletBalance((prev) => Math.max(0, prev - newReqData.pointsCost));
      const newTx: WalletTransaction = {
        id: `tx_${Date.now()}`,
        title: `Reserved SkillSwap: ${newReqData.skillRequested}`,
        description: `1-hour session proposal sent to ${newReqData.receiverName}`,
        amount: -newReqData.pointsCost,
        type: 'spent_learning',
        timestamp: 'Just now',
        peerName: newReqData.receiverName,
        skillName: newReqData.skillRequested
      };
      setTransactions((prev) => [newTx, ...prev]);
      setToastMessage(`Swap proposal sent to ${newReqData.receiverName}! 10 points held in escrow.`);
    } else {
      setToastMessage(`Direct barter swap proposal sent to ${newReqData.receiverName}!`);
    }

    setActiveTab('requests');
  };

  const handleAcceptRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'accepted' } : r))
    );
    setToastMessage('Swap accepted! Scheduled on your campus calendar.');
  };

  const handleDeclineRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'declined' } : r))
    );
    setToastMessage('Proposal declined.');
  };

  const handleCompleteSession = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'completed' } : r))
    );

    // Add 10 points to teacher's wallet
    setWalletBalance((prev) => prev + 10);
    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      title: 'Completed SkillSwap Session',
      description: 'Peer teaching verified by both students',
      amount: 10,
      type: 'earned_teaching',
      timestamp: 'Just now'
    };
    setTransactions((prev) => [newTx, ...prev]);
    setToastMessage('Session completed! +10 SkillPoints deposited into your credit wallet.');
  };

  const handleCancelRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    setToastMessage('Proposal withdrawn.');
  };

  const handleReportSubmit = (reportData: {
    reportedUserId: string;
    reportedUserName: string;
    reason: string;
    details: string;
    blockUser: boolean;
  }) => {
    const newRep: SafetyReport = {
      id: `rep_${Date.now()}`,
      reportedUserId: reportData.reportedUserId,
      reportedUserName: reportData.reportedUserName,
      reason: reportData.reason,
      details: reportData.details,
      timestamp: 'Today at 7:15 AM',
      status: 'Under Review'
    };
    setSafetyReports((prev) => [newRep, ...prev]);

    if (reportData.blockUser) {
      setBlockedUsers((prev) => [
        ...prev,
        {
          id: reportData.reportedUserId,
          name: reportData.reportedUserName,
          date: 'Just now'
        }
      ]);
      setToastMessage(`Report filed and ${reportData.reportedUserName} blocked.`);
    } else {
      setToastMessage(`Safety report filed against ${reportData.reportedUserName}.`);
    }
  };

  const handleUnblockUser = (userId: string) => {
    setBlockedUsers((prev) => prev.filter((b) => b.id !== userId));
    setToastMessage('Student unblocked.');
  };

  const handleAddPoints = (
    amount: number,
    title: string,
    desc: string,
    type: 'campus_grant' | 'bonus' | 'earned_teaching'
  ) => {
    setWalletBalance((prev) => prev + amount);
    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      title,
      description: desc,
      amount,
      type,
      timestamp: 'Just now'
    };
    setTransactions((prev) => [newTx, ...prev]);
    setToastMessage(`+${amount} SkillPoints added to your wallet!`);
  };

  const handleUpdateProfile = (updated: StudentProfile) => {
    setCurrentUser(updated);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        walletBalance={walletBalance}
        pendingRequestsCount={pendingRequestsCount}
        onOpenSwapModal={() => handleOpenSwapModal()}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenSwapModal={() => handleOpenSwapModal()}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            currentUser={currentUser}
            walletBalance={walletBalance}
            requests={requests}
            recommendedMatches={recommendations}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenSwapModal={(student) => handleOpenSwapModal(student)}
            onAcceptRequest={handleAcceptRequest}
            onCompleteSession={handleCompleteSession}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            students={activeStudents}
            onSelectStudentForSwap={(student) => handleOpenSwapModal(student)}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

        {activeTab === 'matches' && (
          <MatchingPage
            currentUser={currentUser}
            recommendations={recommendations}
            onSelectStudentForSwap={(student) => handleOpenSwapModal(student)}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

        {activeTab === 'requests' && (
          <RequestsPage
            currentUser={currentUser}
            requests={requests}
            onAcceptRequest={handleAcceptRequest}
            onDeclineRequest={handleDeclineRequest}
            onCompleteSession={handleCompleteSession}
            onCancelRequest={handleCancelRequest}
            onOpenSwapModal={() => handleOpenSwapModal()}
          />
        )}

        {activeTab === 'wallet' && (
          <WalletPage
            walletBalance={walletBalance}
            transactions={transactions}
            onAddPoints={handleAddPoints}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyPage
            reports={safetyReports}
            blockedUsers={blockedUsers}
            onUnblockUser={handleUnblockUser}
            students={activeStudents}
            onOpenReportForStudent={handleOpenReportModal}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
            showToast={(msg) => setToastMessage(msg)}
          />
        )}
      </main>

      {/* Footer with Anti-slop restraint */}
      <footer className="border-t border-stone-200 bg-white py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-stone-900 text-sm">SkillSwap</span>
            <span aria-hidden="true">·</span>
            <span>College Hackathon Prototype</span>
            <span aria-hidden="true">·</span>
            <span>Non-Monetary Peer Exchange</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Synthetic Sample Data</span>
            <span aria-hidden="true">·</span>
            <span>Academic Time-Banking Model</span>
          </div>
        </div>
      </footer>

      {/* Propose Swap Modal */}
      <SwapModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        currentUser={currentUser}
        students={activeStudents}
        preselectedStudent={swapTargetStudent}
        walletBalance={walletBalance}
        onSubmitRequest={handleSubmitSwapRequest}
      />

      {/* Safety Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetStudent={reportTargetStudent}
        onSubmitReport={handleReportSubmit}
      />

      {/* Global Interactive Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
