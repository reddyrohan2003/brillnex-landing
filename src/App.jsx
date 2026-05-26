import React, { useState, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { 
  Search, Menu, X, ChevronRight, Clock, Award, Briefcase, 
  CheckCircle, PlayCircle, Star, ArrowRight, BookOpen, Users,
  GraduationCap, TrendingUp
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
    color: `rgba(239,68,68,${0.05 + i * 0.015})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full overflow-visible text-red-600 dark:text-neutral-900"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#dc2626"
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
      className="relative mx-auto flex w-fit rounded-full border border-red-500/40 bg-black/80 p-1 backdrop-blur-md shadow-lg shadow-red-950/10"
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
      className="absolute z-0 top-1 bottom-1 rounded-full bg-white shadow-lg shadow-white/10"
    />
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('software');

  const courseData = {
    software: [
      {
        id: 1,
        title: "Full Stack Development",
        university: "MERN Stack & More",
        duration: "6 Months",
        format: "Online Interactive",
        price: "₹99,000",
        rating: 4.9,
        reviews: "12.4k",
        bestseller: true
      },
      {
        id: 2,
        title: "Web Development",
        university: "Frontend & Backend",
        duration: "4 Months",
        format: "Online Interactive",
        price: "₹65,000",
        rating: 4.8,
        reviews: "8.2k",
        bestseller: false
      },
      {
        id: 3,
        title: "Java Programming",
        university: "Core Java to Advanced",
        duration: "5 Months",
        format: "Weekend Live Classes",
        price: "₹75,000",
        rating: 4.7,
        reviews: "5.1k",
        bestseller: false
      },
      {
        id: 4,
        title: "C++ Programming",
        university: "From Basics to Advanced",
        duration: "4 Months",
        format: "Self-paced + Live Labs",
        price: "₹60,000",
        rating: 4.8,
        reviews: "4.3k",
        bestseller: false
      }
    ],
    data: [
      {
        id: 5,
        title: "Python Programming",
        university: "From Basics to Advanced",
        duration: "3 Months",
        format: "Online Interactive",
        price: "₹45,000",
        rating: 4.9,
        reviews: "15.8k",
        bestseller: true
      },
      {
        id: 6,
        title: "SQL Database Masterclass",
        university: "Master Databases",
        duration: "3 Months",
        format: "Self-paced + Live Labs",
        price: "₹35,000",
        rating: 4.6,
        reviews: "3.2k",
        bestseller: false
      },
      {
        id: 7,
        title: "Data Analysis",
        university: "Analyze Data, Drive Insights",
        duration: "4 Months",
        format: "Online Interactive",
        price: "₹55,000",
        rating: 4.8,
        reviews: "2.1k",
        bestseller: true
      }
    ],
    ai: [
      {
        id: 8,
        title: "Cyber Security",
        university: "Secure Systems, Build Future",
        duration: "6 Months",
        format: "Live Workshops",
        price: "₹85,000",
        rating: 5.0,
        reviews: "1.9k",
        bestseller: true
      },
      {
        id: 9,
        title: "Applied Generative AI & Prompt Engineering",
        university: "Silicon Valley Tech Academy",
        duration: "3 Months",
        format: "Live Workshops",
        price: "₹45,000",
        rating: 5.0,
        reviews: "2.1k",
        bestseller: true
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-100 selection:text-red-900">
      
      {/* Top Notification Bar */}
      <div className="bg-red-600 text-white text-xs font-medium py-2 px-4 text-center tracking-wide">
        New Batches Starting Soon. <span className="text-white/90 font-bold ml-1 cursor-pointer hover:underline">Claim your Early Bird Scholarship &rarr;</span>
      </div>

      {/* Navigation (Dark Theme to match Logo background) */}
      <header className="bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <a href="#hero" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
              <img
                src="/logo.png"
                alt="Brillnex Logo"
                className="h-14 w-14 rounded-xl object-cover shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-2xl md:text-3xl font-black tracking-widest text-white leading-none group-hover:text-red-500 transition-colors">
                  BRILLNE<span className="text-red-600 group-hover:text-white transition-colors">X</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 opacity-90">
                  <div className="h-px w-3 md:w-4 bg-red-600 group-hover:bg-white transition-colors"></div>
                  <span className="text-[0.55rem] md:text-[0.6rem] font-bold tracking-[0.3em] text-gray-400 uppercase group-hover:text-gray-300 transition-colors">Technologies</span>
                  <div className="h-px w-3 md:w-4 bg-red-600 group-hover:bg-white transition-colors"></div>
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
          <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 px-4 pt-2 pb-6 space-y-2 absolute w-full shadow-2xl">
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
      <section id="hero" className="bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden relative border-b border-gray-200 scroll-mt-20">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-bold tracking-wide mb-6">
                <TrendingUp size={16} /> We Are Officially Launched!
              </div>
              
              {/* Dynamic Animated Letters Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
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
                        className={`inline-block ${word === "Succeed." ? "text-red-600" : "text-slate-900"}`}
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
              <div className="bg-white border border-gray-200 p-2 rounded-xl shadow-md flex flex-col sm:flex-row gap-2 max-w-lg relative z-20">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search courses (e.g. AI, DevOps)" 
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-slate-900 placeholder-gray-500"
                  />
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-red-600/30 transition-all whitespace-nowrap">
                  Explore Programs
                </button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-red-600" /> EMI Options Available</div>
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-red-600" /> 1-on-1 Mentorship</div>
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
              {/* Secondary red glow ring */}
              <motion.div
                className="absolute w-96 h-96 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(220,38,38,0) 65%)' }}
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
              {/* Animated Logo */}
              <motion.img
                src="/logo.png"
                alt="Brillnex Technologies"
                className="relative z-10 w-72 h-72 md:w-80 md:h-80 object-contain rounded-3xl shadow-2xl shadow-blue-500/20"
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
              />
            </div>

          </div>
        </div>
      </section>

      {/* Hiring Partners Marquee */}
      <section className="border-y border-gray-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Brillnex Alumni Work At</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-xl font-black font-serif text-slate-800">Microsoft</div>
            <div className="text-xl font-extrabold tracking-tighter text-blue-600">IBM</div>
            <div className="text-xl font-bold tracking-tight text-orange-500">amazon</div>
            <div className="text-xl font-bold italic text-slate-900">Google</div>
            <div className="text-xl font-black text-red-600">Oracle</div>
            <div className="text-xl font-bold text-indigo-600 hidden md:block">Accenture</div>
          </div>
        </div>
      </section>

      {/* What We Offer Section (From Instagram) */}
      <section id="what-we-offer" className="bg-[#0a0a0a] text-white py-20 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <span className="text-red-500 text-xs font-black uppercase tracking-widest block mb-3">WELCOME TO BRILLNEX TECHNOLOGIES</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-white">
            We Are Officially <span className="text-red-600">Launched!</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-12 leading-relaxed font-medium">
            Brillnex Technologies is an online learning platform dedicated to delivering industry-ready tech education with <strong className="text-white font-black">Real Projects</strong> and <strong className="text-white font-black">Real Skills</strong>.
          </p>

          <div className="border-t border-white/10 pt-4 mb-10">
            <span className="bg-[#0a0a0a] px-6 text-sm font-black tracking-[0.2em] text-gray-500 uppercase">WHAT WE OFFER</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            {[
              { title: "ONLINE TECH COURSES", desc: "Expert Vetted Curriculums", icon: <BookOpen className="text-red-500" size={28} /> },
              { title: "REAL PROJECTS & TRAINING", desc: "100% Hands-on Practice", icon: <Award className="text-red-500" size={28} /> },
              { title: "INDUSTRY-READY SKILLS", desc: "Directly Marketable", icon: <TrendingUp className="text-red-500" size={28} /> },
              { title: "EXPERT MENTORSHIP", desc: "1-on-1 Personal Advice", icon: <Users className="text-red-500" size={28} /> },
              { title: "INTERNSHIP SUPPORT", desc: "Guaranteed Placement Paths", icon: <Briefcase className="text-red-500" size={28} /> },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-red-500/30 hover:scale-[1.03] hover:bg-white/[0.07]">
                <div className="w-14 h-14 bg-red-600/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                  {item.icon}
                </div>
                <h4 className="text-xs font-black tracking-wider text-white mb-2 uppercase">{item.title}</h4>
                <p className="text-[10px] text-gray-500 font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-3.5 w-3.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
              </span>
              <div className="text-left">
                <h5 className="font-extrabold text-sm text-red-500 uppercase tracking-widest leading-none">ADMISSIONS OPEN</h5>
                <p className="text-[10px] text-gray-400 font-semibold mt-1">Start your tech journey with us today!</p>
              </div>
            </div>
            <div className="h-px sm:h-8 w-full sm:w-px bg-white/10"></div>
            <a 
              href="https://wa.me/917204398855" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all hover:scale-105 active:scale-95 border border-red-500/20"
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
      <section id="courses" className="py-20 bg-gray-50">
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
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData[activeTab].map((course) => (
              <div key={course.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col h-full">
                
                {/* Card Header area */}
                <div className="p-6 pb-5 border-b border-gray-100 bg-gradient-to-br from-white to-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Award size={14} /> Certificate
                    </div>
                    {course.bestseller && (
                      <span className="bg-red-50 text-red-600 text-[10px] uppercase font-black tracking-wider px-2 py-1 rounded">Bestseller</span>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-red-600 transition-colors">
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

                  <div className="flex items-center gap-1 mb-6 text-sm">
                    <span className="font-bold text-slate-900">{course.rating}</span>
                    <div className="flex text-yellow-400">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                    </div>
                    <span className="text-gray-400 ml-1">({course.reviews})</span>
                  </div>

                  {/* Card Footer (Price & CTA) */}
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold mb-1">Starting at</p>
                      <p className="text-xl font-extrabold text-slate-900">{course.price}</p>
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

          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors group">
              View All Programs <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* Why Choose Brillnex Section (From Instagram) */}
      <section id="why-choose-us" className="py-20 bg-white border-t border-gray-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-red-600 text-xs font-black uppercase tracking-widest block mb-3">LEARN. BUILD. SUCCEED.</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Why Choose Brillnex?</h2>
            <p className="text-lg text-gray-600 font-medium">We don't just teach technology—we empower you to master it with hands-on experience and professional support.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Real Projects", desc: "Work on real-time projects and build an industry-grade portfolio.", icon: <BookOpen className="text-red-600" size={24} /> },
              { title: "Expert Trainers", desc: "Learn direct from experienced industry software engineers and tech professionals.", icon: <Users className="text-red-600" size={24} /> },
              { title: "Practical Learning", desc: "100% practical, hands-on application to make sure you retain what you build.", icon: <Award className="text-red-600" size={24} /> },
              { title: "Career Support", desc: "Dedicated career coaching, resume workshops, and active mock interviews.", icon: <Briefcase className="text-red-600" size={24} /> },
              { title: "Flexible Learning", desc: "Learn at your own pace, anytime, with life-time access to cohort archives.", icon: <Clock className="text-red-600" size={24} /> },
              { title: "Certificate", desc: "Receive a verified certificate of completion recognized by our hiring networks.", icon: <CheckCircle className="text-red-600" size={24} /> },
            ].map((usp, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:border-red-200 hover:bg-white flex gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
                  {usp.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">{usp.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{usp.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Dark Theme Section: Outcomes */}
      <section id="outcomes" className="bg-[#0a0a0a] py-24 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-10"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-red-800 rounded-full blur-[120px] opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Real Outcomes. <br/><span className="text-red-500">Real Career Impact.</span>
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
                    <CheckCircle size={24} className="text-red-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>

              <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-red-600/30 transition-all">
                Download Placement Report
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Outcome Stat Cards */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <Users size={32} className="text-red-500 mb-4" />
                <div className="text-4xl font-black text-white mb-2">35k+</div>
                <div className="text-sm font-semibold text-slate-400">Learners Placed</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <TrendingUp size={32} className="text-red-500 mb-4" />
                <div className="text-4xl font-black text-white mb-2">57%</div>
                <div className="text-sm font-semibold text-slate-400">Average Salary Hike</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm sm:col-span-2">
                <Award size={32} className="text-red-500 mb-4" />
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
