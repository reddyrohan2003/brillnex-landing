import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// STYLES — Brillnex theme (dark bg #0a0a0a, red #dc2626)
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.brillnex-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

@keyframes bfooter-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
}

@keyframes bfooter-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes bfooter-heartbeat {
  0%, 100% { transform: scale(1);   filter: drop-shadow(0 0 4px rgba(30,136,255,0.4)); }
  15%, 45%  { transform: scale(1.25); filter: drop-shadow(0 0 10px rgba(30,136,255,0.9)); }
  30%       { transform: scale(1); }
}

@keyframes bfooter-pulse-ring {
  0%   { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}

.animate-bfooter-breathe   { animation: bfooter-breathe   10s ease-in-out infinite alternate; }
.animate-bfooter-marquee   { animation: bfooter-marquee   35s linear infinite; }
.animate-bfooter-heartbeat { animation: bfooter-heartbeat 2s  cubic-bezier(0.25, 1, 0.5, 1) infinite; }

/* Blue aurora glow */
.bfooter-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(30, 136, 255, 0.18) 0%,
    rgba(0, 194, 255, 0.10) 40%,
    transparent 70%
  );
}

/* Subtle dark grid */
.bfooter-bg-grid {
  background-size: 56px 56px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Giant watermark text */
.bfooter-giant-text {
  font-size: 22vw;
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(30,136,255,0.08);
  background: linear-gradient(180deg, rgba(30,136,255,0.12) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
  user-select: none;
}

/* Metallic blue heading glow */
.bfooter-heading-glow {
  background: linear-gradient(160deg, #ffffff 0%, #00C2FF 50%, #1E88FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 30px rgba(30,136,255,0.3));
}

/* Glass pill */
.bfooter-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 8px 24px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.bfooter-pill:hover {
  border-color: rgba(30,136,255,0.35);
  background: linear-gradient(145deg, rgba(30,136,255,0.08) 0%, rgba(30,136,255,0.03) 100%);
  box-shadow: 0 12px 32px -8px rgba(30,136,255,0.2), inset 0 1px 0 rgba(30,136,255,0.1);
  color: #ffffff;
}

/* Blue pill (primary CTA) */
.bfooter-pill-red {
  background: linear-gradient(135deg, #1E88FF 0%, #0059C8 100%);
  border: 1px solid rgba(30,136,255,0.6);
  box-shadow: 0 8px 24px -4px rgba(30,136,255,0.4);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.bfooter-pill-red:hover {
  background: linear-gradient(135deg, #00C2FF 0%, #1E88FF 100%);
  box-shadow: 0 12px 32px -4px rgba(30,136,255,0.6);
  transform: translateY(-2px) scale(1.03);
}

.bfooter-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(30,136,255,0.3), rgba(255,255,255,0.06), rgba(30,136,255,0.3), transparent);
}
`;

// -------------------------------------------------------------------------
// Magnetic Button — no TypeScript, pure JS
// -------------------------------------------------------------------------
const MagneticButton = React.forwardRef(
  ({ className = "", children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
      const element = localRef.current;
      if (!element) return;

      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * 0.35, y: y * 0.35, rotationX: -y * 0.1, rotationY: x * 0.1, scale: 1.06, ease: "power2.out", duration: 0.4 });
      };
      const handleMouseLeave = () => {
        gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <Component
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={`cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// Marquee item — Brillnex content
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6 whitespace-nowrap">
    <span>Learn. Build. Succeed.</span>
    <span className="text-brand-cyan">✦</span>
    <span>Real Projects & Real Skills</span>
    <span className="text-brand-cyan/60">✦</span>
    <span>Industry-Ready Training</span>
    <span className="text-brand-cyan">✦</span>
    <span>Expert Mentorship</span>
    <span className="text-brand-cyan/60">✦</span>
    <span>100% Placement Support</span>
    <span className="text-brand-cyan">✦</span>
    <span>Admissions Open</span>
    <span className="text-brand-cyan/60">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// MAIN CINEMATIC FOOTER
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef    = useRef(null);
  const giantTextRef  = useRef(null);
  const headingRef    = useRef(null);
  const linksRef      = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "8vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 85%", end: "bottom bottom", scrub: 1.5 },
        }
      );
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 45%", end: "center bottom", scrub: 1 },
        }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Curtain reveal wrapper — clips the fixed footer to this element's bounds */}
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ height: "100vh", clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="brillnex-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden"
          style={{ backgroundColor: "#050816", color: "#f3f4f6" }}
        >
          {/* Blue aurora glow */}
          <div className="bfooter-aurora absolute left-1/2 top-1/2 h-[55vh] w-[75vw] rounded-[50%] blur-[100px] animate-bfooter-breathe pointer-events-none z-0" />

          {/* Grid bg */}
          <div className="bfooter-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant watermark BRILLNEX */}
          <div
            ref={giantTextRef}
            className="bfooter-giant-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none"
          >
            BRILLNEX
          </div>

          {/* ── 1. Diagonal Marquee ── */}
          <div className="absolute top-10 left-0 w-full overflow-hidden py-3 z-10 -rotate-[1.5deg] scale-110"
            style={{ borderTop: "1px solid rgba(30,136,255,0.15)", borderBottom: "1px solid rgba(30,136,255,0.15)", backgroundColor: "rgba(10,10,10,0.7)", backdropFilter: "blur(12px)" }}
          >
            <div className="flex w-max animate-bfooter-marquee text-[11px] font-black tracking-[0.25em] uppercase"
              style={{ color: "rgba(156,163,175,0.8)" }}
            >
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* ── 2. Main Content ── */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full max-w-4xl mx-auto">
            
            {/* Heading */}
            <h2
              ref={headingRef}
              className="bfooter-heading-glow text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-center leading-none"
            >
              Start Your<br />Tech Journey
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-medium text-center mb-10 max-w-md">
              Join Brillnex Technologies and become industry-ready with real projects and real mentors.
            </p>

            {/* CTA Pills */}
            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">

              {/* Primary CTA */}
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="https://wa.me/917204398855"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bfooter-pill-red px-10 py-4 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  Contact Us
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="mailto:Brillnextechnologies@gmail.com"
                  className="bfooter-pill px-10 py-4 rounded-full text-gray-300 font-bold text-sm md:text-base flex items-center gap-3"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Send Email
                </MagneticButton>
              </div>

              {/* Secondary links */}
              <div className="flex flex-wrap justify-center gap-3 mt-1">
                <MagneticButton as="a" href="https://instagram.com/brillnex_technologies" target="_blank" rel="noopener noreferrer"
                  className="bfooter-pill px-5 py-2.5 rounded-full text-gray-400 font-semibold text-xs md:text-sm flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Instagram
                </MagneticButton>

                <MagneticButton as="a" href="#" className="bfooter-pill px-5 py-2.5 rounded-full text-gray-400 font-semibold text-xs md:text-sm">
                  Privacy Policy
                </MagneticButton>
                <MagneticButton as="a" href="#" className="bfooter-pill px-5 py-2.5 rounded-full text-gray-400 font-semibold text-xs md:text-sm">
                  Terms of Service
                </MagneticButton>
                <MagneticButton as="a" href="#" className="bfooter-pill px-5 py-2.5 rounded-full text-gray-400 font-semibold text-xs md:text-sm">
                  Refund Policy
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* ── 3. Bottom Bar ── */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12">
            <div className="bfooter-divider mb-6" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

              {/* Logo back to top */}
              <a href="#hero" className="flex flex-col items-start group order-1 md:order-1">
                <div className="text-xl font-black tracking-widest text-white leading-none group-hover:text-brand-blue transition-colors">
                  BRILLNE<span className="text-brand-blue group-hover:text-white transition-colors">X</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 opacity-80">
                  <div className="h-px w-3 bg-brand-blue group-hover:bg-white transition-colors" />
                  <span className="text-[0.5rem] font-bold tracking-[0.25em] text-gray-500 uppercase group-hover:text-gray-400 transition-colors">Technologies</span>
                  <div className="h-px w-3 bg-brand-blue group-hover:bg-white transition-colors" />
                </div>
              </a>

              {/* "Made with ❤" badge */}
              <div className="bfooter-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-2 cursor-default">
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Crafted with</span>
                <span className="animate-bfooter-heartbeat text-brand-cyan text-base">❤</span>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">by</span>
                <span className="text-white font-black text-xs ml-1">Brillnex</span>
              </div>

              {/* Copyright + Back to top */}
              <div className="flex items-center gap-4 order-3">
                <p className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-gray-600">
                  © {new Date().getFullYear()} Brillnex Technologies
                </p>

                <MagneticButton
                  as="button"
                  onClick={scrollToTop}
                  className="bfooter-pill w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white group"
                  aria-label="Back to top"
                >
                  <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </MagneticButton>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </>
  );
}
