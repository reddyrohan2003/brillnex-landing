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
  ({ className, children, as: Component = "button", ...props }, ref) => {
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
          "relative isolate px-6 py-2.5 rounded-xl",
          "font-bold text-sm leading-6",
          "cursor-pointer overflow-hidden",
          "active:scale-95",
          "flex items-center gap-2",
          className
        )}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        style={{
          background: hovered ? "#ffffff" : "#dc2626",
          color: hovered ? "#dc2626" : "#ffffff",
          border: hovered ? "2px solid #dc2626" : "2px solid transparent",
          transition: "all 0.3s ease",
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
