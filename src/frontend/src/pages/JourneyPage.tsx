import { useState } from 'react';
import { Map, Trophy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import LanguageSelector, { type Language } from '../components/LanguageSelector';
import MilestoneCard from '../components/MilestoneCard';
import { useGetUserJourney, useInitializeJourney, useMarkMilestoneCompleted } from '../hooks/useQueries';
import { milestoneLabels } from '../lib/milestoneLabels';

const pageLabels: Record<
  Language,
  {
    title: string;
    subtitle: string;
    progress: string;
    completed: string;
    initTitle: string;
    initDesc: string;
    initBtn: string;
    allDone: string;
    loading: string;
    refresh: string;
  }
> = {
  english: {
    title: 'My Technology Journey',
    subtitle: 'Complete each milestone to become digitally ready',
    progress: 'Progress',
    completed: 'completed',
    initTitle: 'Start Your Journey!',
    initDesc: 'Begin your step-by-step guide to becoming a digital-ready shop owner.',
    initBtn: 'Start My Journey',
    allDone: '🎉 Congratulations! You have completed all milestones!',
    loading: 'Loading your journey...',
    refresh: 'Refresh',
  },
  hindi: {
    title: 'मेरी तकनीकी यात्रा',
    subtitle: 'डिजिटल रूप से तैयार होने के लिए हर मील का पत्थर पूरा करें',
    progress: 'प्रगति',
    completed: 'पूरा हुआ',
    initTitle: 'अपनी यात्रा शुरू करें!',
    initDesc: 'डिजिटल-तैयार दुकानदार बनने के लिए चरण-दर-चरण गाइड शुरू करें।',
    initBtn: 'यात्रा शुरू करें',
    allDone: '🎉 बधाई हो! आपने सभी मील के पत्थर पूरे कर लिए!',
    loading: 'आपकी यात्रा लोड हो रही है...',
    refresh: 'रिफ्रेश करें',
  },
  marathi: {
    title: 'माझी तंत्रज्ञान यात्रा',
    subtitle: 'डिजिटल तयार होण्यासाठी प्रत्येक टप्पा पूर्ण करा',
    progress: 'प्रगती',
    completed: 'पूर्ण',
    initTitle: 'तुमची यात्रा सुरू करा!',
    initDesc: 'डिजिटल-तयार दुकानदार होण्यासाठी चरण-दर-चरण मार्गदर्शक सुरू करा.',
    initBtn: 'यात्रा सुरू करा',
    allDone: '🎉 अभिनंदन! तुम्ही सर्व टप्पे पूर्ण केले!',
    loading: 'तुमची यात्रा लोड होत आहे...',
    refresh: 'रिफ्रेश करा',
  },
};

export default function JourneyPage() {
  const [language, setLanguage] = useState<Language>('english');
  const [completingId, setCompletingId] = useState<bigint | null>(null);

  const { data: journey, isLoading, error, refetch } = useGetUserJourney();
  const initMutation = useInitializeJourney();
  const completeMutation = useMarkMilestoneCompleted();

  const labels = pageLabels[language];

  const needsInit = !isLoading && (!!error || !journey);

  const completedCount = journey?.milestones.filter((m) => m.isCompleted).length ?? 0;
  const totalCount = journey?.milestones.length ?? 5;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const allDone = completedCount === totalCount && totalCount > 0;

  const handleInit = async () => {
    try {
      await initMutation.mutateAsync();
    } catch {
      // ignore — error shown via mutation state if needed
    }
  };

  const handleMarkDone = async (id: bigint) => {
    setCompletingId(id);
    try {
      await completeMutation.mutateAsync(id);
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Page Header */}
      <div className="bg-surface-warm border-b border-amber-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <Map size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-primary-dark">{labels.title}</h1>
                <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
              </div>
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          {/* Progress Bar */}
          {journey && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold text-primary-dark">{labels.progress}</span>
                <span className="text-muted-foreground font-medium">
                  {completedCount}/{totalCount} {labels.completed}
                </span>
              </div>
              <Progress value={progressPercent} className="h-3 rounded-full bg-amber-100" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">{labels.loading}</p>
          </div>
        )}

        {/* Not initialized */}
        {!isLoading && needsInit && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <Map size={36} className="text-primary" />
            </div>
            <h2 className="font-display font-bold text-xl text-primary-dark mb-2">{labels.initTitle}</h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{labels.initDesc}</p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl px-10 h-12"
              onClick={handleInit}
              disabled={initMutation.isPending}
            >
              {initMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Starting...
                </span>
              ) : (
                labels.initBtn
              )}
            </Button>
          </div>
        )}

        {/* All done celebration */}
        {journey && allDone && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-5 text-center">
            <Trophy size={32} className="text-yellow-500 mx-auto mb-2" />
            <p className="font-bold text-green-700 text-lg">{labels.allDone}</p>
          </div>
        )}

        {/* Milestones */}
        {journey && (
          <div className="space-y-4">
            {journey.milestones.map((milestone, idx) => {
              const milestoneId = Number(milestone.id);
              const labelEntry = milestoneLabels[milestoneId] ?? {
                english: { title: milestone.title, description: milestone.description },
                hindi: { title: milestone.title, description: milestone.description },
                marathi: { title: milestone.title, description: milestone.description },
              };

              return (
                <div key={milestone.id.toString()} className="relative">
                  {/* Connector line between milestones */}
                  {idx < journey.milestones.length - 1 && (
                    <div className="absolute left-[28px] top-[72px] w-0.5 h-6 bg-amber-200 z-0" />
                  )}
                  <MilestoneCard
                    id={milestone.id}
                    title={milestone.title}
                    description={milestone.description}
                    illustrationUrl={milestone.illustrationUrl}
                    status={milestone.status}
                    isCompleted={milestone.isCompleted}
                    stepNumber={idx + 1}
                    language={language}
                    onMarkDone={handleMarkDone}
                    isLoading={completingId === milestone.id}
                    milestoneLabels={labelEntry}
                  />
                </div>
              );
            })}

            {/* Refresh button */}
            <div className="text-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => refetch()}
              >
                <RefreshCw size={14} className="mr-1.5" />
                {labels.refresh}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
