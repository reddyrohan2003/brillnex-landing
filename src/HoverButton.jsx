import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * HoverButton — Brillnex themed.
 * Default: Red background, white text.
 * Hover:   White background, red border, red text.
 */

const HoverButton = React.forwardRef(
  ({ className, children, as: Component = "button", size = "md", ...props }, ref) => {
    const buttonRef = React.useRef(null);
    const [hovered, setHovered] = React.useState(false);

    return (
      <Component
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "relative isolate rounded-xl font-bold cursor-pointer overflow-hidden active:scale-95 flex items-center gap-1.5 shrink-0",
          size === "sm" ? "px-3 py-1.5 text-xs leading-4" : "px-6 py-2.5 text-sm leading-6",
          className
        )}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        style={{
          background: hovered 
            ? "linear-gradient(135deg, #89ceff 0%, #4F46E5 100%)" 
            : "linear-gradient(135deg, #4F46E5 0%, #89ceff 100%)",
          color: "#ffffff",
          boxShadow: hovered 
            ? "0 8px 25px rgba(79, 70, 229, 0.22)" 
            : "0 4px 12px rgba(79, 70, 229, 0.08)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

HoverButton.displayName = "HoverButton";

export { HoverButton };
