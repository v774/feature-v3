import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        
        if (visibleSections.length > 0) {
          // Якщо кілька секцій видимі, беремо ту, що має найбільший відсоток перетину (intersectionRatio)
          const mostVisibleSection = visibleSections.reduce((prev, current) => {
            return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
          });
          
          setActiveSection(mostVisibleSection.target.id);
        }
      },
      // Відступи, щоб активною вважалася секція, яка знаходиться ближче до центру/верху екрана
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] } 
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}