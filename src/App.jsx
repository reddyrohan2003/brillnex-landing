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
            stroke="#1E88FF"
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
      className="absolute z-0 top-1 bottom-1 rounded-full bg-gradient-to-r from-[#1E88FF] to-[#00C2FF] shadow-lg shadow-brand-blue/20"
    />
  );
};

const companies = [
  { name: "Microsoft", className: "font-serif text-slate-800 font-black text-xl" },
  { name: "Postman", className: "font-sans text-orange-500 font-extrabold tracking-tight text-xl" },
  { name: "amazon", className: "tracking-tight text-orange-500 font-bold text-xl" },
  { name: "Zerodha", className: "font-sans text-blue-600 font-black tracking-tight text-xl" },
  { name: "Google", className: "italic text-slate-900 font-bold text-xl" },
  { name: "Groww", className: "font-sans text-emerald-500 font-black tracking-tight text-xl" },
  { name: "Razorpay", className: "text-blue-600 font-extrabold italic text-xl" },
  { name: "inVideo", className: "font-mono text-indigo-500 font-extrabold tracking-wide text-xl" },
  { name: "zepto", className: "text-purple-600 font-black italic text-xl" },
  { name: "Simpl", className: "font-sans text-emerald-400 font-black italic text-xl" },
  { name: "CRED", className: "font-mono text-slate-900 font-bold tracking-[0.2em] text-lg" },
  { name: "dunzo", className: "font-mono text-green-600 font-black tracking-widest uppercase text-lg" },
  { name: "Hasura", className: "font-sans text-slate-900 font-bold tracking-tight text-xl" },
  { name: "zomato", className: "font-serif text-red-600 font-black text-xl" },
  { name: "Ola", className: "font-sans text-slate-800 font-black uppercase tracking-wider text-xl" },
  { name: "meesho", className: "font-serif text-pink-600 font-black italic text-xl" }
];

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
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-gray-900 selection:bg-brand-blue/20 selection:text-brand-blue">
      
      {/* Top Notification Bar */}
      <div className="bg-brand-blue text-white text-xs font-medium py-2 px-4 text-center tracking-wide">
        New Batches Starting Soon. <span className="text-white/90 font-bold ml-1 cursor-pointer hover:underline">Claim your Early Bird Scholarship &rarr;</span>
      </div>

      {/* Navigation (Dark Theme to match Logo background) */}
      <header className="bg-[#050816] border-b border-white/10 sticky top-0 z-50">
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
          <div className="md:hidden bg-[#050816] border-t border-white/10 px-4 pt-2 pb-6 space-y-2 absolute w-full shadow-2xl">
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
      <section id="hero" className="bg-gradient-to-b from-[#EBF2FF] to-[#DEE9FC] pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden relative border-b border-gray-200 scroll-mt-20">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-bold tracking-wide mb-6">
                <TrendingUp size={16} /> We Are Officially Launched!
              </div>
              
              {/* Dynamic Animated Letters Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1220] tracking-tight leading-[1.1] mb-6">
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
                        className={`inline-block ${word === "Succeed." ? "text-brand-blue" : "text-[#0B1220]"}`}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg font-medium">
                Industry-ready tech education dedicated to delivering excellence with <strong>Real Projects</strong> & <strong>Real Skills</strong>.
              </p>
              
              {/* High-Conversion Form inside Hero */}
              <div className="bg-white/80 backdrop-blur-md border border-[rgba(30,136,255,0.2)] p-2 rounded-xl shadow-[0_8px_30px_rgba(30,136,255,0.08)] flex flex-col sm:flex-row gap-2 max-w-lg relative z-20">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search courses (e.g. AI, DevOps)" 
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/40 border-transparent focus:bg-white/60 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-slate-900 placeholder-gray-500"
                  />
                </div>
                <button className="bg-gradient-to-r from-[#1E88FF] to-[#00C2FF] hover:from-[#00C2FF] hover:to-[#1E88FF] text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-brand-blue/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap">
                  Explore Programs
                </button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-brand-blue" /> EMI Options Available</div>
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-brand-blue" /> 1-on-1 Mentorship</div>
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
      <section className="border-y border-gray-200/50 bg-[#E2E8F0]/30 py-8 backdrop-blur-sm overflow-hidden w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest">Brillnex Alumni Work At</p>
        </div>
        
        {/* Infinite Marquee Slider */}
        <div className="w-full overflow-hidden flex relative opacity-65 hover:opacity-100 transition-opacity duration-500 py-2">
          {/* Subtle gradient fading mask on left/right edges for premium tech look */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F1F5F9] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F1F5F9] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-logo-marquee flex gap-12 md:gap-20 items-center whitespace-nowrap">
            {companies.map((company, idx) => (
              <div key={`logo-1-${idx}`} className={`${company.className} select-none cursor-default hover:scale-105 transition-transform duration-300 filter grayscale hover:grayscale-0`}>
                {company.name}
              </div>
            ))}
            {/* Secondary duplicate copy for infinite seamless loop */}
            {companies.map((company, idx) => (
              <div key={`logo-2-${idx}`} className={`${company.className} select-none cursor-default hover:scale-105 transition-transform duration-300 filter grayscale hover:grayscale-0`}>
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section (From Instagram) */}
      <section id="what-we-offer" className="bg-[#050816] text-white py-20 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <span className="text-brand-cyan text-xs font-black uppercase tracking-widest block mb-3">WELCOME TO BRILLNEX TECHNOLOGIES</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-white">
            We Are Officially <span className="text-brand-cyan">Launched!</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-12 leading-relaxed font-medium">
            Brillnex Technologies is an online learning platform dedicated to delivering industry-ready tech education with <strong className="text-white font-black">Real Projects</strong> and <strong className="text-white font-black">Real Skills</strong>.
          </p>

          <div className="border-t border-white/10 pt-4 mb-10">
            <span className="bg-[#050816] px-6 text-sm font-black tracking-[0.2em] text-gray-500 uppercase">WHAT WE OFFER</span>
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
      <section id="courses" className="py-20 bg-[#F3F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Explore Top Programs</h2>
            <p className="text-lg text-gray-600">Choose from our industry-recognized courses designed to make you highly hirable in today's market.</p>
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
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white/50 text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-white/80 backdrop-blur-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData[activeTab].map((course) => (
              <div key={course.id} className="group bg-white/70 backdrop-blur-md border border-white/90 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(30,136,255,0.12)] hover:-translate-y-[3px] hover:border-brand-blue/30 transition-all duration-300 flex flex-col h-full relative">
                
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
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Offer Price</span>
                      <span className="text-xl font-black text-brand-cyan">₹7,500</span>
                    </div>
                    <a 
                      href={`https://wa.me/917204398855?text=${encodeURIComponent(`Hey BrillneX 👋\n\nI'm interested in the ${course.title} program and would like to know more about:\n• Course structure\n• Internship opportunities\n• Fees\n• Upcoming batches\n• Placement support\n\nPlease share the details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-cyan hover:to-brand-blue text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-brand-blue/30 active:scale-95"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Talk to Mentor</span>
                    </a>
                  </div>
                </div>

                {/* Card Header area */}
                <div className="p-6 pb-5 border-b border-gray-100 bg-white/40 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Award size={14} /> Certificate
                    </div>
                    {course.bestseller && (
                      <span className="bg-brand-cyan/10 text-brand-cyan text-[10px] uppercase font-black tracking-wider px-2 py-1 rounded">Bestseller</span>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <GraduationCap size={16} /> {course.university}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 text-sm text-gray-600 font-medium">
                    <div className="flex items-center gap-2"><Clock size={16} className="text-gray-400"/> {course.duration}</div>
                    <div className="flex items-center gap-2"><BookOpen size={16} className="text-gray-400"/> {course.format}</div>
                    <div className="flex items-center gap-2 col-span-2"><Briefcase size={16} className="text-emerald-500"/> 100% Placement Support</div>
                  </div>

                  {/* Card Footer (Price & CTA) */}
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">Starting at</p>
                      <div className="flex items-baseline gap-2">
                        {/* Original Strikethrough Price */}
                        <span className="text-sm font-semibold text-gray-400 line-through decoration-red-500/80 decoration-2">
                          ₹15,000
                        </span>
                        {/* Animated Offer Price */}
                        <motion.span 
                          className="text-2xl font-black text-brand-blue"
                          initial={{ scale: 0.95 }}
                          animate={{ scale: [1, 1.06, 1] }}
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
                      <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 w-fit border border-emerald-100 animate-pulse">
                        50% OFF TODAY
                      </span>
                    </div>
                    <HoverButton
                      as="a"
                      href={`https://wa.me/917204398855?text=${encodeURIComponent(`Hey BrillneX 👋\n\nI'm interested in the ${course.title} program and would like to know more about:\n• Course structure\n• Internship opportunities\n• Fees\n• Upcoming batches\n• Placement support\n\nPlease share the details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Talk to Mentor
                    </HoverButton>
                  </div>
                </div>
              </div>
            ))}
          </div>



        </div>
      </section>

      {/* Why Choose Brillnex Section */}
      <section id="why-choose-us" className="py-20 bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EBF2FF] border-t border-gray-200/40 scroll-mt-20 relative overflow-hidden">
        {/* Soft, premium ambient radial glows for sophisticated tech feel */}
        <div className="absolute inset-0 z-0 opacity-55 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-br from-[#1E88FF]/10 to-[#00C2FF]/5 rounded-full blur-[110px]" />
          <div className="absolute bottom-0 left-1/4 w-[35rem] h-[35rem] bg-gradient-to-tr from-[#00C2FF]/10 to-[#1E88FF]/5 rounded-full blur-[110px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-blue text-xs font-black uppercase tracking-widest block mb-3">LEARN. BUILD. SUCCEED.</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Why Choose Brillnex?</h2>
            <p className="text-lg text-gray-600 font-medium">We don't just teach technology—we empower you to master it with hands-on experience and professional support.</p>
          </div>

          <div className="relative">
            <div className="relative z-10 grid grid-cols-6 gap-6">
              
              {/* Card 1: 100% Success & Career Placement */}
              <div className="relative col-span-full flex overflow-hidden lg:col-span-2 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/60 transition-all duration-500 group">
                <div className="relative m-auto size-fit pt-8 pb-6 px-6 flex flex-col items-center">
                  <div className="relative flex h-24 w-56 items-center justify-center">
                    <svg className="text-slate-200 group-hover:text-brand-blue/15 transition-colors duration-500 absolute inset-0 size-full" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="mx-auto block w-fit text-5xl font-black bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">100%</span>
                  </div>
                  <h3 className="mt-8 text-center text-xl font-bold text-slate-900">Placement Support</h3>
                  <p className="mt-2 text-center text-sm text-gray-600 leading-relaxed font-medium">Resume assistance, mock interviews, and direct referrals to hiring networks.</p>
                </div>
              </div>

              {/* Card 2: Real-World Coding */}
              <div className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/60 transition-all duration-500 group">
                <div className="pt-8 pb-6 px-6 flex flex-col items-center">
                  <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-gray-200/50 bg-white/20 group-hover:scale-105 transition-transform duration-500 before:absolute before:-inset-2 before:rounded-full before:border before:border-gray-200/30">
                    <svg className="m-auto h-fit w-24" viewBox="0 0 212 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        className="text-slate-300 dark:text-zinc-600"
                        d="M44.0209 55.3542C43.1945 54.7639 42.6916 54.0272 42.5121 53.1442C42.3327 52.2611 42.5995 51.345 43.3125 50.3958C50.632 40.3611 59.812 32.5694 70.8525 27.0208C81.8931 21.4722 93.668 18.6979 106.177 18.6979C118.691 18.6979 130.497 21.3849 141.594 26.7587C152.691 32.1326 161.958 39.8936 169.396 50.0417C170.222 51.1042 170.489 52.0486 170.196 52.875C169.904 53.7014 169.401 54.4097 168.688 55C167.979 55.5903 167.153 55.8571 166.208 55.8004C165.264 55.7437 164.438 55.2408 163.729 54.2917C157.236 45.0833 148.885 38.0307 138.675 33.1337C128.466 28.2368 117.633 25.786 106.177 25.7812C94.7257 25.7812 83.9827 28.2321 73.948 33.1337C63.9132 38.0354 55.5903 45.0881 48.9792 54.2917C48.2709 55.3542 47.4445 55.9444 46.5 56.0625C45.5556 56.1806 44.7292 55.9444 44.0209 55.3542ZM126.188 142.656C113.91 139.587 103.875 133.476 96.0834 124.325C88.2917 115.173 84.3959 103.988 84.3959 90.7708C84.3959 84.8681 86.5209 79.9097 90.7709 75.8958C95.0209 71.8819 100.156 69.875 106.177 69.875C112.198 69.875 117.333 71.8819 121.583 75.8958C125.833 79.9097 127.958 84.8681 127.958 90.7708C127.958 94.6667 129.434 97.9439 132.385 100.602C135.337 103.261 138.819 104.583 142.833 104.583C146.847 104.583 150.271 103.256 153.104 100.602C155.938 97.9486 157.354 94.6714 157.354 90.7708C157.354 77.0764 152.337 65.566 142.302 56.2396C132.267 46.9132 120.285 42.25 106.354 42.25C92.4237 42.25 80.441 46.9132 70.4063 56.2396C60.3716 65.566 55.3542 77.0174 55.3542 90.5937C55.3542 93.4271 55.621 96.9687 56.1546 101.219C56.6882 105.469 57.9562 110.427 59.9584 116.094C60.3125 117.156 60.2842 118.101 59.8734 118.927C59.4625 119.753 58.7825 120.344 57.8334 120.698C56.8889 121.052 55.9752 121.024 55.0921 120.613C54.2091 120.202 53.5881 119.522 53.2292 118.573C51.4584 113.969 50.1905 109.395 49.4255 104.853C48.6605 100.31 48.2756 95.6158 48.2709 90.7708C48.2709 75.0694 53.9682 61.9062 65.363 51.2812C76.7577 40.6562 90.3624 35.3437 106.177 35.3437C122.115 35.3437 135.809 40.6562 147.26 51.2812C158.712 61.9062 164.438 75.0694 164.438 90.7708C164.438 96.6736 162.343 101.601 158.155 105.554C153.966 109.506 148.859 111.485 142.833 111.49C136.813 111.49 131.649 109.513 127.342 105.561C123.035 101.608 120.88 96.6783 120.875 90.7708C120.875 86.875 119.43 83.5978 116.54 80.9392C113.65 78.2805 110.196 76.9536 106.177 76.9583C102.163 76.9583 98.7089 78.2876 95.8142 80.9462C92.9195 83.6049 91.4745 86.8797 91.4792 90.7708C91.4792 102.222 94.8745 111.785 101.665 119.458C108.456 127.132 117.22 132.503 127.958 135.573C129.021 135.927 129.729 136.517 130.083 137.344C130.438 138.17 130.497 139.056 130.26 140C130.024 140.826 129.552 141.535 128.844 142.125C128.135 142.715 127.25 142.892 126.188 142.656ZM67.0417 18.3437C66.0973 18.934 65.1528 19.0828 64.2084 18.79C63.2639 18.4972 62.5556 17.8762 62.0834 16.9271C61.6112 15.9826 61.4931 15.1279 61.7292 14.3629C61.9653 13.5979 62.5556 12.9179 63.5 12.3229C70.1112 8.78125 77.0174 6.06597 84.2188 4.17708C91.4202 2.28819 98.7396 1.34375 106.177 1.34375C113.733 1.34375 121.111 2.25986 128.313 4.09208C135.514 5.92431 142.479 8.54986 149.208 11.9687C150.271 12.559 150.892 13.2674 151.071 14.0937C151.251 14.9201 151.161 15.7465 150.802 16.5729C150.448 17.3993 149.858 18.0486 149.031 18.5208C148.205 18.9931 147.201 18.934 146.021 18.3437C139.764 15.1563 133.299 12.7078 126.627 10.9983C119.954 9.28889 113.138 8.43181 106.177 8.42708C99.3299 8.42708 92.6007 9.22514 85.9896 10.8212C79.3785 12.4174 73.0625 14.9249 67.0417 18.3437ZM87.9375 140.177C80.9723 132.858 75.6314 125.392 71.915 117.78C68.1987 110.167 66.3381 101.164 66.3334 90.7708C66.3334 80.0278 70.2292 70.9658 78.0209 63.585C85.8125 56.2042 95.198 52.5161 106.177 52.5208C117.156 52.5208 126.601 56.2112 134.51 63.5921C142.42 70.9729 146.375 80.0325 146.375 90.7708C146.375 91.8333 146.052 92.6904 145.405 93.3421C144.758 93.9937 143.901 94.3172 142.833 94.3125C141.889 94.3125 141.063 93.989 140.354 93.3421C139.646 92.6951 139.292 91.8381 139.292 90.7708C139.292 81.9167 136.014 74.5099 129.46 68.5504C122.906 62.591 115.145 59.6089 106.177 59.6042C97.2049 59.6042 89.503 62.5862 83.0713 68.5504C76.6396 74.5146 73.4214 81.9214 73.4167 90.7708C73.4167 100.333 75.0695 108.451 78.375 115.123C81.6806 121.796 86.5209 128.494 92.8959 135.219C93.6042 135.927 93.9584 136.753 93.9584 137.698C93.9584 138.642 93.6042 139.469 92.8959 140.177C92.1875 140.885 91.3612 141.24 90.4167 141.24C89.4723 141.24 88.6459 140.885 87.9375 140.177ZM141.417 128.135C130.91 128.135 121.789 124.594 114.054 117.51C106.319 110.427 102.454 101.514 102.458 90.7708C102.458 89.8264 102.784 89 103.436 88.2917C104.088 87.5833 104.942 87.2292 106 87.2292C107.063 87.2292 107.92 87.5833 108.571 88.2917C109.223 89 109.546 89.8264 109.542 90.7708C109.542 99.625 112.729 106.885 119.104 112.552C125.479 118.219 132.917 121.052 141.417 121.052C142.125 121.052 143.129 120.993 144.427 120.875C145.726 120.757 147.083 120.58 148.5 120.344C149.563 120.108 150.479 120.256 151.248 120.79C152.018 121.324 152.519 122.119 152.75 123.177C152.986 124.122 152.809 124.948 152.219 125.656C151.629 126.365 150.861 126.837 149.917 127.073C147.792 127.663 145.934 127.989 144.342 128.05C142.751 128.112 141.776 128.14 141.417 128.135Z"
                        fill="url(#paint0_linear_0_1)"
                      />
                      <g clipPath="url(#clip0_0_1)">
                        <path
                          d="M44.0209 55.3542C43.1945 54.7639 42.6916 54.0272 42.5121 53.1442C42.3327 52.2611 42.5995 51.345 43.3125 50.3958C50.632 40.3611 59.812 32.5694 70.8525 27.0208C81.8931 21.4722 93.668 18.6979 106.177 18.6979C118.691 18.6979 130.497 21.3849 141.594 26.7587C152.691 32.1326 161.958 39.8936 169.396 50.0417C170.222 51.1042 170.489 52.0486 170.196 52.875C169.904 53.7014 169.401 54.4097 168.688 55C167.979 55.5903 167.153 55.8571 166.208 55.8004C165.264 55.7437 164.438 55.2408 163.729 54.2917C157.236 45.0833 148.885 38.0307 138.675 33.1337C128.466 28.2368 117.633 25.786 106.177 25.7812C94.7257 25.7812 83.9827 28.2321 73.948 33.1337C63.9132 38.0354 55.5903 45.0881 48.9792 54.2917C48.2709 55.3542 47.4445 55.9444 46.5 56.0625C45.5556 56.1806 44.7292 55.9444 44.0209 55.3542ZM126.188 142.656C113.91 139.587 103.875 133.476 96.0834 124.325C88.2917 115.173 84.3959 103.988 84.3959 90.7708C84.3959 84.8681 86.5209 79.9097 90.7709 75.8958C95.0209 71.8819 100.156 69.875 106.177 69.875C112.198 69.875 117.333 71.8819 121.583 75.8958C125.833 79.9097 127.958 84.8681 127.958 90.7708C127.958 94.6667 129.434 97.9439 132.385 100.602C135.337 103.261 138.819 104.588 142.833 104.583C146.847 104.583 150.271 103.256 153.104 100.602C155.938 97.9486 157.354 94.6714 157.354 90.7708C157.354 77.0764 152.337 65.566 142.302 56.2396C132.267 46.9132 120.285 42.25 106.354 42.25C92.4237 42.25 80.441 46.9132 70.4063 56.2396C60.3716 65.566 55.3542 77.0174 55.3542 90.5937C55.3542 93.4271 55.621 96.9687 56.1546 101.219C56.6882 105.469 57.9562 110.427 59.9584 116.094C60.3125 117.156 60.2842 118.101 59.8734 118.927C59.4625 119.753 58.7825 120.344 57.8334 120.698C56.8889 121.052 55.9752 121.024 55.0921 120.613C54.2091 120.202 53.5881 119.522 53.2292 118.573C51.4584 113.969 50.1905 109.395 49.4255 104.853C48.6605 100.31 48.2756 95.6158 48.2709 90.7708C48.2709 75.0694 53.9682 61.9062 65.363 51.2812C76.7577 40.6562 90.3624 35.3437 106.177 35.3437C122.115 35.3437 135.809 40.6562 147.26 51.2812C158.712 61.9062 164.438 75.0694 164.438 90.7708C164.438 96.6736 162.343 101.601 158.155 105.554C153.966 109.506 148.859 111.485 142.833 111.49C136.813 111.49 131.649 109.513 127.342 105.561C123.035 101.608 120.88 96.6783 120.875 90.7708C120.875 86.875 119.43 83.5978 116.54 80.9392C113.65 78.2805 110.196 76.9536 106.177 76.9583C102.163 76.9583 98.7089 78.2876 95.8142 80.9462C92.9195 83.6049 91.4745 86.8797 91.4792 90.7708C91.4792 102.222 94.8745 111.785 101.665 119.458C108.456 127.132 117.22 132.503 127.958 135.573C129.021 135.927 129.729 136.517 130.083 137.344C130.438 138.17 130.497 139.056 130.26 140C130.024 140.826 129.552 141.535 128.844 142.125C128.135 142.715 127.25 142.892 126.188 142.656ZM67.0417 18.3437C66.0973 18.934 65.1528 19.0828 64.2084 18.79C63.2639 18.4972 62.5556 17.8762 62.0834 16.9271C61.6112 15.9826 61.4931 15.1279 61.7292 14.3629C61.9653 13.5979 62.5556 12.9179 63.5 12.3229C70.1112 8.78125 77.0174 6.06597 84.2188 4.17708C91.4202 2.28819 98.7396 1.34375 106.177 1.34375C113.733 1.34375 121.111 2.25986 128.313 4.09208C135.514 5.92431 142.479 8.54986 149.208 11.9687C150.271 12.559 150.892 13.2674 151.071 14.0937C151.251 14.9201 151.161 15.7465 150.802 16.5729C150.448 17.3993 149.858 18.0486 149.031 18.5208C148.205 18.9931 147.201 18.934 146.021 18.3437C139.764 15.1563 133.299 12.7078 126.627 10.9983C119.954 9.28889 113.138 8.43181 106.177 8.42708C99.3299 8.42708 92.6007 9.22514 85.9896 10.8212C79.3785 12.4174 73.0625 14.9249 67.0417 18.3437ZM87.9375 140.177C80.9723 132.858 75.6314 125.392 71.915 117.78C68.1987 110.167 66.3381 101.164 66.3334 90.7708C66.3334 80.0278 70.2292 70.9658 78.0209 63.585C85.8125 56.2042 95.198 52.5161 106.177 52.5208C117.156 52.5208 126.601 56.2112 134.51 63.5921C142.42 70.9729 146.375 80.0325 146.375 90.7708C146.375 91.8333 146.052 92.6904 145.405 93.3421C144.758 93.9937 143.901 94.3172 142.833 94.3125C141.889 94.3125 141.063 93.989 140.354 93.3421C139.646 92.6951 139.292 91.8381 139.292 90.7708C139.292 81.9167 136.014 74.5099 129.46 68.5504C122.906 62.591 115.145 59.6089 106.177 59.6042C97.2049 59.6042 89.503 62.5862 83.0713 68.5504C76.6396 74.5146 73.4214 81.9214 73.4167 90.7708C73.4167 100.333 75.0695 108.451 78.375 115.123C81.6806 121.796 86.5209 128.494 92.8959 135.219C93.6042 135.927 93.9584 136.753 93.9584 137.698C93.9584 138.642 93.6042 139.469 92.8959 140.177C92.1875 140.885 91.3612 141.24 90.4167 141.24C89.4723 141.24 88.6459 140.885 87.9375 140.177ZM141.417 128.135C130.91 128.135 121.789 124.594 114.054 117.51C106.319 110.427 102.454 101.514 102.458 90.7708C102.458 89.8264 102.784 89 103.436 88.2917C104.088 87.5833 104.942 87.2292 106 87.2292C107.063 87.2292 107.92 87.5833 108.571 88.2917C109.223 89 109.546 89.8264 109.542 90.7708C109.542 99.625 112.729 106.885 119.104 112.552C125.479 118.219 132.917 121.052 141.417 121.052C142.125 121.052 143.129 120.993 144.427 120.875C145.726 120.757 147.083 120.58 148.5 120.344C149.563 120.108 150.479 120.256 151.248 120.79C152.018 121.324 152.519 122.119 152.75 123.177C152.986 124.122 152.809 124.948 152.219 125.656C151.629 126.365 150.861 126.837 149.917 127.073C147.792 127.663 145.934 127.989 144.342 128.05C142.751 128.112 141.776 128.14 141.417 128.135Z"
                          fill="url(#paint0_linear_0_1)"
                        />
                      </g>
                      <path className="text-brand-blue" d="M3 72H209" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="paint0_linear_0_1" x1="106.385" y1="1.34375" x2="106" y2="72" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white" stopOpacity="0" />
                          <stop className="text-brand-blue" offset="1" stopColor="currentColor" />
                        </linearGradient>
                        <clipPath id="clip0_0_1">
                          <rect width="129" height="72" fill="white" transform="translate(41)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">Real-World Coding</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">Work on production-ready systems, build secure applications, and deploy to modern cloud platforms.</p>
                  </div>
                </div>
              </div>

              {/* Card 3: 4-Month Bootcamps */}
              <div className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/60 transition-all duration-500 group">
                <div className="pt-8 pb-6 px-6 flex flex-col justify-between h-full">
                  <div className="pt-2 group-hover:scale-105 transition-transform duration-500">
                    <svg className="text-slate-400 w-full" viewBox="0 0 386 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="386" height="123" rx="10" />
                      <g clipPath="url(#clip0_0_106)">
                        <circle className="text-slate-300 dark:text-muted" cx="29" cy="29" r="15" fill="currentColor" />
                        <path d="M29 23V35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M35 29L29 35L23 29" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M55.2373 32H58.7988C61.7383 32 63.4404 30.1816 63.4404 27.0508V27.0371C63.4404 23.9404 61.7246 22.1357 58.7988 22.1357H55.2373V32ZM56.7686 30.6807V23.4551H58.6279C60.6719 23.4551 61.8818 24.7881 61.8818 27.0576V27.0713C61.8818 29.3613 60.6924 30.6807 58.6279 30.6807H56.7686ZM69.4922 32.1436C71.666 32.1436 72.999 30.6875 72.999 28.2949V28.2812C72.999 25.8887 71.6592 24.4326 69.4922 24.4326C67.3184 24.4326 65.9785 25.8955 65.9785 28.2812V28.2949C65.9785 30.6875 67.3115 32.1436 69.4922 32.1436ZM69.4922 30.9062C68.2139 30.9062 67.4961 29.9424 67.4961 28.2949V28.2812C67.4961 26.6338 68.2139 25.6699 69.4922 25.6699C70.7637 25.6699 71.4883 26.6338 71.4883 28.2812V28.2949C71.4883 29.9355 70.7637 30.9062 69.4922 30.9062ZM76.9111 32H78.4219L79.9531 26.4629H80.0693L81.6074 32H83.1318L85.1758 24.5762H83.7061L82.3799 30.3047H82.2637L80.7324 24.5762H79.3242L77.793 30.3047H77.6836L76.3506 24.5762H74.8604L76.9111 32ZM87.6934 32H89.1768V27.6455C89.1768 26.4492 89.8535 25.7041 90.9404 25.7041C92.0273 25.7041 92.54 26.3125 92.54 27.543V32H94.0166V27.1943C94.0166 25.4238 93.1006 24.4326 91.4395 24.4326C90.3594 24.4326 89.6484 24.9111 89.2861 25.7041H89.1768V24.5762H87.6934V32ZM97.1562 32H98.6396V21.6641H97.1562V32ZM104.992 32.1436C107.166 32.1436 108.499 30.6875 108.499 28.2949V28.2812C108.499 25.8887 107.159 24.4326 104.992 24.4326C102.818 24.4326 101.479 25.8955 101.479 28.2812V28.2949C101.479 30.6875 102.812 32.1436 104.992 32.1436ZM104.992 30.9062C103.714 30.9062 102.996 29.9424 102.996 28.2949V28.2812C102.996 26.6338 103.714 25.6699 104.992 25.6699C106.264 25.6699 106.988 26.6338 106.988 28.2812V28.2949C106.988 29.9355 106.264 30.9062 104.992 30.9062ZM113.307 32.123C114.291 32.123 115.07 31.6992 115.508 30.9473H115.624V32H117.094V26.9209C117.094 25.3623 116.041 24.4326 114.175 24.4326C112.486 24.4326 111.317 25.2461 111.14 26.4629L111.133 26.5107H112.562L112.568 26.4834C112.746 25.957 113.286 25.6562 114.106 25.6562C115.111 25.6562 115.624 26.1074 115.624 26.9209V27.5771L113.614 27.6934C111.844 27.8027 110.846 28.5752 110.846 29.9014V29.915C110.846 31.2617 111.892 32.123 113.307 32.123ZM112.322 29.8535V29.8398C112.322 29.1699 112.787 28.8008 113.812 28.7393L115.624 28.623V29.2588C115.624 30.2158 114.811 30.9404 113.703 30.9404C112.903 30.9404 112.322 30.5371 112.322 29.8535ZM122.893 32.123C123.932 32.123 124.745 31.6445 125.176 30.8311H125.292V32H126.769V21.6641H125.292V25.752H125.176C124.779 24.9521 123.911 24.4463 122.893 24.4463C121.006 24.4463 119.816 25.9297 119.816 28.2812V28.2949C119.816 30.626 121.026 32.123 122.893 32.123ZM123.316 30.8584C122.072 30.8584 121.327 29.8877 121.327 28.2949V28.2812C121.327 26.6885 122.072 25.7178 123.316 25.7178C124.547 25.7178 125.312 26.6953 125.312 28.2812V28.2949C125.312 29.8809 124.554 30.8584 123.316 30.8584ZM268.324 34H269.906V21.3174H268.333L264.958 23.7432V25.4131L268.184 23.0752H268.324V34ZM280.363 34H281.91V31.3721H283.712V29.957H281.91V21.3174H279.616C277.841 23.9629 275.898 27.0566 274.185 29.9307V31.3721H280.363V34ZM275.802 29.9658V29.8604C277.182 27.5312 278.843 24.9121 280.267 22.7852H280.372V29.9658H275.802ZM286.162 37.2256H287.296L288.676 32.2246H286.927L286.162 37.2256ZM296.672 34.2109C299.212 34.2109 301.075 32.6465 301.075 30.5283V30.5107C301.075 28.709 299.818 27.5576 297.973 27.3994V27.3643C299.555 27.0303 300.662 25.958 300.662 24.3936V24.376C300.662 22.4512 299.071 21.1064 296.654 21.1064C294.281 21.1064 292.646 22.4863 292.444 24.5518L292.436 24.6396H293.956L293.965 24.5518C294.097 23.2686 295.16 22.4775 296.654 22.4775C298.201 22.4775 299.071 23.2422 299.071 24.5693V24.5693ZM310.434 34H311.98V31.3721H313.782V29.957H311.98V21.3174H309.687C307.911 23.9629 305.969 27.0566 304.255 29.9307V31.3721H310.434V34ZM305.872 29.9658V29.8604C307.252 27.5312 308.913 24.9121 310.337 22.7852H310.442V29.9658H305.872ZM323.297 34H324.826V28.1289C324.826 26.793 325.767 25.7119 327.006 25.7119C328.201 25.7119 328.975 26.4414 328.975 27.5664V34H330.504V27.9092C330.504 26.7051 331.374 25.7119 332.692 25.7119C334.028 25.7119 334.67 26.4062 334.67 27.8037V34H336.199V27.4521C336.199 25.4658 335.118 24.3584 333.185 24.3584C331.875 24.3584 330.794 25.0176 330.284 26.0195H330.144C329.704 25.0352 328.808 24.3584 327.524 24.3584C326.285 24.3584 325.389 24.9473 324.967 25.9668H324.826V24.5254H323.297V34ZM344.67 34.167C347.069 34.167 348.643 32.2246 348.643 29.2715V29.2539C348.643 26.2832 347.078 24.3584 344.67 24.3584C343.369 24.3584 342.235 25.0088 341.717 26.0195H341.576V20.7637H340.047V34H341.576V32.4883H341.717C342.297 33.543 343.352 34.167 344.67 34.167ZM344.318 32.8135C342.596 32.8135 341.541 31.46 341.541 29.2715V29.2539C341.541 27.0654 342.596 25.7119 344.318 25.7119C346.05 25.7119 347.078 27.0479 347.078 29.2539V29.2715C347.078 31.4775 346.05 32.8135 344.318 32.8135ZM352.016 37.1641H353.545V32.5059H353.686C354.204 33.5166 355.338 34.167 356.639 34.167C359.047 34.167 360.611 32.2422 360.611 29.2715V29.2539C360.611 26.3008 359.038 24.3584 356.639 24.3584C355.32 24.3584 354.266 24.9824 353.686 26.0371H353.545V24.5254H352.016V37.1641ZM356.287 32.8135C354.564 32.8135 353.51 31.46 353.51 29.2715V29.2539C353.51 27.0654 354.564 25.7119 356.287 25.7119C358.019 25.7119 359.047 27.0479 359.047 29.2539V29.2715C359.047 31.4775 358.019 32.8135 356.287 32.8135ZM367.254 34.167C369.407 34.167 371.051 32.998 371.051 31.3105V31.293C371.051 29.9395 370.189 29.166 368.405 28.7354L366.946 28.3838C365.83 28.1113 365.355 27.707 365.355 27.0654V27.0479C365.355 26.2129 366.182 25.6328 367.307 25.6328C368.449 25.6328 369.188 26.1514 369.39 26.8984H370.893C370.682 25.3516 369.302 24.3584 367.315 24.3584C365.303 24.3584 363.791 25.5449 363.791 27.1182V27.127C363.791 28.4893 364.591 29.2627 366.366 29.6846L367.834 30.0361C369.003 30.3174 369.486 30.7656 369.486 31.4072V31.4248C369.486 32.2861 368.581 32.8926 367.307 32.8926C366.094 32.8926 365.338 32.374 365.083 31.583H363.519C363.694 33.1475 365.145 34.167 367.254 34.167Z"
                          fill="currentColor"
                        />
                      </g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 123C3 123 14.3298 94.153 35.1282 88.0957C55.9266 82.0384 65.9333 80.5508 65.9333 80.5508C65.9333 80.5508 80.699 80.5508 92.1777 80.5508C103.656 80.5508 100.887 63.5348 109.06 63.5348C117.233 63.5348 117.217 91.9728 124.78 91.9728C132.343 91.9728 142.264 78.03 153.831 80.5508C165.398 83.0716 186.825 91.9728 193.761 91.9728C200.697 91.9728 206.296 63.5348 214.07 63.5348C221.844 63.5348 238.653 93.7771 244.234 91.9728C249.814 90.1684 258.8 60 266.19 60C272.075 60 284.1 88.057 286.678 88.0957C294.762 88.2171 300.192 72.9284 305.423 72.9284C312.323 72.9284 323.377 65.2437 335.553 63.5348C347.729 61.8259 348.218 82.07 363.639 80.5508C367.875 80.1335 372.949 82.2017 376.437 87.1008C379.446 91.3274 381.054 97.4325 382.521 104.647C383.479 109.364 382.521 123 382.521 123"
                        fill="url(#paint0_linear_0_106)"
                      />
                      <path
                        className="text-brand-blue"
                        d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <defs>
                        <linearGradient id="paint0_linear_0_106" x1="3" y1="60" x2="3" y2="123" gradientUnits="userSpaceOnUse">
                          <stop className="text-brand-blue/15" stopColor="currentColor" />
                          <stop className="text-transparent" offset="1" stopColor="currentColor" stopOpacity="0.103775" />
                        </linearGradient>
                        <clipPath id="clip0_0_106">
                          <rect width="358" height="30" fill="white" transform="translate(14 14)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">4-Month Bootcamps</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">Zero fluff. Master production-grade tech stacks in fully optimized, highly intense learning tracks.</p>
                  </div>
                </div>
              </div>

              {/* Card 4: Verified Credentials */}
              <div className="relative col-span-full overflow-hidden lg:col-span-3 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/60 transition-all duration-500 group">
                <div className="grid pt-8 pb-6 px-6 sm:grid-cols-2 gap-6 items-center">
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px] space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-gray-200 bg-white/40 shadow-sm before:absolute before:-inset-2 before:rounded-full before:border before:border-gray-200/30">
                      <Shield className="m-auto size-5 text-brand-blue" strokeWidth={2} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">Verified Credentials</h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">Earn industry-recognized, shareable certificates that validate your practical engineering skills.</p>
                    </div>
                  </div>
                  <div className="rounded-tl-2xl border-l border-t border-slate-200/60 bg-white/30 relative -mb-6 -mr-6 mt-6 h-fit p-6 py-6 sm:ml-6 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500">
                    <div className="absolute left-3 top-2 flex gap-1">
                      <span className="block size-2 rounded-full bg-slate-300"></span>
                      <span className="block size-2 rounded-full bg-slate-300"></span>
                      <span className="block size-2 rounded-full bg-slate-300"></span>
                    </div>
                    <svg className="w-full sm:w-[150%] text-slate-300 group-hover:text-slate-400 transition-colors duration-500" viewBox="0 0 366 231" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <div className="relative col-span-full overflow-hidden lg:col-span-3 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-blue/20 hover:bg-white/60 transition-all duration-500 group">
                <div className="grid pt-8 pb-6 px-6 sm:grid-cols-2 gap-6 items-center">
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px] space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-gray-200 bg-white/40 shadow-sm before:absolute before:-inset-2 before:rounded-full before:border before:border-gray-200/30">
                      <Users className="m-auto size-5 text-brand-blue" strokeWidth={2} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">1-on-1 Mentorship</h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">Get personalized code reviews, weekly 1-on-1 strategy sessions, and real-time support from active tech professionals.</p>
                    </div>
                  </div>
                  <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-slate-200/80 sm:-my-6 sm:-mr-6 group-hover:scale-105 transition-transform duration-500">
                    <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                      <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                        <span className="block h-fit rounded-lg border border-slate-200/60 bg-white/80 px-2 py-1 text-xs font-bold text-slate-700 shadow-sm">Siddharth (Mentor)</span>
                        <div className="ring-white size-8 ring-4 rounded-full overflow-hidden shadow-md">
                          <img className="size-full object-cover" src="https://avatars.githubusercontent.com/u/102558960?v=4" alt="Mentor" />
                        </div>
                      </div>
                      <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                        <div className="ring-white size-10 ring-4 rounded-full overflow-hidden shadow-md">
                          <img className="size-full object-cover" src="https://avatars.githubusercontent.com/u/47919550?v=4" alt="Learner" />
                        </div>
                        <span className="block h-fit rounded-lg border border-slate-200/60 bg-white/80 px-2 py-1 text-xs font-bold text-slate-700 shadow-sm">Rohan (Learner)</span>
                      </div>
                      <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                        <span className="block h-fit rounded-lg border border-slate-200/60 bg-white/80 px-2 py-1 text-xs font-bold text-slate-700 shadow-sm">Aisha (Mentor)</span>
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
      <section id="outcomes" className="bg-[#050816] py-24 relative overflow-hidden">
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
              
              <ul className="space-y-4 mb-10">
                {[
                  "Dedicated career coach for every learner",
                  "Resume building and mock interview sessions",
                  "Direct referrals to our 500+ hiring partners"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 font-medium">
                    <CheckCircle size={24} className="text-brand-cyan flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>

              <button className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-brand-blue/30 transition-all">
                Download Placement Report
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Outcome Stat Cards */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <Users size={32} className="text-brand-cyan mb-4" />
                <div className="text-4xl font-black text-white mb-2">35k+</div>
                <div className="text-sm font-semibold text-slate-400">Learners Placed</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <TrendingUp size={32} className="text-brand-cyan mb-4" />
                <div className="text-4xl font-black text-white mb-2">57%</div>
                <div className="text-sm font-semibold text-slate-400">Average Salary Hike</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm sm:col-span-2">
                <Award size={32} className="text-brand-cyan mb-4" />
                <div className="text-4xl font-black text-white mb-2">₹32 LPA</div>
                <div className="text-sm font-semibold text-slate-400">Highest Salary Offered (Software Engineering)</div>
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
