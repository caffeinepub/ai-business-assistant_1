import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { type Language } from './LanguageSelector';

export interface KnowledgeModule {
  id: string;
  category: string;
  icon: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  tips: Record<Language, string[]>;
}

interface ModuleCardProps {
  module: KnowledgeModule;
  language: Language;
  accentColor: string;
}

export default function ModuleCard({ module, language, accentColor }: ModuleCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden transition-all duration-300 ${
        expanded ? 'shadow-md' : 'hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {/* Card Header */}
      <button
        className="w-full text-left p-5 flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
          style={{ background: accentColor + '20' }}
        >
          <img
            src={module.icon}
            alt={module.title[language]}
            className="w-10 h-10 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-base text-primary-dark leading-tight">
            {module.title[language]}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {module.description[language]}
          </p>
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? (
            <ChevronUp size={20} className="text-primary" />
          ) : (
            <ChevronDown size={20} className="text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-amber-100">
          <ul className="mt-4 space-y-3">
            {module.tips[language].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
