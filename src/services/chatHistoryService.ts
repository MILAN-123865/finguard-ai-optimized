import { apiClient, dedupedGet } from '../config/api';

export interface AttachmentData {
  id: string;
  name: string;
  size: number;
  typeCategory: 'image' | 'pdf' | 'doc' | 'text' | 'unknown';
  mimeType: string;
  url: string;
  previewUrl?: string;
}

export interface ChatHistoryItem {
  id: string; // chatId
  userId: string;
  title: string;
  userMessage: {
    id: string;
    text: string;
    timestamp: string;
    attachment?: AttachmentData;
  };
  aiResponse: {
    id: string;
    text: string;
    timestamp: string;
    isError?: boolean;
  };
  timestamp: string; // ISO string
}

const LOCAL_STORAGE_PREFIX = 'finguard_chat_history_';

const getLocalStorageHistory = (userId: string): ChatHistoryItem[] => {
  try {
    const data = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${userId}`);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to parse chat history from localStorage:', err);
  }
  return [];
};

const saveLocalStorageHistory = (userId: string, items: ChatHistoryItem[]): void => {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${userId}`, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save chat history to localStorage:', err);
  }
};

export const chatHistoryService = {
  async getChatHistory(userId: string): Promise<ChatHistoryItem[]> {
    const localItems = getLocalStorageHistory(userId);
    try {
      const response = await dedupedGet('/chat/history', {
        params: { userId },
        timeout: 5000,
      });
      const data = response.data as any;
      if (data && data.success && Array.isArray(data.history)) {
        const serverItems: ChatHistoryItem[] = data.history;
        // Merge server items and local items to prevent duplicates
        const map = new Map<string, ChatHistoryItem>();
        [...serverItems, ...localItems].forEach(item => {
          if (item && item.id) {
            map.set(item.id, item);
          }
        });
        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        saveLocalStorageHistory(userId, merged);
        return merged;
      }
    } catch (err) {
      console.warn('Backend chat history endpoint unavailable, using local history fallback:', err);
    }
    return localItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  async saveChatHistoryItem(item: ChatHistoryItem): Promise<boolean> {
    // 1. Update localStorage immediately for instantaneous persistence
    const localItems = getLocalStorageHistory(item.userId);
    const existingIndex = localItems.findIndex(i => i.id === item.id);
    if (existingIndex >= 0) {
      localItems[existingIndex] = item;
    } else {
      localItems.unshift(item);
    }
    saveLocalStorageHistory(item.userId, localItems);

    // 2. Persist to Backend API
    try {
      await apiClient.post('/chat/save', item, { timeout: 5000 });
      return true;
    } catch (err) {
      console.warn('Failed to save chat item to backend server, saved locally:', err);
      return true;
    }
  },

  async deleteChatHistory(userId: string): Promise<boolean> {
    saveLocalStorageHistory(userId, []);
    try {
      await apiClient.delete('/chat/history', {
        params: { userId },
        timeout: 5000,
      });
      return true;
    } catch (err) {
      console.warn('Failed to delete chat history on server:', err);
      return true;
    }
  },

  async deleteChatHistoryItem(userId: string, chatId: string): Promise<boolean> {
    const localItems = getLocalStorageHistory(userId).filter(item => item.id !== chatId);
    saveLocalStorageHistory(userId, localItems);
    try {
      await apiClient.delete(`/chat/history/${chatId}`, {
        params: { userId },
        timeout: 5000,
      });
      return true;
    } catch (err) {
      console.warn('Failed to delete chat item on server:', err);
      return true;
    }
  },

  async renameChatHistoryItem(userId: string, chatId: string, newTitle: string): Promise<boolean> {
    const localItems = getLocalStorageHistory(userId);
    const item = localItems.find(i => i.id === chatId);
    if (item) {
      item.title = newTitle;
      saveLocalStorageHistory(userId, localItems);
    }
    try {
      await apiClient.patch(`/chat/history/${chatId}/rename`, { userId, newTitle }, { timeout: 5000 });
      return true;
    } catch (err) {
      console.warn('Failed to rename chat item on server:', err);
      return true;
    }
  },
};
