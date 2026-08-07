import React, { Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { PageTransition } from "../components/animations/MotionWrappers";
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";

// ScannerPage and LandingPage rely on direct loads, so keep them statically imported
import { ScannerHero } from "../features/scanner/ScannerHero";
import { ScannerWorkspace } from "../features/scanner/ScannerWorkspace";
import { ScanResultsDashboard } from "../features/scanner/ScanResultsDashboard";
import { RecentScanPreview } from "../features/scanner/RecentScanPreview";
import LandingPage from "../features/landing/LandingPage";

// Lazy load views for Code Splitting & Performance
const LoginView = React.lazy(() =>
  import("../features/auth/LoginView").then((m) => ({ default: m.LoginView })),
);
const RegisterView = React.lazy(() =>
  import("../features/auth/RegisterView").then((m) => ({
    default: m.RegisterView,
  })),
);
const DashboardView = React.lazy(() =>
  import("../features/dashboard/DashboardView").then((m) => ({
    default: m.DashboardView,
  })),
);
const HistoryView = React.lazy(() =>
  import("../features/history/HistoryView").then((m) => ({
    default: m.HistoryView,
  })),
);
const ReportView = React.lazy(() =>
  import("../features/report/ReportView").then((m) => ({
    default: m.ReportView,
  })),
);
const ProfileView = React.lazy(() =>
  import("../features/profile/ProfileView").then((m) => ({
    default: m.ProfileView,
  })),
);
const KnowledgeCenterView = React.lazy(() =>
  import("../features/knowledge/KnowledgeCenterView").then((m) => ({
    default: m.KnowledgeCenterView,
  })),
);
const ArticleView = React.lazy(() =>
  import("../features/knowledge/ArticleView").then((m) => ({
    default: m.ArticleView,
  })),
);
const LearningCenterView = React.lazy(() =>
  import("../features/learning/LearningCenterView").then((m) => ({
    default: m.LearningCenterView,
  })),
);
const CourseView = React.lazy(() =>
  import("../features/learning/CourseView").then((m) => ({
    default: m.CourseView,
  })),
);
const EmergencyView = React.lazy(() =>
  import("../features/emergency/EmergencyView").then((m) => ({
    default: m.EmergencyView,
  })),
);
const SupportView = React.lazy(() =>
  import("../features/support/SupportView").then((m) => ({
    default: m.SupportView,
  })),
);
const MultiModalView = React.lazy(() =>
  import("../features/multimodal/MultiModalView").then((m) => ({
    default: m.MultiModalView,
  })),
);
const InvestigationView = React.lazy(() =>
  import("../features/investigation/InvestigationView").then((m) => ({
    default: m.InvestigationView,
  })),
);
const EmailVerificationView = React.lazy(() =>
  import("../features/auth/EmailVerificationView").then((m) => ({
    default: m.EmailVerificationView,
  })),
);
const OTPVerificationView = React.lazy(() =>
  import("../features/auth/OTPVerificationView").then((m) => ({
    default: m.OTPVerificationView,
  })),
);
const ForgotPasswordView = React.lazy(() =>
  import("../features/auth/ForgotPasswordView").then((m) => ({
    default: m.ForgotPasswordView,
  })),
);
const ResetPasswordView = React.lazy(() =>
  import("../features/auth/ResetPasswordView").then((m) => ({
    default: m.ResetPasswordView,
  })),
);
const AuthSuccessView = React.lazy(() =>
  import("../features/auth/AuthSuccessView").then((m) => ({
    default: m.AuthSuccessView,
  })),
);
const AuthErrorView = React.lazy(() =>
  import("../features/auth/AuthErrorView").then((m) => ({
    default: m.AuthErrorView,
  })),
);
const TermsView = React.lazy(() =>
  import("../features/legal/TermsView").then((m) => ({ default: m.TermsView })),
);
const PrivacyPolicyView = React.lazy(() =>
  import("../features/legal/PrivacyPolicyView").then((m) => ({
    default: m.PrivacyPolicyView,
  })),
);
const PresentationView = React.lazy(() =>
  import("../features/presentation/PresentationView").then((m) => ({
    default: m.PresentationView,
  })),
);

import { ProtectedRoute } from "../guards/ProtectedRoute";

// Lazy Load System Views
const NotFoundView = React.lazy(() =>
  import("../features/system/SystemViews").then((m) => ({
    default: m.NotFoundView,
  })),
);
const ServerErrorView = React.lazy(() =>
  import("../features/system/SystemViews").then((m) => ({
    default: m.ServerErrorView,
  })),
);
const MaintenanceView = React.lazy(() =>
  import("../features/system/SystemViews").then((m) => ({
    default: m.MaintenanceView,
  })),
);
const OfflineView = React.lazy(() =>
  import("../features/system/SystemViews").then((m) => ({
    default: m.OfflineView,
  })),
);
const AccessDeniedView = React.lazy(() =>
  import("../features/system/SystemViews").then((m) => ({
    default: m.AccessDeniedView,
  })),
);

import { useScanner } from "../hooks/useScanner";
import { RecentScansSidebar } from "../components/common/RecentScansSidebar";

const ScannerPage: React.FC = () => {
  
  const location = useLocation();
  const {
    currentTab,
    setCurrentTab,
    inputContent,
    setInputContent,
    isScanning,
    scanStageIndex,
    scanStages,
    scanResult,
    runScan,
    loadRecentScan,
    resetScanner,
  } = useScanner();

  React.useEffect(() => {
    if (location.state && (location.state as any).tab) {
      setCurrentTab((location.state as any).tab);
    }
  }, [location.state, setCurrentTab]);

  const navigate = useNavigate();

  const scrollToWorkspace = () => {
    const el = document.getElementById("workspace");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-10">
      <ScannerHero onQuickScanClick={scrollToWorkspace} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <ScannerWorkspace
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            inputContent={inputContent}
            setInputContent={setInputContent}
            isScanning={isScanning}
            scanStageIndex={scanStageIndex}
            scanStages={scanStages}
            onScanSubmit={() => runScan()}
          />
        </div>
        <div className="lg:col-span-5">
          <RecentScansSidebar onSelectScan={(scan) => loadRecentScan(scan)} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {scanResult ? (
          <motion.div
            key="scan-results"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <ScanResultsDashboard
              result={scanResult}
              onReset={resetScanner}
              onReportClick={() => navigate("/report")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="recent-preview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}>
            <RecentScanPreview
              onSelectScan={(scan) => loadRecentScan(scan)}
              onViewAll={() => navigate("/history")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// A simple inline fallback for Suspense boundaries
const PageFallback = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 rounded-full border-2 border-[#00daf3] border-t-transparent animate-spin" />
  </div>
);

export const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <motion.div key={location.pathname}>
          <Routes location={location}>
            {/* Public Main App Layout */}
            <Route
              element={
                <PageTransition>
                  <MainLayout />
                </PageTransition>
              }>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/multimodal"
                element={
                  <ProtectedRoute>
                    <MultiModalView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/investigation"
                element={
                  <ProtectedRoute>
                    <InvestigationView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scanner"
                element={
                  <ProtectedRoute>
                    <ScannerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <HistoryView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <ProtectedRoute>
                    <ReportView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/presentation"
                element={
                  <ProtectedRoute>
                    <PresentationView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileView />
                  </ProtectedRoute>
                }
              />
              <Route path="/knowledge" element={<KnowledgeCenterView />} />
              <Route path="/knowledge/:id" element={<ArticleView />} />
              <Route path="/learning" element={<LearningCenterView />} />
              <Route path="/learning/:id" element={<CourseView />} />
              <Route path="/emergency" element={<EmergencyView />} />
              <Route path="/support" element={<SupportView />} />
              <Route path="/terms" element={<TermsView />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyView />} />

              {/* System & Error Routes */}
              <Route path="/500" element={<ServerErrorView />} />
              <Route path="/maintenance" element={<MaintenanceView />} />
              <Route path="/offline" element={<OfflineView />} />
              <Route path="/403" element={<AccessDeniedView />} />
              <Route path="*" element={<NotFoundView />} />
            </Route>

            {/* Standalone Command Center Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <DashboardView />
                  </PageTransition>
                </ProtectedRoute>
              }
            />

            {/* Auth Layout */}
            <Route
              element={
                <PageTransition>
                  <AuthLayout />
                </PageTransition>
              }>
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/signup" element={<RegisterView />} />
              <Route
                path="/email-verification"
                element={<EmailVerificationView />}
              />
              <Route path="/verify-email" element={<EmailVerificationView />} />
              <Route
                path="/otp-verification"
                element={<OTPVerificationView />}
              />
              <Route path="/forgot-password" element={<ForgotPasswordView />} />
              <Route path="/reset-password" element={<ResetPasswordView />} />
              <Route path="/auth-success" element={<AuthSuccessView />} />
              <Route path="/auth-error" element={<AuthErrorView />} />
            </Route>
          </Routes>
        </motion.div>
      </Suspense>
    </AnimatePresence>
  );
};
