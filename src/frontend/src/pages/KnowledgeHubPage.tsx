import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LanguageSelector, { type Language } from '../components/LanguageSelector';
import ModuleCard from '../components/ModuleCard';
import { knowledgeModules, moduleAccentColors } from '../lib/knowledgeData';

const pageLabels: Record<Language, { title: string; subtitle: string; searchPlaceholder: string; noResults: string }> = {
  english: {
    title: 'Knowledge Hub',
    subtitle: 'Learn everything you need to run your shop digitally',
    searchPlaceholder: 'Search topics...',
    noResults: 'No topics found. Try a different search.',
  },
  hindi: {
    title: 'ज्ञान केंद्र',
    subtitle: 'अपनी दुकान को डिजिटल रूप से चलाने के लिए सब कुछ सीखें',
    searchPlaceholder: 'विषय खोजें...',
    noResults: 'कोई विषय नहीं मिला। अलग खोज करें।',
  },
  marathi: {
    title: 'ज्ञान केंद्र',
    subtitle: 'तुमची दुकान डिजिटल पद्धतीने चालवण्यासाठी सर्व काही शिका',
    searchPlaceholder: 'विषय शोधा...',
    noResults: 'कोणताही विषय सापडला नाही. वेगळा शोध करा.',
  },
};

export default function KnowledgeHubPage() {
  const [language, setLanguage] = useState<Language>('english');
  const [search, setSearch] = useState('');

  const labels = pageLabels[language];

  const filtered = knowledgeModules.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.title[language].toLowerCase().includes(q) ||
      m.description[language].toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Page Header */}
      <div className="bg-surface-warm border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <BookOpen size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-primary-dark">{labels.title}</h1>
                <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
              </div>
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="pl-9 rounded-xl border-amber-300 focus:ring-primary bg-white"
            />
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>{labels.noResults}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                language={language}
                accentColor={moduleAccentColors[module.category] ?? '#FF9933'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
