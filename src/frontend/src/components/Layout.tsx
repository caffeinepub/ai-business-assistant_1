import { ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { MessageCircle, BookOpen, Map, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { to: '/', label: 'Home', labelHi: 'होम', icon: Home },
  { to: '/chat', label: 'Chat', labelHi: 'चैट', icon: MessageCircle },
  { to: '/knowledge', label: 'Knowledge Hub', labelHi: 'ज्ञान केंद्र', icon: BookOpen },
  { to: '/journey', label: 'My Journey', labelHi: 'मेरी यात्रा', icon: Map },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const appId = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'unknown-app';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-warm border-b border-amber-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">द</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg text-primary-dark">DukanSaathi</span>
              <span className="text-xs text-muted-foreground font-medium">दुकान साथी</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = currentPath === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-foreground hover:bg-amber-100 hover:text-primary-dark'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-amber-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} className="text-primary-dark" /> : <Menu size={22} className="text-primary-dark" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-amber-200 bg-surface-warm px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label, labelHi, icon: Icon }) => {
              const isActive = currentPath === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-foreground hover:bg-amber-100 hover:text-primary-dark'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                  <span className="text-sm opacity-70 ml-1">{labelHi}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface-warm border-t border-amber-200 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary-dark">DukanSaathi</span>
            <span>•</span>
            <span>आपका डिजिटल साथी</span>
          </div>
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Built with</span>
            <span className="text-red-500">❤️</span>
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
