import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, MicOff, AlertCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import LanguageSelector, { type Language } from '../components/LanguageSelector';
import ChatMessage, { type Message } from '../components/ChatMessage';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { getChatResponse } from '../lib/chatData';

const pageLabels: Record<Language, { title: string; subtitle: string; placeholder: string; thinking: string }> = {
  english: {
    title: 'AI Business Assistant',
    subtitle: 'Ask me anything about GST, payments, security, marketing, or accounting!',
    placeholder: 'Type your question here... (e.g., "How do I file GST?")',
    thinking: 'Thinking...',
  },
  hindi: {
    title: 'AI बिजनेस सहायक',
    subtitle: 'जीएसटी, पेमेंट, सुरक्षा, मार्केटिंग या हिसाब के बारे में कुछ भी पूछें!',
    placeholder: 'यहां अपना सवाल लिखें... (जैसे "जीएसटी कैसे भरें?")',
    thinking: 'सोच रहा हूं...',
  },
  marathi: {
    title: 'AI व्यवसाय सहाय्यक',
    subtitle: 'जीएसटी, पेमेंट, सुरक्षा, मार्केटिंग किंवा हिशोबाबद्दल काहीही विचारा!',
    placeholder: 'येथे तुमचा प्रश्न लिहा... (उदा. "जीएसटी कसे भरावे?")',
    thinking: 'विचार करत आहे...',
  },
};

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

function getWelcomeMessage(language: Language): Message {
  const welcomeTexts: Record<Language, string> = {
    english: `👋 Namaste! I'm DukanSaathi, your AI business assistant.\n\nI can help you with:\n• 📋 GST Filing\n• 💳 Digital Payments\n• 🔒 IT Security\n• 📢 Online Marketing\n• 📊 Accounting\n\nType your question or use the microphone to speak!`,
    hindi: `👋 नमस्ते! मैं DukanSaathi हूं, आपका AI बिजनेस सहायक।\n\nमैं इनमें मदद कर सकता हूं:\n• 📋 जीएसटी फाइलिंग\n• 💳 डिजिटल पेमेंट\n• 🔒 IT सुरक्षा\n• 📢 ऑनलाइन मार्केटिंग\n• 📊 हिसाब-किताब\n\nअपना सवाल टाइप करें या माइक से बोलें!`,
    marathi: `👋 नमस्कार! मी DukanSaathi आहे, तुमचा AI व्यवसाय सहाय्यक.\n\nमी यांमध्ये मदत करू शकतो:\n• 📋 जीएसटी फाइलिंग\n• 💳 डिजिटल पेमेंट\n• 🔒 IT सुरक्षा\n• 📢 ऑनलाइन मार्केटिंग\n• 📊 हिशोब\n\nतुमचा प्रश्न टाइप करा किंवा मायक्रोफोनने बोला!`,
  };

  return {
    id: 'welcome',
    role: 'assistant',
    content: welcomeTexts[language],
    timestamp: new Date(),
  };
}

export default function ChatPage() {
  const [language, setLanguage] = useState<Language>('english');
  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage('english')]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported, error: speechError } = useSpeechRecognition(language);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Populate input from speech transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Update welcome message when language changes
  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    setMessages((prev) => {
      const withoutWelcome = prev.filter((m) => m.id !== 'welcome');
      return [getWelcomeMessage(lang), ...withoutWelcome];
    });
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    resetTranscript();
    setIsThinking(true);

    // Simulate thinking delay for natural feel
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));

    const responseText = getChatResponse(trimmed, language);
    const assistantMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsThinking(false);
  }, [input, isThinking, language, resetTranscript]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const labels = pageLabels[language];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Chat Header */}
      <div className="bg-surface-warm border-b border-amber-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-base text-primary-dark">{labels.title}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{labels.subtitle}</p>
            </div>
          </div>
          <LanguageSelector value={language} onChange={handleLanguageChange} />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-amber-50/30">
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Thinking indicator */}
          {isThinking && (
            <div className="flex gap-3 items-end">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
              <div className="bg-white border border-amber-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-xs">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-muted-foreground ml-1">{labels.thinking}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-amber-200 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          {/* Speech error */}
          {speechError && (
            <div className="flex items-center gap-2 text-xs text-destructive mb-2 bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle size={14} />
              {speechError}
            </div>
          )}

          {/* Listening indicator */}
          {isListening && (
            <div className="flex items-center gap-2 text-xs text-primary mb-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-medium">Listening... speak now</span>
            </div>
          )}

          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={labels.placeholder}
                className="resize-none min-h-[48px] max-h-32 pr-4 rounded-2xl border-amber-300 focus:ring-primary text-sm"
                rows={1}
                disabled={isThinking}
              />
            </div>

            {/* Mic button */}
            {isSupported && (
              <Button
                size="icon"
                variant={isListening ? 'default' : 'outline'}
                className={`h-12 w-12 rounded-2xl shrink-0 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 border-red-500 text-white animate-pulse'
                    : 'border-amber-300 text-primary hover:bg-amber-50'
                }`}
                onClick={handleMicToggle}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </Button>
            )}

            {/* Send button */}
            <Button
              size="icon"
              className="h-12 w-12 rounded-2xl bg-primary hover:bg-primary-dark text-white shrink-0 shadow-sm"
              onClick={handleSend}
              disabled={!input.trim() || isThinking}
            >
              <Send size={18} />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
