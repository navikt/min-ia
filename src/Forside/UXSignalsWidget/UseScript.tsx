import { useEffect } from "react";

export const useScript = (ready: boolean) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://widget.uxsignals.com/embed.js";
    if (ready) {
      document.body.appendChild(script);
    }

    return () => {
      try {
        document.body.removeChild(script);
      } catch {
        console.error("Failed to remove script");
      }
    };
  }, [ready]);
};
