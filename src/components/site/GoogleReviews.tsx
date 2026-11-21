import { useEffect, useRef } from "react";

export function GoogleReviews({
  summary,
  className,
}: {
  summary?: any;
  className?: string;
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Ensure platform.js is present in the DOM
    const scriptSrc = "https://elfsightcdn.com/platform.js";
    let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    // 2. If Elfsight's eapps platform is already initialized on window,
    // trigger re-initialization so client-side navigation immediately renders the widget.
    const win = window as any;
    if (win?.eapps?.platform) {
      try {
        if (typeof win.eapps.platform.initialize === "function") {
          win.eapps.platform.initialize();
        }
      } catch (err) {
        console.warn("Elfsight platform initialize warning:", err);
      }
    }
  }, []);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="elfsight-app-186e43d3-8d15-4690-8e91-2501d088fec0"
        data-elfsight-app-lazy
      />
    </div>
  );
}
