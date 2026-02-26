import { Link } from '@tanstack/react-router';
import { MessageCircle, BookOpen, Map, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Chat Assistant',
    titleHi: 'AI चैट सहायक',
    desc: 'Ask questions in Hindi, Marathi, or English and get instant answers.',
    descHi: 'हिंदी, मराठी या अंग्रेजी में सवाल पूछें और तुरंत जवाब पाएं।',
    to: '/chat',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Hub',
    titleHi: 'ज्ञान केंद्र',
    desc: 'Learn about GST, payments, security, marketing, and accounting.',
    descHi: 'जीएसटी, पेमेंट, सुरक्षा, मार्केटिंग और हिसाब के बारे में जानें।',
    to: '/knowledge',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
  },
  {
    icon: Map,
    title: 'My Journey',
    titleHi: 'मेरी यात्रा',
    desc: 'Follow a step-by-step roadmap to become digitally ready.',
    descHi: 'डिजिटल रूप से तैयार होने के लिए चरण-दर-चरण रोडमैप का पालन करें।',
    to: '/journey',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
  },
];

const stats = [
  { icon: Users, value: '5 Lakh+', label: 'Shop Owners Helped', labelHi: 'दुकानदारों की मदद' },
  { icon: Star, value: '4.8★', label: 'Average Rating', labelHi: 'औसत रेटिंग' },
  { icon: TrendingUp, value: '3x', label: 'Business Growth', labelHi: 'व्यापार वृद्धि' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-amber-400" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-orange-300" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white border border-amber-300 rounded-full px-4 py-1.5 text-sm font-semibold text-primary mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                AI-Powered • Hindi & Marathi Support
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary-dark leading-tight mb-3">
                DukanSaathi
                <span className="block text-primary text-3xl md:text-4xl mt-1">दुकान साथी</span>
              </h1>

              <p className="text-lg text-foreground/80 mb-2 font-medium">
                Your AI Business Assistant for Small Shops
              </p>
              <p className="text-base text-muted-foreground mb-6">
                छोटे दुकानदारों का डिजिटल साथी — GST, UPI, सुरक्षा और मार्केटिंग में मदद
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/chat">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl px-8 h-12 text-base shadow-md w-full sm:w-auto">
                    <MessageCircle size={20} className="mr-2" />
                    Start Chatting
                  </Button>
                </Link>
                <Link to="/journey">
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-amber-50 font-bold rounded-2xl px-8 h-12 text-base w-full sm:w-auto">
                    <Map size={20} className="mr-2" />
                    My Journey
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-3xl blur-2xl scale-110" />
                <img
                  src="/assets/generated/shopkeeper-hero.dim_1200x600.png"
                  alt="Friendly shop owner with AI assistant"
                  className="relative rounded-3xl shadow-xl w-full max-w-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, value, label, labelHi }) => (
              <div key={label} className="text-center text-white">
                <Icon size={24} className="mx-auto mb-1 opacity-80" />
                <div className="text-2xl font-extrabold">{value}</div>
                <div className="text-xs opacity-80 font-medium">{label}</div>
                <div className="text-xs opacity-60">{labelHi}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-dark mb-2">
            Everything Your Shop Needs
          </h2>
          <p className="text-muted-foreground">आपकी दुकान को चाहिए सब कुछ एक जगह</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, titleHi, desc, descHi, to, color, iconColor }) => (
            <Link key={to} to={to} className="group">
              <div className={`h-full p-6 rounded-2xl border-2 ${color} transition-all group-hover:shadow-lg group-hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-xs ${iconColor}`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-primary-dark mb-0.5">{title}</h3>
                <p className="text-sm font-medium text-primary mb-2">{titleHi}</p>
                <p className="text-sm text-muted-foreground mb-1">{desc}</p>
                <p className="text-xs text-muted-foreground/70">{descHi}</p>
                <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${iconColor} group-hover:gap-2 transition-all`}>
                  Explore <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Topics Section */}
      <section className="bg-amber-50 border-y border-amber-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-primary-dark mb-2">
              Topics We Cover
            </h2>
            <p className="text-muted-foreground">हम इन विषयों में मदद करते हैं</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: '/assets/generated/icon-gst.dim_128x128.png', label: 'GST Filing', labelHi: 'जीएसटी' },
              { icon: '/assets/generated/icon-payments.dim_128x128.png', label: 'Digital Payments', labelHi: 'डिजिटल पेमेंट' },
              { icon: '/assets/generated/icon-security.dim_128x128.png', label: 'IT Security', labelHi: 'IT सुरक्षा' },
              { icon: '/assets/generated/icon-marketing.dim_128x128.png', label: 'Marketing', labelHi: 'मार्केटिंग' },
              { icon: '/assets/generated/icon-accounting.dim_128x128.png', label: 'Accounting', labelHi: 'हिसाब-किताब' },
            ].map(({ icon, label, labelHi }) => (
              <Link key={label} to="/knowledge" className="group">
                <div className="bg-white rounded-2xl border border-amber-200 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <img src={icon} alt={label} className="w-12 h-12 mx-auto mb-2 object-contain" />
                  <p className="text-sm font-bold text-primary-dark">{label}</p>
                  <p className="text-xs text-muted-foreground">{labelHi}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="bg-gradient-to-br from-primary to-amber-600 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-3">
            Ready to Go Digital?
          </h2>
          <p className="text-white/80 mb-6 text-lg">
            डिजिटल बनने के लिए तैयार हैं? अभी शुरू करें!
          </p>
          <Link to="/chat">
            <Button size="lg" className="bg-white text-primary hover:bg-amber-50 font-bold rounded-2xl px-10 h-12 text-base shadow-md">
              <MessageCircle size={20} className="mr-2" />
              Chat with DukanSaathi
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
