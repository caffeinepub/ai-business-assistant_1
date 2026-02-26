import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type Language = 'english' | 'hindi' | 'marathi';

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
  className?: string;
}

const languages = [
  { value: 'english' as Language, label: 'English', native: 'English' },
  { value: 'hindi' as Language, label: 'Hindi', native: 'हिंदी' },
  { value: 'marathi' as Language, label: 'Marathi', native: 'मराठी' },
];

export default function LanguageSelector({ value, onChange, className }: LanguageSelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <Globe size={16} className="text-primary shrink-0" />
      <Select value={value} onValueChange={(v) => onChange(v as Language)}>
        <SelectTrigger className="w-36 h-9 text-sm border-amber-300 bg-white focus:ring-primary">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <span className="font-medium">{lang.native}</span>
              {lang.value !== 'english' && (
                <span className="text-muted-foreground ml-1 text-xs">({lang.label})</span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
