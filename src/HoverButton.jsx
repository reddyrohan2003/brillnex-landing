import React from "react";

// Simple className joiner — no shadcn needed
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * HoverButton — adapted from the user-provided component.
 * Converted from TypeScript → JavaScript.
 * Theme: Brillnex red (#dc2626 → #ef4444) instead of blue.
 * Supports `as` prop so it can render as <a> or <button>.
 */
const HoverButton = React.forwardRef(
  ({ className, children, as: Component = "button", ...props }, ref) => {
    const buttonRef = React.useRef(null);
    const [isListening, setIsListening] = React.useState(false);
    const [circles, setCircles] = React.useState([]);
    const lastAddedRef = React.useRef(0);

    const createCircle = React.useCallback((x, y) => {
      const buttonWidth = buttonRef.current?.offsetWidth || 0;
      const xPos = x / buttonWidth;
      const color = `linear-gradient(to right, var(--hb-start) ${xPos * 100}%, var(--hb-end) ${xPos * 100}%)`;
      setCircles((prev) => [...prev, { id: Date.now(), x, y, color, fadeState: null }]);
    }, []);

    const handlePointerMove = React.useCallback(
      (event) => {
        if (!isListening) return;
        const currentTime = Date.now();
        if (currentTime - lastAddedRef.current > 100) {
          lastAddedRef.current = currentTime;
          const rect = event.currentTarget.getBoundingClientRect();
          createCircle(event.clientX - rect.left, event.clientY - rect.top);
        }
      },
      [isListening, createCircle]
    );

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) => (c.id === circle.id ? { ...c, fadeState: "in" } : c))
            );
          }, 0);
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) => (c.id === circle.id ? { ...c, fadeState: "out" } : c))
            );
          }, 1000);
          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id));
          }, 2200);
        }
      });
    }, [circles]);

    return (
      <Component
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          // Layout & shape
          "relative isolate px-6 py-2.5 rounded-xl",
          // Typography
          "text-white font-bold text-sm leading-6",
          // Glassmorphic dark-red base
          "backdrop-blur-lg",
          "cursor-pointer overflow-hidden",
          // Inset border glow — red tinted
          "before:content-[''] before:absolute before:inset-0",
          "before:rounded-[inherit] before:pointer-events-none before:z-[1]",
          "before:shadow-[inset_0_0_0_1px_rgba(220,38,38,0.45),inset_0_0_16px_0_rgba(239,68,68,0.15),inset_0_-3px_12px_0_rgba(220,38,38,0.2),0_1px_3px_0_rgba(0,0,0,0.55),0_4px_14px_0_rgba(220,38,38,0.3)]",
          "before:mix-blend-normal before:transition-transform before:duration-300",
          "active:before:scale-[0.975]",
          "flex items-center gap-2",
          className
        )}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsListening(true)}
        onPointerLeave={() => setIsListening(false)}
        style={{
          background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
          "--hb-start": "#fca5a5",   // red-300 — bright spark at cursor start
          "--hb-end":   "#ef4444",   // red-500 — vivid red at cursor end
        }}
        {...props}
      >
        {/* Particle circles */}
        {circles.map(({ id, x, y, color, fadeState }) => (
          <div
            key={id}
            className={cn(
              "absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full",
              "blur-xl pointer-events-none z-[-1] transition-opacity duration-300",
              fadeState === "in"  && "opacity-80",
              fadeState === "out" && "opacity-0 duration-[1.2s]",
              !fadeState          && "opacity-0"
            )}
            style={{ left: x, top: y, background: color }}
          />
        ))}
        {children}
      </Component>
    );
  }
);

HoverButton.displayName = "HoverButton";

export { HoverButton };
