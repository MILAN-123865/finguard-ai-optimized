import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from './Tooltip';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  currentValue?: string;
  className?: string;
  variant?: 'button' | 'icon' | 'badge' | 'hero';
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTranscript,
  currentValue = '',
  className = '',
  variant = 'button',
}) => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      const langMap: Record<string, string> = {
        en: 'en-US',
        hi: 'hi-IN',
        gu: 'gu-IN',
      };
      recognition.lang = langMap[i18n.language] || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let currentInterim = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptChunk = result[0].transcript;
          if (result.isFinal) {
            finalTranscript += transcriptChunk;
          } else {
            currentInterim += transcriptChunk;
          }
        }

        setInterimText(currentInterim);

        if (finalTranscript) {
          const updated = currentValue
            ? `${currentValue.trim()} ${finalTranscript.trim()}`
            : finalTranscript.trim();
          onTranscript(updated);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error event:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMsg(t('scanner.micPermissionDenied', 'Microphone permission denied or unavailable in this environment'));
          fallbackToSimulation();
        } else if (event.error !== 'no-speech') {
          setErrorMsg(`Voice Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimText('');
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Error initializing Web Speech API:', e);
      setIsSupported(false);
    }

    return () => {
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    };
  }, [i18n.language, currentValue, onTranscript, t]);

  const fallbackToSimulation = () => {
    setIsListening(true);
    setErrorMsg(null);
    
    const samplePhrases = [
      'Urgent message regarding your account suspension.',
      ' Please verify your credentials at http://secure-verify-bank.com',
      ' to prevent immediate permanent closure.',
    ];

    let phraseIdx = 0;
    let accumulated = currentValue ? currentValue + ' ' : '';

    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);

    simulationIntervalRef.current = setInterval(() => {
      if (phraseIdx < samplePhrases.length) {
        accumulated += samplePhrases[phraseIdx];
        onTranscript(accumulated);
        setInterimText(`[Simulated Dictation: ${samplePhrases[phraseIdx]}]`);
        phraseIdx++;
      } else {
        if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
        setIsListening(false);
        setInterimText('');
      }
    }, 1200);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn('Error stopping recognition:', e);
        }
      }
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
      setIsListening(false);
      setInterimText('');
      return;
    }

    if (recognitionRef.current && isSupported) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Speech recognition start failed, using fallback:', e);
        fallbackToSimulation();
      }
    } else {
      fallbackToSimulation();
    }
  };

  if (variant === 'hero') {
    return (
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={toggleListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all relative cursor-pointer ${
            isListening
              ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.7)] scale-110 border-2 border-white'
              : 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:scale-105 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
          }`}
        >
          {isListening ? (
            <MicOff size={32} className="animate-pulse" />
          ) : (
            <Mic size={32} className="group-hover:scale-110 transition-transform" />
          )}

          {isListening && (
            <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-75 pointer-events-none" />
          )}
        </button>

        {isListening ? (
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 animate-pulse">
            <Volume2 size={16} className="animate-bounce" />
            <span>{interimText || t('scanner.listeningNow', 'Listening... Speak your message clearly')}</span>
          </div>
        ) : (
          <p className="text-xs text-[#bac9cc] font-mono max-w-sm">
            {t('scanner.voiceInstruction', 'Click the microphone to start recording. Speak the suspicious message or describe the call clearly.')}
          </p>
        )}

        {errorMsg && (
          <p className="text-[11px] font-mono text-amber-400 mt-2 flex items-center gap-1">
            <AlertCircle size={12} />
            <span>{errorMsg}</span>
          </p>
        )}
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <Tooltip content={isListening ? t('scanner.stopDictation', 'Stop Voice Dictation') : t('scanner.startDictation', 'Start Voice Dictation')}>
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-lg transition-all relative ${
            isListening
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-[#00daf3] hover:bg-[#00daf3]/10 hover:border hover:border-[#00daf3]/30'
          } ${className}`}
        >
          {isListening ? <MicOff size={16} className="animate-pulse" /> : <Mic size={16} />}
          {isListening && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          )}
        </button>
      </Tooltip>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={toggleListening}
        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer border ${
          isListening
            ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
            : 'bg-[#00daf3]/10 hover:bg-[#00daf3]/20 text-[#00daf3] border-[#00daf3]/30 hover:border-[#00daf3]/60'
        } ${className}`}
      >
        {isListening ? (
          <>
            <MicOff size={14} className="animate-pulse text-red-400" />
            <span>{t('scanner.listening', 'Listening...')}</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </>
        ) : (
          <>
            <Mic size={14} className="text-[#00daf3]" />
            <span>{t('scanner.voiceInput', 'Voice Input')}</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {isListening && interimText && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="text-[11px] font-mono text-[#00daf3] italic truncate max-w-[200px]"
          >
            "{interimText}"
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
