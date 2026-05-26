import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * HoverButton — Brillnex themed.
 * Features:
 *   • Smooth background colour sweep on hover (dark red → bright orange-red)
 *   • Glowing particle sparks that follow the cursor
 *   • Supports `as` prop (renders as <a> or <button>)
 */

// Inject the keyframe animation once into the document head
const STYLE = `
@keyframes hb-sweep {
  0%   { background-position: 100% 50%; }
  100% { background-position:   0% 50%; }
}
.hb-idle {
  background: linear-gradient(270deg, #b91c1c, #dc2626, #ef4444, #dc2626, #b91c1c);
  background-size: 300% 300%;
  background-position: 100% 50%;
  transition: background-position 0.7s ease, box-shadow 0.4s ease;
}
.hb-hovered {
  background: linear-gradient(270deg, #b91c1c, #dc2626, #ef4444, #f97316, #ef4444, #dc2626, #b91c1c);
  background-size: 400% 400%;
  animation: hb-sweep 1.4s ease forwards;
  box-shadow: 0 0 28px 4px rgba(239,68,68,0.55), 0 4px 16px rgba(220,38,38,0.45);
}
`;

if (typeof document !== "undefined" && !document.getElementById("hb-styles")) {
  const tag = document.createElement("style");
  tag.id = "hb-styles";
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}

const HoverButton = React.forwardRef(
  ({ className, children, as: Component = "button", ...props }, ref) => {
    const buttonRef = React.useRef(null);
    const [hovered, setHovered] = React.useState(false);
    const [circles, setCircles] = React.useState([]);
    const lastAddedRef = React.useRef(0);

    const createCircle = React.useCallback((x, y) => {
      const buttonWidth = buttonRef.current?.offsetWidth || 0;
      const xPos = x / buttonWidth;
      // Spark colour sweeps from pink-white to vivid orange-red
      const color = `linear-gradient(to right, #fca5a5 ${xPos * 100}%, #f97316 ${xPos * 100}%)`;
      setCircles((prev) => [...prev, { id: Date.now(), x, y, color, fadeState: null }]);
    }, []);

    const handlePointerMove = React.useCallback(
      (event) => {
        if (!hovered) return;
        const now = Date.now();
        if (now - lastAddedRef.current > 90) {
          lastAddedRef.current = now;
          const rect = event.currentTarget.getBoundingClientRect();
          createCircle(event.clientX - rect.left, event.clientY - rect.top);
        }
      },
      [hovered, createCircle]
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
          }, 900);
          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id));
          }, 2100);
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
          "relative isolate px-6 py-2.5 rounded-xl",
          "text-white font-bold text-sm leading-6",
          "cursor-pointer overflow-hidden",
          // Inset border glow
          "before:content-[''] before:absolute before:inset-0",
          "before:rounded-[inherit] before:pointer-events-none before:z-[1]",
          "before:shadow-[inset_0_0_0_1px_rgba(239,68,68,0.5),inset_0_0_18px_0_rgba(239,68,68,0.12),0_1px_3px_0_rgba(0,0,0,0.5)]",
          "before:transition-all before:duration-400",
          "active:scale-95",
          "flex items-center gap-2",
          hovered ? "hb-hovered" : "hb-idle",
          className
        )}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => { setHovered(false); }}
        style={{ transition: "transform 0.15s ease, box-shadow 0.4s ease" }}
        {...props}
      >
        {/* Cursor-following spark particles */}
        {circles.map(({ id, x, y, color, fadeState }) => (
          <div
            key={id}
            className={cn(
              "absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full",
              "blur-xl pointer-events-none z-[-1]",
              fadeState === "in"  && "opacity-75 transition-opacity duration-300",
              fadeState === "out" && "opacity-0 transition-opacity duration-[1.2s]",
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
