import React, { useState, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { 
  Search, Menu, X, ChevronRight, Clock, Award, Briefcase, 
  CheckCircle, PlayCircle, Star, ArrowRight, BookOpen, Users,
  GraduationCap, TrendingUp, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CinematicFooter } from './CinematicFooter';
import { HoverButton } from './HoverButton';

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(30,136,255,${0.05 + i * 0.015})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full overflow-visible text-brand-blue dark:text-neutral-900"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#4F46E5"
            strokeWidth={path.width}
            strokeOpacity={0.12 + path.id * 0.015}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border border-brand-blue/30 bg-black/80 p-1 backdrop-blur-md shadow-lg shadow-brand-blue/10"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} href="#courses">Programs</Tab>
      <Tab setPosition={setPosition} href="#what-we-offer">What We Offer</Tab>
      <Tab setPosition={setPosition} href="#why-choose-us">Why Choose Us</Tab>
      <Tab setPosition={setPosition} href="#outcomes">Outcomes</Tab>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({ children, setPosition, href }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs font-bold uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-sm select-none"
    >
      <a href={href} className="block w-full h-full">{children}</a>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 top-1 bottom-1 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#89ceff] shadow-lg shadow-brand-blue/20"
    />
  );
};

const companies = [
  { name: "Microsoft", className: "font-serif text-xl font-black" },
  { name: "Postman", className: "font-sans text-xl font-extrabold tracking-tight" },
  { name: "amazon", className: "text-xl font-bold tracking-tight" },
  { name: "Zerodha", className: "font-sans text-xl font-black tracking-tight" },
  { name: "Google", className: "italic text-xl font-bold" },
  { name: "Groww", className: "font-sans text-xl font-black tracking-tight" },
  { name: "Razorpay", className: "text-xl font-extrabold italic" },
  { name: "inVideo", className: "font-mono text-xl font-extrabold tracking-wide" },
  { name: "zepto", className: "text-xl font-black italic" },
  { name: "Simpl", className: "font-sans text-xl font-black italic" },
  { name: "CRED", className: "font-mono text-lg font-bold tracking-[0.2em]" },
  { name: "dunzo", className: "font-mono text-lg font-black tracking-widest uppercase" },
  { name: "Hasura", className: "font-sans text-xl font-bold tracking-tight" },
  { name: "zomato", className: "font-serif text-xl font-black" },
  { name: "Ola", className: "font-sans text-xl font-black uppercase tracking-wider" },
  { name: "meesho", className: "font-serif text-xl font-black italic" }
];

function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

function TopUrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState(50400); // 14 hours in seconds (14 * 3600)
  const [slotsLeft, setSlotsLeft] = useState(4);

  React.useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 50400; // reset to 14h to keep urgency active for new visitors
        }
        return prev - 1;
      });
    }, 1000);

    // Dynamic slot reduction simulation
    const slotTimer = setInterval(() => {
      setSlotsLeft((prev) => {
        if (prev <= 2) {
          return 5; // Reset back to 5 slots
        }
        return prev - 1;
      });
    }, 25000); // drops every 25 seconds

    return () => {
      clearInterval(timer);
      clearInterval(slotTimer);
    };
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-[#4F46E5] to-[#00C2FF] bg-[length:200%_auto] animate-banner-shimmer text-white text-xs md:text-sm font-semibold py-2.5 px-4 text-center tracking-wide shadow-md shadow-red-500/10 z-[100] border-b border-white/10 flex flex-wrap items-center justify-center gap-3">
      <style>{`
        @keyframes banner-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-banner-shimmer {
          animation: banner-shimmer 6s ease infinite;
        }
      `}</style>
      
      {/* Flashing Live Tag */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/35 border border-white/20 text-white font-extrabold text-[10px] md:text-xs uppercase tracking-widest animate-pulse shadow-sm">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
        Few Slots Left
      </span>

      <span className="font-bold tracking-tight text-[11px] md:text-[13px]">
        Book now and get discount of <span className="text-yellow-300 font-black underline decoration-yellow-300/40 decoration-2">upto 60%</span>!
      </span>

      {/* Slots and Timer Widgets */}
      <div className="flex items-center gap-3.5 bg-black/25 border border-white/10 px-3 py-1 rounded-lg text-[10px] md:text-xs font-black shadow-inner">
        <div className="flex items-center gap-1">
          <span className="text-slate-300 uppercase tracking-widest text-[9px] font-bold">Slots:</span>
          <span className="text-red-400 font-black animate-pulse text-xs">{slotsLeft} remaining</span>
        </div>
        <div className="h-3 w-px bg-white/20" />
        <div className="flex items-center gap-1.5">
          <span className="text-slate-300 uppercase tracking-widest text-[9px] font-bold">Expires In:</span>
          <span className="text-yellow-300 font-mono tracking-wider font-extrabold text-xs">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <a 
        href="#courses"
        className="inline-flex items-center gap-1 px-3.5 py-1 rounded-md bg-white text-[#4F46E5] hover:bg-slate-100 hover:text-[#00C2FF] font-black text-[10px] md:text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-black/10"
      >
        <span>Book Now &rarr;</span>
      </a>
    </div>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('software');

  const courseData = {
    software: [
      { id: 1, title: "Full Stack Development", university: "MERN Stack & More", duration: "4 Months", format: "Online Interactive", bestseller: true },
      { id: 2, title: "Web Development", university: "Frontend & Backend", duration: "4 Months", format: "Online Interactive", bestseller: false },
      { id: 3, title: "Java Programming", university: "Core Java to Advanced", duration: "4 Months", format: "Weekend Live Classes", bestseller: false },
      { id: 4, title: "C++ Programming", university: "From Basics to Advanced", duration: "4 Months", format: "Self-paced + Live Labs", bestseller: false }
    ],
    data: [
      { id: 5, title: "Python Programming", university: "From Basics to Advanced", duration: "4 Months", format: "Online Interactive", bestseller: true },
      { id: 6, title: "SQL Database Masterclass", university: "Master Databases", duration: "4 Months", format: "Self-paced + Live Labs", bestseller: false },
      { id: 7, title: "Data Analysis", university: "Analyze Data, Drive Insights", duration: "4 Months", format: "Online Interactive", bestseller: true }
    ],
    ai: [
      { id: 8, title: "Cyber Security", university: "Secure Systems, Build Future", duration: "4 Months", format: "Live Workshops", bestseller: true },
      { id: 9, title: "Applied Generative AI & Prompt Engineering", university: "Silicon Valley Tech Academy", duration: "4 Months", format: "Live Workshops", bestseller: true }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0b1326] font-sans text-slate-200 selection:bg-brand-blue/20 selection:text-brand-blue">
      
      {/* Top Urgency Banner */}
      <TopUrgencyBanner />

      {/* Navigation (Dark Theme to match Logo background) */}
      <header className="bg-[#0b1326] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <a href="#hero" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
              <img
                src="/logo.png"
                alt="Brillnex Logo"
                className="h-14 w-14 object-contain group-hover:scale-105 transition-all duration-300"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-2xl md:text-3xl font-black tracking-widest text-white leading-none transition-colors group-hover:text-slate-200">
                  BRILLNE<span className="text-brand-blue transition-colors">X</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 opacity-90">
                  <div className="h-px w-3 md:w-4 bg-brand-blue transition-colors"></div>
                  <span className="text-[0.55rem] md:text-[0.6rem] font-bold tracking-[0.3em] text-gray-400 uppercase group-hover:text-gray-300 transition-colors">Technologies</span>
                  <div className="h-px w-3 md:w-4 bg-brand-blue transition-colors"></div>
                </div>
              </div>
            </a>

            {/* Desktop Nav with Sliding Tabs */}
            <nav className="hidden md:block">
              <NavHeader />
            </nav>

            {/* Desktop WhatsApp CTA */}
            <div className="hidden md:flex items-center">
              <a 
                href="https://wa.me/917204398855"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366] text-[#25D366] px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-[#25D366]/5"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.48 4.905 1.481 5.382 0 9.762-4.38 9.766-9.764.002-2.607-1.011-5.059-2.855-6.905C16.57 2.122 14.12 1.1 11.517 1.1c-5.385 0-9.765 4.38-9.769 9.764-.002 1.856.5 3.666 1.453 5.291L2.164 22l6.096-1.599c-1.54 1.055-1.574.966-.613.753z"/>
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0b1326] border-t border-white/10 px-4 pt-2 pb-6 space-y-2 absolute w-full shadow-2xl">
            <a href="#courses" className="block px-3 py-3 rounded-md text-base font-semibold text-gray-300 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>Courses</a>
            <a href="#what-we-offer" className="block px-3 py-3 rounded-md text-base font-semibold text-gray-300 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>What We Offer</a>
            <a href="#why-choose-us" className="block px-3 py-3 rounded-md text-base font-semibold text-gray-300 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>Why Choose Us</a>
            <a href="#outcomes" className="block px-3 py-3 rounded-md text-base font-semibold text-gray-300 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>Career Outcomes</a>
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <a 
                href="https://wa.me/917204398855"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366] text-[#25D366] py-3 rounded-xl font-bold transition-all shadow-md shadow-[#25D366]/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.48 4.905 1.481 5.382 0 9.762-4.38 9.766-9.764.002-2.607-1.011-5.059-2.855-6.905C16.57 2.122 14.12 1.1 11.517 1.1c-5.385 0-9.765 4.38-9.769 9.764-.002 1.856.5 3.666 1.453 5.291L2.164 22l6.096-1.599c-1.54 1.055-1.574.966-.613.753z"/>
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-[#0b1326] pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden relative border-b border-white/10 scroll-mt-20">
        {/* Animated Background Paths */}
        <div className="absolute inset-0 z-0 opacity-70">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="max-w-2xl relative z-10"
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: [ -20, 5, 0 ], opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  duration: 1.0, 
                  type: "spring", 
                  stiffness: 120, 
                  damping: 12
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan text-sm font-bold tracking-wide mb-6 cursor-default shadow-[0_0_15px_rgba(137,206,255,0.1)]"
              >
                <TrendingUp size={16} className="animate-pulse text-brand-cyan" /> We are Offically launched
              </motion.div>
              
              {/* Dynamic Animated Letters Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                {["Learn.", "Build.", "Succeed."].map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: wordIndex * 0.15 + letterIndex * 0.03,
                          type: "spring",
                          stiffness: 150,
                          damping: 25,
                        }}
                        className={`inline-block ${word === "Succeed." ? "text-brand-blue" : "text-white"}`}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-lg font-medium">
                Industry-ready tech education dedicated to delivering excellence with <strong>Real Projects</strong> & <strong>Real Skills</strong>.
              </p>
              
              {/* Call-to-Action Button inside Hero */}
              <div className="relative z-20">
                <a 
                  href="#courses" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4F46E5] to-[#89ceff] hover:from-[#89ceff] hover:to-[#4F46E5] text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-brand-blue/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap text-base"
                >
                  Explore Programs <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>

            {/* Hero Logo Visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Ambient glow behind logo */}
              <motion.div
                className="absolute w-80 h-80 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 70%)' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Secondary cyan glow ring */}
              <motion.div
                className="absolute w-96 h-96 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(0,194,255,0.4) 0%, rgba(0,194,255,0) 65%)' }}
                animate={{
                  scale: [1.1, 0.9, 1.1],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
              {/* Animated Container for Logo (Keeping ONLY the logo, beautifully floating with drop shadow and ambient glow) */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -12, 0],
                }}
                transition={{
                  opacity: { duration: 1, delay: 0.5 },
                  scale: { duration: 1, delay: 0.5, type: 'spring', stiffness: 100 },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
                }}
              >
                <img
                  src="/logo.png"
                  alt="Brillnex Technologies"
                  className="w-56 h-56 md:w-72 md:h-72 object-contain filter drop-shadow(0 20px 35px rgba(30,136,255,0.3)) hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Hiring Partners Marquee */}
      <section className="border-y border-white/5 bg-[#0b1326] py-8 overflow-hidden w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest">Brillnex Alumni Work At</p>
        </div>
        
        {/* Infinite Marquee Slider */}
        <div className="w-full overflow-hidden flex relative opacity-65 hover:opacity-100 transition-opacity duration-500 py-2">
          {/* Subtle gradient fading mask on left/right edges for premium tech look */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0b1326] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0b1326] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-logo-marquee flex gap-12 md:gap-20 items-center whitespace-nowrap">
            {companies.map((company, idx) => (
              <div 
                key={`logo-1-${idx}`} 
                className={`${company.className} select-none cursor-default text-slate-400 hover:text-brand-cyan hover:scale-105 transition-all duration-300`}
              >
                {company.name}
              </div>
            ))}
            {/* Secondary duplicate copy for infinite seamless loop */}
            {companies.map((company, idx) => (
              <div 
                key={`logo-2-${idx}`} 
                className={`${company.className} select-none cursor-default text-slate-400 hover:text-brand-cyan hover:scale-105 transition-all duration-300`}
              >
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section (From Instagram) */}
      <section id="what-we-offer" className="bg-[#0b1326] text-white py-20 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <span className="text-brand-cyan text-xs font-black uppercase tracking-widest block mb-3">WELCOME TO BRILLNEX TECHNOLOGIES</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-white">
            We Are Officially <span className="text-brand-cyan">Launched!</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-12 leading-relaxed font-medium">
            Brillnex Technologies is an online learning platform dedicated to delivering industry-ready tech education with <strong className="text-white font-black">Real Projects</strong> and <strong className="text-white font-black">Real Skills</strong>.
          </p>

          <div className="border-t border-white/10 pt-4 mb-10">
            <span className="bg-[#0b1326] px-6 text-sm font-black tracking-[0.2em] text-gray-500 uppercase">WHAT WE OFFER</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            {[
              { title: "ONLINE TECH COURSES", desc: "Expert Vetted Curriculums", icon: <BookOpen className="text-brand-cyan" size={28} /> },
              { title: "REAL PROJECTS & TRAINING", desc: "100% Hands-on Practice", icon: <Award className="text-brand-cyan" size={28} /> },
              { title: "INDUSTRY-READY SKILLS", desc: "Directly Marketable", icon: <TrendingUp className="text-brand-cyan" size={28} /> },
              { title: "EXPERT MENTORSHIP", desc: "1-on-1 Personal Advice", icon: <Users className="text-brand-cyan" size={28} /> },
              { title: "INTERNSHIP SUPPORT", desc: "Guaranteed Placement Paths", icon: <Briefcase className="text-brand-cyan" size={28} /> },
            ].map((item, idx) => (
              <div key={idx} className="group bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:border-brand-cyan/80 hover:scale-[1.08] hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white/[0.08] hover:to-brand-blue/[0.12] hover:shadow-[0_12px_40px_rgba(30,136,255,0.22)] cursor-default">
                <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4 border border-brand-blue/20 group-hover:scale-110 group-hover:border-brand-cyan/40 transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xs font-black tracking-wider text-white mb-2 uppercase group-hover:text-brand-cyan transition-colors duration-300">{item.title}</h4>
                <p className="text-[10px] text-gray-500 font-semibold group-hover:text-gray-400 transition-colors duration-300">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-3.5 w-3.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-cyan"></span>
              </span>
              <div className="text-left">
                <h5 className="font-extrabold text-sm text-brand-cyan uppercase tracking-widest leading-none">ADMISSIONS OPEN</h5>
                <p className="text-[10px] text-gray-400 font-semibold mt-1">Start your tech journey with us today!</p>
              </div>
            </div>
            <div className="h-px sm:h-8 w-full sm:w-px bg-white/10"></div>
            <a 
              href="https://wa.me/917204398855" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-cyan hover:to-brand-blue text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-brand-blue/20 hover:shadow-[0_8px_25px_rgba(30,136,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 border border-transparent"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.48 4.905 1.481 5.382 0 9.762-4.38 9.766-9.764.002-2.607-1.011-5.059-2.855-6.905C16.57 2.122 14.12 1.1 11.517 1.1c-5.385 0-9.765 4.38-9.769 9.764-.002 1.856.5 3.666 1.453 5.291L2.164 22l6.096-1.599c-1.54 1.055-1.574.966-.613.753z"/>
              </svg>
              <span>DM US / WHATSAPP</span>
            </a>
          </div>

        </div>
      </section>

      {/* Main Course Section */}
      <section id="courses" className="py-20 bg-[#0b1326] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Explore Top Programs</h2>
            <p className="text-lg text-slate-400">Choose from our industry-recognized courses designed to make you highly hirable in today's market.</p>
          </div>

          {/* Course Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {[
              { id: 'software', label: 'Software & Tech' },
              { id: 'data', label: 'Data & Analytics' },
              { id: 'ai', label: 'AI & Machine Learning' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-brand-blue text-white shadow-md' 
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
            courseData[activeTab].length === 4 ? 'lg:grid-cols-4' : 
            courseData[activeTab].length === 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' : 
            'lg:grid-cols-3'
          }`}>
            {courseData[activeTab].map((course) => (
              <div key={course.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] hover:-translate-y-[3px] hover:border-brand-blue/30 transition-all duration-300 flex flex-col h-full relative">
                
                {/* Popout Key Points Overlay */}
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-lg border border-white/10 opacity-0 pointer-events-none translate-y-6 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) rounded-2xl p-6 flex flex-col justify-between z-30 text-white shadow-2xl shadow-blue-500/20">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                      <div className="h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
                      <span className="text-brand-cyan text-xs font-black tracking-[0.2em] uppercase">Key Points</span>
                    </div>
                    {/* Title */}
                    <h4 className="text-md font-bold text-slate-100 mb-4 line-clamp-1">{course.title}</h4>
                    {/* List Items */}
                    <ul className="space-y-3 text-xs text-slate-300 font-medium">
                      <li className="flex items-start gap-2.5">
                        <Clock size={16} className="text-brand-cyan shrink-0 mt-0.5" />
                        <span>4 months program</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <PlayCircle size={16} className="text-brand-cyan shrink-0 mt-0.5" />
                        <span>Self paced learning with the recordings</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <BookOpen size={16} className="text-brand-cyan shrink-0 mt-0.5" />
                        <span>hands on project</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Briefcase size={16} className="text-brand-cyan shrink-0 mt-0.5" />
                        <span>Placement and internship support provided</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Award size={16} className="text-brand-cyan shrink-0 mt-0.5" />
                        <span>Certificate will be provided</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA & Pricing on the Popout */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex flex-col shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Offer Price</span>
                      <span className="text-lg font-black text-brand-cyan leading-none">₹7,500</span>
                    </div>
                    <a 
                      href={`https://wa.me/917204398855?text=${encodeURIComponent(`Hey BrillneX 👋\n\nI'm interested in the ${course.title} program and would like to know more about:\n• Course structure\n• Internship opportunities\n• Fees\n• Upcoming batches\n• Placement support\n\nPlease share the details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-cyan hover:to-brand-blue text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-brand-blue/30 active:scale-95 shrink-0"
                    >
                      <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                      <span>Talk to Mentor</span>
                    </a>
                  </div>
                </div>

                {/* Card Header area */}
                <div className="p-6 pb-5 border-b border-white/10 bg-transparent backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Award size={14} /> Certificate
                    </div>
                    {course.bestseller && (
                      <span className="bg-brand-cyan/10 text-brand-cyan text-[10px] uppercase font-black tracking-wider px-2 py-1 rounded">Bestseller</span>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-white leading-snug mb-2 group-hover:text-brand-cyan transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <GraduationCap size={16} /> {course.university}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 text-sm text-slate-300 font-medium">
                    <div className="flex items-center gap-2"><Clock size={16} className="text-slate-400"/> {course.duration}</div>
                    <div className="flex items-center gap-2"><BookOpen size={16} className="text-slate-400"/> {course.format}</div>
                    <div className="flex items-center gap-2 col-span-2"><Briefcase size={16} className="text-emerald-500"/> 100% Placement Support</div>
                  </div>

                  {/* Card Footer (Price & CTA) */}
                  <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex flex-col shrink-0">
                      <p className="text-[10px] text-slate-400 font-bold mb-0.5 uppercase tracking-wider">Starting at</p>
                      <div className="flex items-baseline gap-1.5">
                        {/* Original Strikethrough Price */}
                        <span className="text-xs font-semibold text-slate-500 line-through decoration-red-500/80 decoration-2">
                          ₹15,000
                        </span>
                        {/* Animated Offer Price */}
                        <motion.span 
                          className="text-xl font-black text-brand-cyan"
                          initial={{ scale: 0.95 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut"
                          }}
                        >
                          ₹7,500
                        </motion.span>
                      </div>
                      {/* Interactive urgent discount tag */}
                      <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md mt-0.5 w-fit border border-emerald-500/20 animate-pulse">
                        50% OFF TODAY
                      </span>
                    </div>
                    <HoverButton
                      as="a"
                      size="sm"
                      href={`https://wa.me/917204398855?text=${encodeURIComponent(`Hey BrillneX 👋\n\nI'm interested in the ${course.title} program and would like to know more about:\n• Course structure\n• Internship opportunities\n• Fees\n• Upcoming batches\n• Placement support\n\nPlease share the details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                      <span>Talk to Mentor</span>
                    </HoverButton>
                  </div>
                </div>
              </div>
            ))}
          </div>



        </div>
      </section>

      {/* Why Choose Brillnex Section */}
      <section id="why-choose-us" className="py-20 bg-[#0b1326] border-t border-white/10 scroll-mt-20 relative overflow-hidden">
        {/* Soft, premium ambient radial glows for sophisticated tech feel */}
        <div className="absolute inset-0 z-0 opacity-55 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-br from-[#4F46E5]/10 to-[#89ceff]/5 rounded-full blur-[110px]" />
          <div className="absolute bottom-0 left-1/4 w-[35rem] h-[35rem] bg-gradient-to-tr from-[#89ceff]/10 to-[#4F46E5]/5 rounded-full blur-[110px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-cyan text-xs font-black uppercase tracking-widest block mb-3">LEARN. BUILD. SUCCEED.</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Why Choose Brillnex?</h2>
            <p className="text-lg text-slate-400 font-medium">We don't just teach technology—we empower you to master it with hands-on experience and professional support.</p>
          </div>

          <div className="relative">
            <div className="relative z-10 grid grid-cols-6 gap-6">
              
              {/* Card 1: 100% Success & Career Placement */}
              <div className="relative col-span-full flex overflow-hidden lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/10 transition-all duration-500 group">
                <div className="relative m-auto size-fit pt-8 pb-6 px-6 flex flex-col items-center">
                  <div className="relative flex h-24 w-56 items-center justify-center">
                    <svg className="text-brand-blue/20 group-hover:text-brand-blue/30 transition-colors duration-500 absolute inset-0 size-full" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="mx-auto block w-fit text-5xl font-black text-red-600 drop-shadow-[0_2px_8px_rgba(220,38,38,0.2)] group-hover:scale-110 transition-transform duration-500">100%</span>
                  </div>
                  <h3 className="mt-8 text-center text-xl font-bold text-white">Placement Support</h3>
                  <p className="mt-2 text-center text-sm text-slate-400 leading-relaxed font-medium">Resume assistance, mock interviews, and direct referrals to hiring networks.</p>
                </div>
              </div>

              {/* Card 2: Real-World Projects */}
              <div className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/10 transition-all duration-500 group">
                <div className="pt-8 pb-6 px-6 flex flex-col items-center">
                  <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-white/10 bg-white/10 group-hover:scale-105 transition-transform duration-500 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/10">
                    <Briefcase className="m-auto size-14 text-brand-cyan group-hover:text-brand-blue transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">Real-World Projects</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">Work on production-ready systems, build secure applications, and deploy to modern cloud platforms.</p>
                  </div>
                </div>
              </div>

              {/* Card 3: 4-Month Bootcamps */}
              <div className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/10 transition-all duration-500 group">
                <div className="pt-8 pb-6 px-6 flex flex-col justify-between h-full gap-6">
                  <div className="pt-2 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full py-4 px-2 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden backdrop-blur-sm">
                      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
                      <div className="absolute top-1/2 left-4 w-[70%] h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan -translate-y-1/2 z-0 transition-all duration-500 group-hover:w-[90%]" />
                      
                      <div className="relative z-10 flex justify-between items-center w-full">
                        {[
                          { step: "M1", title: "Foundations", active: true },
                          { step: "M2", title: "Full Stack", active: true },
                          { step: "M3", title: "Scaling", active: true },
                          { step: "M4", title: "Hiring", active: false }
                        ].map((item, index) => (
                          <div key={index} className="flex flex-col items-center group/node">
                            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border ${
                              item.active 
                                ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent shadow-md shadow-blue-500/20 scale-110" 
                                : "bg-[#131b2e] text-slate-400 border-white/10 hover:border-white/20"
                            }`}>
                              {item.step}
                            </div>
                            <span className="text-[9px] font-bold text-slate-500 mt-2 tracking-tight group-hover/node:text-brand-blue transition-colors">{item.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">4-Month Bootcamps</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">Zero fluff. Master production-grade tech stacks in fully optimized, highly intense learning tracks.</p>
                  </div>
                </div>
              </div>

              {/* Card 4: Verified Credentials */}
              <div className="relative col-span-full overflow-hidden lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/10 transition-all duration-500 group">
                <div className="grid pt-8 pb-6 px-6 sm:grid-cols-2 gap-6 items-center">
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px] space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-white/10 bg-white/10 shadow-sm before:absolute before:-inset-2 before:rounded-full before:border before:border-white/10">
                      <Shield className="m-auto size-5 text-brand-cyan" strokeWidth={2} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">Verified Credentials</h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">Earn industry-recognized, shareable certificates that validate your practical engineering skills.</p>
                    </div>
                  </div>
                  <div className="rounded-tl-2xl border-l border-t border-white/10 bg-white/5 relative -mb-6 -mr-6 mt-6 h-fit p-6 py-6 sm:ml-6 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500">
                    <div className="absolute left-3 top-2 flex gap-1">
                      <span className="block size-2 rounded-full bg-white/10"></span>
                      <span className="block size-2 rounded-full bg-white/10"></span>
                      <span className="block size-2 rounded-full bg-white/10"></span>
                    </div>
                    <svg className="w-full sm:w-[150%] text-slate-700/40 group-hover:text-slate-600/50 transition-colors duration-500" viewBox="0 0 366 231" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.148438 231V179.394L1.92188 180.322L2.94482 177.73L4.05663 183.933L6.77197 178.991L7.42505 184.284L9.42944 187.985L11.1128 191.306V155.455L13.6438 153.03V145.122L14.2197 142.829V150.454V154.842L15.5923 160.829L17.0793 172.215H19.2031V158.182L20.7441 153.03L22.426 148.111V142.407L24.7471 146.86V128.414L26.7725 129.918V120.916L28.1492 118.521L28.4653 127.438L29.1801 123.822L31.0426 120.525V130.26L32.3559 134.71L34.406 145.122V137.548L35.8982 130.26L37.1871 126.049L38.6578 134.71L40.659 138.977V130.26V126.049L43.7557 130.26V123.822L45.972 112.407L47.3391 103.407V92.4726L49.2133 98.4651V106.053L52.5797 89.7556L54.4559 82.7747L56.1181 87.9656L58.9383 89.7556V98.4651L60.7617 103.407L62.0545 123.822L63.8789 118.066L65.631 122.082L68.5479 114.229L70.299 109.729L71.8899 118.066L73.5785 123.822V130.26L74.9446 134.861L76.9243 127.87L78.352 134.71V138.977L80.0787 142.407V152.613L83.0415 142.407V130.26L86.791 123.822L89.0121 116.645V122.082L90.6059 127.87L92.3541 131.77L93.7104 123.822L95.4635 118.066L96.7553 122.082V137.548L99.7094 140.988V131.77L101.711 120.525L103.036 116.645V133.348L104.893 136.218L106.951 140.988L108.933 134.71L110.797 130.26L112.856 140.988V148.111L115.711 152.613L117.941 145.122L119.999 140.988V148.111L123.4 152.613L125.401 158.182L130.547 150.454V156.566L131.578 155.455L134.143 158.182L135.594 168.136L138.329 158.182L140.612 160.829L144.681 169.5L147.011 155.455L148.478 151.787L151.02 152.613L154.886 145.122L158 143.412L159.406 140.637L159.496 133.348L162.295 127.87V122.082L163.855 116.645V109.729L164.83 104.407L166.894 109.729L176.249 98.4651L178.254 106.169L180.77 98.4651V81.045L182.906 69.1641L184.8 56.8669L186.477 62.8428L187.848 79.7483L188.849 106.169L191.351 79.7483L193.485 75.645V98.4651L196.622 94.4523L198.623 87.4228V79.7483L200.717 75.645L202.276 81.045V89.3966L203.638 113.023L205.334 99.8037L207.164 94.4523L208.982 98.4651V102.176L211.267 107.64L212.788 81.045L214.437 66.0083L216.19 62.8428L217.941 56.8669V73.676V79.7483L220.28 75.645L222.516 66.0083V73.676H226.174V84.8662L228.566 98.4651L230.316 75.645L233.61 94.4523V104.25L236.882 102.176L239.543 113.023L241.057 98.4651L243.604 94.4523L244.975 106.169L245.975 87.4228L247.272 89.3966L250.732 84.8662L251.733 96.7549L254.644 94.4523L257.452 99.8037L259.853 91.3111L261.193 84.8662L264.162 75.645L265.808 87.4228L267.247 58.4895L269.757 66.0083L276.625 13.5146L273.33 58.4895L276.25 67.6563L282.377 20.1968L281.37 58.4895V66.0083L283.579 75.645L286.033 56.8669L287.436 73.676L290.628 77.6636L292.414 84.8662L294.214 61.3904L296.215 18.9623L300.826 0.947876L297.531 56.8669L299.973 62.8428L305.548 22.0598L299.755 114.956L301.907 105.378L304.192 112.688V94.9932L308.009 80.0829L310.003 94.9932L311.004 102.127L312.386 105.378L315.007 112.688L316.853 98.004L318.895 105.378L321.257 94.9932L324.349 100.81L325.032 80.0829L327.604 61.5733L329.308 82.3223L333.525 52.7986L334.097 52.145L334.735 55.6812L337.369 59.8108V73.676L340.743 87.9656L343.843 96.3728L348.594 82.7747L349.607 81.045L351 89.7556L352.611 96.3728L355.149 94.9932L356.688 102.176L359.396 108.784L360.684 111.757L365 95.7607V231H148.478H0.148438Z"
                        fill="url(#paint0_linear_0_705)"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 5: 1-on-1 Mentorship */}
              <div className="relative col-span-full overflow-hidden lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/10 transition-all duration-500 group">
                <div className="grid pt-8 pb-6 px-6 sm:grid-cols-2 gap-6 items-center">
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px] space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-white/10 bg-white/10 shadow-sm before:absolute before:-inset-2 before:rounded-full before:border before:border-white/10">
                      <Users className="m-auto size-5 text-brand-cyan" strokeWidth={2} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">1-on-1 Mentorship</h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">Get personalized code reviews, weekly 1-on-1 strategy sessions, and real-time support from active tech professionals.</p>
                    </div>
                  </div>
                  <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-white/10 sm:-my-6 sm:-mr-6 group-hover:scale-105 transition-transform duration-500">
                    <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                      <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                        <span className="block h-fit rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs font-bold text-slate-300 shadow-sm">Siddharth (Mentor)</span>
                        <div className="ring-white size-8 ring-4 rounded-full overflow-hidden shadow-md">
                          <img className="size-full object-cover" src="https://avatars.githubusercontent.com/u/102558960?v=4" alt="Mentor" />
                        </div>
                      </div>
                      <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                        <div className="ring-white size-10 ring-4 rounded-full overflow-hidden shadow-md">
                          <img className="size-full object-cover" src="https://avatars.githubusercontent.com/u/47919550?v=4" alt="Learner" />
                        </div>
                        <span className="block h-fit rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs font-bold text-slate-300 shadow-sm">Rohan (Learner)</span>
                      </div>
                      <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                        <span className="block h-fit rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs font-bold text-slate-300 shadow-sm">Aisha (Mentor)</span>
                        <div className="ring-white size-8 ring-4 rounded-full overflow-hidden shadow-md">
                          <img className="size-full object-cover" src="https://avatars.githubusercontent.com/u/31113941?v=4" alt="Mentor" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Dark Theme Section: Outcomes */}
      <section id="outcomes" className="bg-[#0b1326] py-24 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-blue rounded-full blur-[120px] opacity-10"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-brand-cyan rounded-full blur-[120px] opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Real Outcomes. <br/><span className="text-brand-cyan">Real Career Impact.</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Our graduates don't just learn; they get hired. With our dedicated placement cell and industry-aligned curriculum, transitioning your career is a structured process, not a gamble.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Dedicated career coach for every learner",
                  "Resume building and mock interview sessions",
                  "Direct referrals to our 50+ hiring partners"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 font-medium">
                    <CheckCircle size={24} className="text-brand-cyan flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Outcome Stat Cards */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-brand-blue/30 transition-all duration-300 group">
                <Users size={32} className="text-brand-cyan mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-4xl font-black text-white mb-2">
                  <AnimatedCounter end={70} suffix="+" />
                </div>
                <div className="text-sm font-semibold text-slate-400">Learners Placed</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-brand-blue/30 transition-all duration-300 group">
                <Clock size={32} className="text-brand-cyan mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-4xl font-black text-white mb-2">
                  <AnimatedCounter end={765} suffix="+" />
                </div>
                <div className="text-sm font-semibold text-slate-400">Hours Students Learned</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cinematic Footer */}
      <CinematicFooter />
    </div>
  );
}
