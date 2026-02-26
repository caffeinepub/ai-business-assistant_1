import { CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Value } from '../backend';
import { type Language } from './LanguageSelector';

interface MilestoneCardProps {
  id: bigint;
  title: string;
  description: string;
  illustrationUrl: string;
  status: Value;
  isCompleted: boolean;
  stepNumber: number;
  language: Language;
  onMarkDone: (id: bigint) => void;
  isLoading: boolean;
  milestoneLabels: Record<Language, { title: string; description: string }>;
}

const statusLabels: Record<Language, { markDone: string; completed: string; locked: string }> = {
  english: { markDone: 'Mark as Done ✓', completed: 'Completed!', locked: 'Locked' },
  hindi: { markDone: 'पूरा हुआ ✓', completed: 'हो गया!', locked: 'बंद है' },
  marathi: { markDone: 'पूर्ण झाले ✓', completed: 'पूर्ण!', locked: 'बंद आहे' },
};

export default function MilestoneCard({
  id,
  status,
  isCompleted,
  stepNumber,
  language,
  onMarkDone,
  isLoading,
  milestoneLabels,
}: MilestoneCardProps) {
  const labels = statusLabels[language];
  const content = milestoneLabels[language];

  const isLocked = status === Value.locked;
  const isDone = status === Value.completed || isCompleted;
  const isUnlocked = status === Value.unlocked && !isCompleted;

  return (
    <div
      className={`relative flex gap-4 p-5 rounded-2xl border transition-all ${
        isDone
          ? 'bg-green-50 border-green-200 shadow-sm'
          : isUnlocked
          ? 'bg-white border-amber-300 shadow-md ring-2 ring-primary/20'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      {/* Step indicator */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
            isDone
              ? 'bg-green-500 text-white'
              : isUnlocked
              ? 'bg-primary text-white'
              : 'bg-gray-300 text-gray-500'
          }`}
        >
          {isDone ? (
            <CheckCircle2 size={20} />
          ) : isLocked ? (
            <Lock size={16} />
          ) : (
            <span>{stepNumber}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className={`font-display font-bold text-base leading-tight ${
                isDone ? 'text-green-700' : isUnlocked ? 'text-primary-dark' : 'text-gray-500'
              }`}
            >
              {content.title}
            </h3>
            <p
              className={`text-sm mt-1 leading-relaxed ${
                isDone ? 'text-green-600' : isUnlocked ? 'text-foreground' : 'text-gray-400'
              }`}
            >
              {content.description}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="mt-3">
          {isDone ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 bg-green-100 px-3 py-1.5 rounded-full">
              <CheckCircle2 size={14} />
              {labels.completed}
            </span>
          ) : isUnlocked ? (
            <Button
              size="sm"
              className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl px-5 h-9"
              onClick={() => onMarkDone(id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  {labels.markDone}
                  <ChevronRight size={14} />
                </span>
              )}
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
              <Lock size={12} />
              {labels.locked}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
