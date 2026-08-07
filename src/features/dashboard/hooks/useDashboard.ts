import { useState, useEffect, useCallback, useRef } from 'react';
import { ScanResult, ScamReport, DashboardStats } from '../../../types';
import {
  dashboardService,
  DashboardSummary,
  ThreatAnalyticsData,
  DashboardNotification,
} from '../services/dashboardService';

// Module-level shared cache & promise for dashboard hook
let globalDashboardData: {
  stats: DashboardStats | null;
  summary: DashboardSummary | null;
  recentScans: ScanResult[];
  analytics: ThreatAnalyticsData | null;
  reports: ScamReport[];
  notifications: DashboardNotification[];
  lastFetched: number;
} | null = null;

let globalFetchPromise: Promise<any> | null = null;
const CACHE_TTL_MS = 10000; // 10s TTL for sharing across components

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(globalDashboardData?.stats || null);
  const [summary, setSummary] = useState<DashboardSummary | null>(globalDashboardData?.summary || null);
  const [recentScans, setRecentScans] = useState<ScanResult[]>(globalDashboardData?.recentScans || []);
  const [analytics, setAnalytics] = useState<ThreatAnalyticsData | null>(globalDashboardData?.analytics || null);
  const [reports, setReports] = useState<ScamReport[]>(globalDashboardData?.reports || []);
  const [notifications, setNotifications] = useState<DashboardNotification[]>(globalDashboardData?.notifications || []);
  const [isLoading, setIsLoading] = useState<boolean>(!globalDashboardData);
  const [error, setError] = useState<string | null>(null);

  const isMounted = useRef(true);

  const fetchAllData = useCallback(async (force = false) => {
    // If cached within TTL and not forcing refresh, use cache
    if (!force && globalDashboardData && Date.now() - globalDashboardData.lastFetched < CACHE_TTL_MS) {
      setStats(globalDashboardData.stats);
      setSummary(globalDashboardData.summary);
      setRecentScans(globalDashboardData.recentScans);
      setAnalytics(globalDashboardData.analytics);
      setReports(globalDashboardData.reports);
      setNotifications(globalDashboardData.notifications);
      setIsLoading(false);
      return;
    }

    // Reuse existing in-flight promise if one exists
    if (!globalFetchPromise) {
      setIsLoading(true);
      setError(null);
      globalFetchPromise = (async () => {
        const [statsData, summaryData, scansData, analyticsData, reportsData, notifData] =
          await Promise.all([
            dashboardService.getDashboardData(),
            dashboardService.getDashboardSummary(),
            dashboardService.getRecentScans(),
            dashboardService.getThreatAnalytics(),
            dashboardService.getRecentReports(),
            dashboardService.getNotifications(),
          ]);

        globalDashboardData = {
          stats: statsData && typeof statsData === 'object' ? statsData : null,
          summary: summaryData && typeof summaryData === 'object' ? summaryData : null,
          recentScans: Array.isArray(scansData) ? scansData : [],
          analytics: analyticsData && typeof analyticsData === 'object' ? analyticsData : null,
          reports: Array.isArray(reportsData) ? reportsData : [],
          notifications: Array.isArray(notifData) ? notifData : [],
          lastFetched: Date.now(),
        };
        return globalDashboardData;
      })().finally(() => {
        globalFetchPromise = null;
      });
    }

    try {
      const data = await globalFetchPromise;
      if (isMounted.current && data) {
        setStats(data.stats);
        setSummary(data.summary);
        setRecentScans(data.recentScans);
        setAnalytics(data.analytics);
        setReports(data.reports);
        setNotifications(data.notifications);
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err?.message || 'Failed to fetch dashboard intelligence.');
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchAllData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchAllData]);

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    if (globalDashboardData) {
      globalDashboardData.notifications = globalDashboardData.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (globalDashboardData) {
      globalDashboardData.notifications = globalDashboardData.notifications.map((n) => ({ ...n, read: true }));
    }
  };

  return {
    stats,
    summary,
    recentScans,
    analytics,
    reports,
    notifications,
    isLoading,
    error,
    refreshData: () => fetchAllData(true),
    markNotificationRead,
    markAllNotificationsRead,
  };
}
