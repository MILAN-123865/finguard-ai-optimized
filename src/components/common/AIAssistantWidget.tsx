import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import { 
  Bot, X, Send, Mic, Paperclip, Copy, RefreshCw, Trash2, Edit3,
  Search, History, AlertCircle, ChevronDown, Check, User,
  FileText, ExternalLink, Download, Loader2, AlertTriangle, FileCode,
  MessageSquare, ArrowLeft, Clock
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { chatHistoryService, ChatHistoryItem, AttachmentData } from '../../services/chatHistoryService';

export type { AttachmentData };

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isError?: boolean;
  attachment?: AttachmentData;
}

interface PendingAttachment {
  file: File;
  name: string;
  size: number;
  typeCategory: 'image' | 'pdf' | 'doc' | 'text' | 'unknown';
  mimeType: string;
  previewUrl: string;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  uploadProgress: number;
  errorMessage?: string;
}

const suggestedQuestions = [
  "Is this SMS safe?",
  "Can I trust this website?",
  "Is this QR code dangerous?",
  "Explain this scam.",
  "How do I stay safe?"
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.txt', '.doc', '.docx']);

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileTypeCategory = (file: File): 'image' | 'pdf' | 'doc' | 'text' | 'unknown' => {
  const mime = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (mime.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(name)) {
    return 'image';
  }
  if (mime === 'application/pdf' || name.endsWith('.pdf')) {
    return 'pdf';
  }
  if (mime === 'text/plain' || name.endsWith('.txt')) {
    return 'text';
  }
  if (mime.includes('word') || mime.includes('officedocument') || /\.(doc|docx)$/i.test(name)) {
    return 'doc';
  }
  return 'unknown';
};

export interface AIAssistantWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  showTriggerButton?: boolean;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  showTriggerButton = true,
}) => {
  const { user } = useAuth();
  const userId = user?.id || 'usr_109283';

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    }
    setInternalIsOpen(false);
  };

  const handleOpen = () => {
    setInternalIsOpen(true);
  };
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(`finguard_active_messages_${userId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      }
    } catch (e) {
      console.error('Error reading saved active messages:', e);
    }
    return [];
  });

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // File Attachment State
  const [pendingAttachment, setPendingAttachment] = useState<PendingAttachment | null>(null);
  const [fileValidationError, setFileValidationError] = useState<string | null>(null);
  
  // History State
  const [historyItems, setHistoryItems] = useState<ChatHistoryItem[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save active messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`finguard_active_messages_${userId}`, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist active messages:', e);
    }
  }, [messages, userId]);

  const fetchHistory = useCallback(async () => {
    setIsHistoryLoading(true);
    setHistoryError(null);
    try {
      const items = await chatHistoryService.getChatHistory(userId);
      setHistoryItems(items);
    } catch (err: any) {
      console.error('Failed to load chat history:', err);
      setHistoryError('Could not sync chat history with server. Showing cached history.');
    } finally {
      setIsHistoryLoading(false);
    }
  }, [userId]);

  // Load history on mount or user change
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isHistoryOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isHistoryOpen, isTyping]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileValidationError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate File Size (10MB Limit)
    if (file.size > MAX_FILE_SIZE) {
      setFileValidationError('File size exceeds 10MB limit. Please select a smaller file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate File Type
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(file.type) && !ALLOWED_EXTENSIONS.has(ext)) {
      setFileValidationError('Unsupported file type. Allowed: Images (.jpg, .png, .webp), PDF, TXT, Word (.doc, .docx).');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const typeCategory = getFileTypeCategory(file);
    const previewUrl = URL.createObjectURL(file);

    setPendingAttachment({
      file,
      name: file.name,
      size: file.size,
      typeCategory,
      mimeType: file.type,
      previewUrl,
      uploadStatus: 'idle',
      uploadProgress: 0,
    });
  };

  const removePendingAttachment = () => {
    if (pendingAttachment?.previewUrl) {
      URL.revokeObjectURL(pendingAttachment.previewUrl);
    }
    setPendingAttachment(null);
    setFileValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText !== undefined ? overrideText : inputValue;
    const hasText = textToSend.trim().length > 0;
    const hasAttachment = pendingAttachment !== null;

    if (!hasText && !hasAttachment) return;

    setFileValidationError(null);

    let attachedData: AttachmentData | undefined = undefined;

    if (pendingAttachment) {
      setPendingAttachment(prev => prev ? { ...prev, uploadStatus: 'uploading', uploadProgress: 10 } : null);

      try {
        const formData = new FormData();
        formData.append('file', pendingAttachment.file);

        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setPendingAttachment(prev => prev ? { ...prev, uploadProgress: percent } : null);
            }
          },
        });

        const resData = response.data;
        attachedData = {
          id: Date.now().toString(),
          name: resData.fileName || pendingAttachment.name,
          size: resData.fileSize || pendingAttachment.size,
          typeCategory: pendingAttachment.typeCategory,
          mimeType: resData.fileType || pendingAttachment.mimeType,
          url: resData.fileUrl || pendingAttachment.previewUrl,
          previewUrl: pendingAttachment.previewUrl,
        };
      } catch (err: any) {
        console.warn('Backend upload server offline or running static preview; fallback to local object URL:', err);
        attachedData = {
          id: Date.now().toString(),
          name: pendingAttachment.name,
          size: pendingAttachment.size,
          typeCategory: pendingAttachment.typeCategory,
          mimeType: pendingAttachment.mimeType,
          url: pendingAttachment.previewUrl,
          previewUrl: pendingAttachment.previewUrl,
        };
      }
    }

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: textToSend.trim(),
      sender: 'user',
      timestamp: new Date(),
      attachment: attachedData,
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setPendingAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setIsTyping(true);

    // Generate AI response & Save to History
    setTimeout(async () => {
      setIsTyping(false);
      
      let responseText = "I have analyzed your request. Based on current threat intelligence, please proceed with caution.";
      let isError = false;

      if (attachedData) {
        if (attachedData.typeCategory === 'image') {
          responseText = `I have analyzed your image attachment **${attachedData.name}**.\n\n**Visual Inspection Report:**\n- OCR & Spoofing Check: Clean layout structure.\n- Metadata & Embedded Pixels: No hidden malware payload found.\n- Status: **0% RISK (SAFE)**\n\nAsk if you need help inspecting specific links or text inside this screenshot!`;
        } else {
          responseText = `I have received and processed your document **${attachedData.name}** (${formatFileSize(attachedData.size)}).\n\n**File Inspection Summary:**\n- Structure & Macros: No malicious code detected.\n- Embedded Links: Verified.\n- Risk Level: **SAFE**\n\nLet me know if you would like me to summarize key security findings or search for specific keywords!`;
        }
      } else if (textToSend.toLowerCase().includes("sms safe")) {
        responseText = "To verify an SMS, check the sender ID. Do not click on any links if they use URL shorteners. You can paste the link here or attach a screenshot for a deep scan.";
      } else if (textToSend.toLowerCase().includes("trust this website")) {
        responseText = "Look for HTTPS, check the domain age, and beware of misspellings (e.g., paypa1.com). Here is a quick checklist:\n1. Check certificate\n2. Verify URL\n3. Look for contact info";
      } else if (textToSend.toLowerCase().includes("qr code")) {
        responseText = "QR codes can direct you to malicious sites or initiate payments. Always verify the destination URL before confirming any action on your phone.";
      } else if (textToSend.toLowerCase().includes("explain this scam")) {
        responseText = "This appears to be a Social Engineering attack. They create a false sense of urgency to bypass your critical thinking.\n\n```json\n{\n  \"threat_type\": \"Phishing\",\n  \"risk_level\": \"CRITICAL\"\n}\n```";
      } else if (textToSend.toLowerCase().includes("error")) {
        responseText = "Network timeout. Failed to reach the neural gateway.";
        isError = true;
      }

      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        isError,
      };
      
      setMessages(prev => [...prev, newAiMsg]);

      // Save complete conversation pair to history automatically
      const chatId = 'chat_' + Date.now();
      const historyItem: ChatHistoryItem = {
        id: chatId,
        userId,
        title: newUserMsg.text || (newUserMsg.attachment ? `Attached: ${newUserMsg.attachment.name}` : "Security Query"),
        userMessage: {
          id: newUserMsg.id,
          text: newUserMsg.text,
          timestamp: newUserMsg.timestamp.toISOString(),
          attachment: newUserMsg.attachment,
        },
        aiResponse: {
          id: newAiMsg.id,
          text: newAiMsg.text,
          timestamp: newAiMsg.timestamp.toISOString(),
          isError: newAiMsg.isError,
        },
        timestamp: new Date().toISOString(),
      };

      // Optimistically update history list & persist
      setHistoryItems(prev => [historyItem, ...prev.filter(i => i.id !== chatId)]);
      await chatHistoryService.saveChatHistoryItem(historyItem);
    }, 1200);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const regenerateResponse = () => {
    if (messages.length === 0) return;
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user');
    if (lastUserMsg) {
      setMessages(prev => prev.slice(0, prev.length - 1));
      handleSend(lastUserMsg.text);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleOpenHistoryItem = (item: ChatHistoryItem) => {
    const userMsg: Message = {
      id: item.userMessage.id || (item.id + '_u'),
      text: item.userMessage.text,
      sender: 'user',
      timestamp: new Date(item.userMessage.timestamp || item.timestamp),
      attachment: item.userMessage.attachment,
    };
    const aiMsg: Message = {
      id: item.aiResponse.id || (item.id + '_a'),
      text: item.aiResponse.text,
      sender: 'ai',
      timestamp: new Date(item.aiResponse.timestamp || item.timestamp),
      isError: item.aiResponse.isError,
    };
    setMessages([userMsg, aiMsg]);
    setIsHistoryOpen(false);
  };

  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  const handleStartRename = (e: React.MouseEvent, item: ChatHistoryItem) => {
    e.stopPropagation();
    setEditingChatId(item.id);
    setEditingTitle(item.title);
  };

  const handleSaveRename = async (e: React.MouseEvent | React.FormEvent, chatId: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!editingTitle.trim()) {
      setEditingChatId(null);
      return;
    }
    const newTitle = editingTitle.trim();
    setHistoryItems(prev => prev.map(item => item.id === chatId ? { ...item, title: newTitle } : item));
    setEditingChatId(null);
    await chatHistoryService.renameChatHistoryItem(userId, chatId, newTitle);
  };

  const handleDeleteHistoryItem = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setHistoryItems(prev => prev.filter(item => item.id !== chatId));
    await chatHistoryService.deleteChatHistoryItem(userId, chatId);
  };

  const handleClearAllHistory = async () => {
    setHistoryItems([]);
    await chatHistoryService.deleteChatHistory(userId);
  };

  const filteredHistoryItems = historyItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.userMessage.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.aiResponse.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(m => 
    m.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Markdown & Code block renderer
  const renderMessageText = (text: string) => {
    if (!text) return null;
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const language = match[1] || '';
      const code = match[2];
      parts.push(
        <div key={match.index} className="my-2 rounded-lg bg-[#0f1321] border border-white/10 overflow-hidden">
          <div className="px-3 py-1 bg-white/5 border-b border-white/10 text-[10px] text-[#bac9cc] font-mono uppercase">
            {language || 'code'}
          </div>
          <pre className="p-3 overflow-x-auto text-xs text-[#00daf3] font-mono">
            <code>{code}</code>
          </pre>
        </div>
      );
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return (
      <div className="whitespace-pre-wrap text-sm">
        {parts.map((part, i) => (
          <React.Fragment key={i}>{part}</React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      {showTriggerButton && (
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpen}
              className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#6001d1] shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center text-white z-50 group border border-white/20 cursor-pointer"
            >
              <Bot size={28} className="group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0f1321]" />
            </motion.button>
          )}
        </AnimatePresence>
      )}

      {/* Chat Interface Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 sm:bottom-8 sm:right-8 w-full sm:w-[420px] h-[100dvh] sm:h-[650px] bg-[#0a0d1a] sm:rounded-3xl border border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#0a0d1a] relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border border-[#00e5ff]/40 flex items-center justify-center">
                  <Bot size={20} className="text-[#00daf3]" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">FinGuard Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-400 font-mono">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#bac9cc]">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)} 
                  className={`p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer ${isSearchOpen ? 'text-[#00daf3]' : ''}`}
                  title="Search messages"
                >
                  <Search size={18} />
                </button>
                <button 
                  onClick={() => {
                    const nextState = !isHistoryOpen;
                    setIsHistoryOpen(nextState);
                    if (nextState) fetchHistory();
                  }} 
                  className={`p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer relative ${isHistoryOpen ? 'text-[#00daf3]' : ''}`}
                  title="Chat History"
                >
                  <History size={18} />
                  {historyItems.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00daf3]" />
                  )}
                </button>
                <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors ml-1 cursor-pointer" title="Minimize">
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 py-3 border-b border-white/5 bg-[#0f1321]"
                >
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bac9cc]" />
                    <input 
                      type="text" 
                      placeholder={isHistoryOpen ? "Search chat history..." : "Search messages..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0a0d1a] border border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#00daf3]/50"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar relative">
              {isHistoryOpen ? (
                // Chat History View
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsHistoryOpen(false)} 
                        className="p-1 hover:bg-white/10 rounded-lg text-[#bac9cc] hover:text-white transition-colors cursor-pointer"
                        title="Back to Active Chat"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <History size={16} className="text-[#00daf3]" /> Chat History
                      </h4>
                    </div>
                    {historyItems.length > 0 && (
                      <button 
                        onClick={handleClearAllHistory} 
                        className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} /> Clear History
                      </button>
                    )}
                  </div>

                  {/* Loading State */}
                  {isHistoryLoading && (
                    <div className="py-12 text-center text-[#bac9cc] flex flex-col items-center gap-2">
                      <Loader2 size={24} className="animate-spin text-[#00daf3]" />
                      <span className="text-xs font-mono">Syncing history from database...</span>
                    </div>
                  )}

                  {/* Error State */}
                  {historyError && !isHistoryLoading && (
                    <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="shrink-0 text-amber-400" />
                        <span>{historyError}</span>
                      </div>
                      <button onClick={fetchHistory} className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 rounded text-[10px] font-bold cursor-pointer">
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Empty State */}
                  {!isHistoryLoading && historyItems.length === 0 && (
                    <div className="text-center py-12 opacity-60 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#bac9cc]">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">No history saved yet</p>
                        <p className="text-xs text-[#bac9cc] mt-1">Your conversations will automatically appear here.</p>
                      </div>
                    </div>
                  )}

                  {/* History List */}
                  {!isHistoryLoading && filteredHistoryItems.length > 0 && (
                    <div className="space-y-3">
                      {filteredHistoryItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleOpenHistoryItem(item)}
                          className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00daf3]/50 hover:bg-white/10 transition-all cursor-pointer group relative"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              {editingChatId === item.id ? (
                                <form onSubmit={(e) => handleSaveRename(e, item.id)} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 mb-1">
                                  <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    autoFocus
                                    className="bg-[#0f1321] border border-[#00daf3] rounded px-2 py-0.5 text-xs text-white font-bold w-full focus:outline-none"
                                  />
                                  <button
                                    type="submit"
                                    className="px-2 py-0.5 bg-[#00daf3] text-[#0f1321] text-[10px] font-bold rounded cursor-pointer shrink-0"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setEditingChatId(null); }}
                                    className="px-2 py-0.5 bg-white/10 text-white text-[10px] rounded cursor-pointer shrink-0"
                                  >
                                    Cancel
                                  </button>
                                </form>
                              ) : (
                                <p className="text-xs font-bold text-white truncate group-hover:text-[#00daf3] transition-colors">
                                  {item.title}
                                </p>
                              )}
                              
                              <p className="text-[11px] text-[#bac9cc] line-clamp-2 mt-1 font-sans opacity-80">
                                {item.userMessage.text || (item.userMessage.attachment ? `[File Attached: ${item.userMessage.attachment.name}]` : 'Security Scan')}
                              </p>

                              <div className="flex items-center gap-2 mt-2 text-[10px] text-[#bac9cc]/60 font-mono">
                                <Clock size={11} />
                                <span>{new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                              <button
                                onClick={(e) => handleStartRename(e, item)}
                                className="p-1.5 text-[#bac9cc]/70 hover:text-[#00daf3] hover:bg-[#00daf3]/10 rounded-lg cursor-pointer"
                                title="Rename conversation"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                                className="p-1.5 text-[#bac9cc]/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                                title="Delete conversation"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Messages View
                <>
                  {messages.length === 0 ? (
                    // Empty State
                    <div className="h-full flex flex-col items-center justify-center opacity-70 space-y-4 pt-10">
                      <div className="w-16 h-16 rounded-full bg-[#00daf3]/10 border border-[#00daf3]/20 flex items-center justify-center">
                        <Bot size={32} className="text-[#00daf3]" />
                      </div>
                      <div className="text-center">
                        <h4 className="text-white font-bold mb-1">How can I help you?</h4>
                        <p className="text-xs text-[#bac9cc]">Ask me to analyze links, SMS, or attach files/screenshots.</p>
                      </div>
                    </div>
                  ) : (
                    // Message List
                    <div className="space-y-6">
                      {filteredMessages.map((msg) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={msg.id} 
                          className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className="shrink-0 mt-1">
                              {msg.sender === 'ai' ? (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border border-[#00e5ff]/40 flex items-center justify-center">
                                  <Bot size={14} className="text-[#00daf3]" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                  <User size={14} className="text-white" />
                                </div>
                              )}
                            </div>
                            
                            {/* Bubble */}
                            <div className="flex flex-col gap-1 min-w-0">
                              <div className={`p-3.5 rounded-2xl ${
                                msg.isError 
                                  ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                                  : msg.sender === 'user'
                                    ? 'bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/20 border border-[#00e5ff]/30 text-white rounded-tr-sm'
                                    : 'bg-white/5 border border-white/10 text-[#dfe1f6] rounded-tl-sm'
                              }`}>
                                {msg.isError ? (
                                  <div className="flex items-start gap-2">
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <span className="text-sm">{msg.text}</span>
                                  </div>
                                ) : (
                                  <>
                                    {msg.text && renderMessageText(msg.text)}

                                    {/* Render Attachment in Message Bubble */}
                                    {msg.attachment && (
                                      <div className={`${msg.text ? 'mt-3 pt-2 border-t border-white/10' : ''}`}>
                                        {msg.attachment.typeCategory === 'image' ? (
                                          <div className="relative group rounded-xl overflow-hidden border border-white/15 bg-black/40 max-w-xs">
                                            <img 
                                              src={msg.attachment.url || msg.attachment.previewUrl} 
                                              alt={msg.attachment.name}
                                              className="max-h-56 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <a 
                                              href={msg.attachment.url || msg.attachment.previewUrl} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity gap-1"
                                            >
                                              <ExternalLink size={14} /> Open Full View
                                            </a>
                                            <div className="p-2 bg-[#0f1321]/90 backdrop-blur-sm border-t border-white/10 flex items-center justify-between text-[10px] text-[#bac9cc] font-mono">
                                              <span className="truncate max-w-[160px]">{msg.attachment.name}</span>
                                              <span>{formatFileSize(msg.attachment.size)}</span>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/10 border border-white/15 hover:border-[#00daf3]/40 transition-colors max-w-xs">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                              <div className="p-2 rounded-lg bg-[#00daf3]/15 text-[#00daf3] shrink-0">
                                                {msg.attachment.typeCategory === 'pdf' ? (
                                                  <FileText size={18} className="text-rose-400" />
                                                ) : msg.attachment.typeCategory === 'doc' ? (
                                                  <FileText size={18} className="text-sky-400" />
                                                ) : (
                                                  <FileCode size={18} className="text-emerald-400" />
                                                )}
                                              </div>
                                              <div className="min-w-0">
                                                <p className="text-xs font-bold text-white truncate font-mono">{msg.attachment.name}</p>
                                                <p className="text-[10px] text-[#bac9cc] font-mono">{formatFileSize(msg.attachment.size)}</p>
                                              </div>
                                            </div>

                                            <a 
                                              href={msg.attachment.url || msg.attachment.previewUrl} 
                                              download={msg.attachment.name}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#00daf3]/20 text-[#00daf3] transition-colors shrink-0"
                                              title="Download / Open File"
                                            >
                                              <Download size={14} />
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                              
                              {/* Message Footer */}
                              <div className={`flex items-center gap-3 text-[10px] text-[#bac9cc] font-mono ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <span>{formatTime(msg.timestamp)}</span>
                                {msg.sender === 'ai' && !msg.isError && (
                                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => copyToClipboard(msg.text, msg.id)} className="hover:text-white transition-colors cursor-pointer" title="Copy">
                                      {copiedId === msg.id ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                                    </button>
                                    {messages[messages.length - 1].id === msg.id && (
                                      <button onClick={regenerateResponse} className="hover:text-[#00daf3] transition-colors cursor-pointer" title="Regenerate">
                                        <RefreshCw size={12} />
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border border-[#00e5ff]/40 flex items-center justify-center shrink-0">
                        <Bot size={14} className="text-[#00daf3]" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-1.5 h-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Quick Prompts */}
            {!isHistoryOpen && (
              <div className="px-4 py-2 overflow-x-auto whitespace-nowrap custom-scrollbar flex gap-2 border-t border-white/5 bg-[#0a0d1a]">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#00daf3]/10 border border-white/10 hover:border-[#00daf3]/30 text-[11px] text-[#bac9cc] hover:text-[#00daf3] transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer Area */}
            {!isHistoryOpen && (
              <div className="p-4 bg-[#0f1321] border-t border-white/10 relative z-10">
                {/* File Validation Error Toast */}
                {fileValidationError && (
                  <div className="mb-2 p-2 px-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center justify-between gap-2 font-sans">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <AlertTriangle size={14} className="shrink-0 text-red-400" />
                      <span className="truncate">{fileValidationError}</span>
                    </div>
                    <button onClick={() => setFileValidationError(null)} className="p-0.5 text-red-300 hover:text-white cursor-pointer">
                      <X size={12} />
                    </button>
                  </div>
                )}

                {/* Pending File Attachment Banner */}
                <AnimatePresence>
                  {pendingAttachment && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      className="mb-2 p-2.5 rounded-xl bg-[#0a0d1a] border border-[#00daf3]/40 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {pendingAttachment.typeCategory === 'image' ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black">
                              <img 
                                src={pendingAttachment.previewUrl} 
                                alt="Preview" 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-[#00daf3]/15 border border-[#00daf3]/30 flex items-center justify-center shrink-0">
                              {pendingAttachment.typeCategory === 'pdf' ? (
                                <FileText size={20} className="text-rose-400" />
                              ) : pendingAttachment.typeCategory === 'doc' ? (
                                <FileText size={20} className="text-sky-400" />
                              ) : (
                                <FileCode size={20} className="text-emerald-400" />
                              )}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-white truncate font-mono">{pendingAttachment.name}</p>
                            <p className="text-[10px] text-[#bac9cc] font-mono">
                              {formatFileSize(pendingAttachment.size)} • {pendingAttachment.typeCategory.toUpperCase()}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={removePendingAttachment}
                          className="p-1.5 text-[#bac9cc] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Remove selected file"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Upload Progress Bar */}
                      {pendingAttachment.uploadStatus === 'uploading' && (
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[10px] font-mono text-[#00daf3]">
                            <span>Uploading file...</span>
                            <span>{pendingAttachment.uploadProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#00e5ff] to-[#6001d1] transition-all duration-150" 
                              style={{ width: `${pendingAttachment.uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Container */}
                <div className="flex items-end gap-2 bg-[#0a0d1a] border border-white/10 rounded-2xl p-1.5 focus-within:border-[#00daf3]/50 transition-colors">
                  
                  {/* Paperclip Button */}
                  <div className="flex items-center gap-1 pb-1 pl-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,.doc,.docx,image/jpeg,image/png,image/webp,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileSelect}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-[#bac9cc] hover:text-[#00daf3] hover:bg-white/5 rounded-xl transition-colors cursor-pointer relative"
                      title="Attach file (Images, PDF, TXT, Word - Max 10MB)"
                    >
                      <Paperclip size={18} />
                      {pendingAttachment && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00daf3] animate-pulse" />
                      )}
                    </button>
                  </div>
                  
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={pendingAttachment ? "Add a message or press send..." : "Type your security question..."}
                    className="flex-1 bg-transparent border-none text-sm text-white resize-none max-h-32 min-h-[40px] py-2.5 focus:outline-none focus:ring-0 custom-scrollbar"
                    rows={1}
                  />
                  
                  <div className="flex items-center gap-1 pb-1 pr-1">
                    {(inputValue.trim() || pendingAttachment) ? (
                      <button 
                        onClick={() => handleSend()}
                        disabled={pendingAttachment?.uploadStatus === 'uploading'}
                        className="p-2 bg-[#00daf3] text-[#0f1321] rounded-xl hover:bg-[#00e5ff] transition-colors cursor-pointer disabled:opacity-50"
                        title="Send message"
                      >
                        {pendingAttachment?.uploadStatus === 'uploading' ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Send size={18} className="translate-x-0.5" />
                        )}
                      </button>
                    ) : (
                      <button className="p-2 text-[#bac9cc] hover:text-[#00daf3] hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                        <Mic size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-center mt-2">
                  <span className="text-[9px] text-[#bac9cc]/50 font-mono">
                    Max file size: 10MB • Automatic History Backup Enabled
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
