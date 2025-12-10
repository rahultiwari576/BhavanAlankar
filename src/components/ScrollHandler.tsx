import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      const hash = location.hash.substring(1); // Remove the '#'
      const element = document.getElementById(hash);
      
      if (element) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const offset = 100; // Account for sticky navbar (80px) + some padding
          const targetPosition = elementTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    } else {
      // If no hash, scroll to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollHandler;

