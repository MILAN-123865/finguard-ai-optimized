import { useState, useEffect } from 'react';
import { ScanResult, ScanType } from '../types';
import { historyService } from '../services/historyService';

export function useHistory() {
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [filterType, setFilterType] = useState<ScanType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchHistory() {
      setIsLoading(true);
      try {
        const data = await historyService.getScanHistory();
        setHistory(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch =
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.sender && item.sender.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const deleteItem = async (id: string) => {
    await historyService.deleteScanItem(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));
    if (selectedScan?.id === id) {
      setSelectedScan(null);
    }
  };

  return {
    history: filteredHistory,
    totalCount: history.length,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    selectedScan,
    setSelectedScan,
    deleteItem,
    isLoading,
  };
}
