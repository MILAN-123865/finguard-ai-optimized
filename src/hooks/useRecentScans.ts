import { useState, useEffect, useCallback } from 'react';
import { ScanResult } from '../types';
import { recentScansService } from '../services/recentScansService';

export function useRecentScans() {
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);

  const refreshScans = useCallback(() => {
    const scans = recentScansService.getRecentScans();
    setRecentScans(scans);
  }, []);

  useEffect(() => {
    refreshScans();

    const handleUpdate = () => {
      refreshScans();
    };

    window.addEventListener('aegis_recent_scans_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('aegis_recent_scans_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refreshScans]);

  const addScan = useCallback((scan: ScanResult) => {
    const updated = recentScansService.addRecentScan(scan);
    setRecentScans(updated);
  }, []);

  const removeScan = useCallback((id: string) => {
    const updated = recentScansService.removeRecentScan(id);
    setRecentScans(updated);
  }, []);

  const clearScans = useCallback(() => {
    recentScansService.clearRecentScans();
    setRecentScans([]);
  }, []);

  return {
    recentScans,
    addScan,
    removeScan,
    clearScans,
    refreshScans,
  };
}
