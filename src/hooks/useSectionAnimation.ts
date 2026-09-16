import { useAnimation } from "motion/react";
import { useCallback, useEffect, useRef, useState, type RefCallback } from "react";

/*
 * ХУК АНІМАЦІЇ СЕКЦІЙ - ФІКС ШВИДКОГО СКРОЛУ
 * 
 * ПРОБЛЕМА БУЛА: activationThreshold 0.4 = 40% секції має бути видно,
 * при швидкому скролі не встигало тригернутись + minCycleMs блокував
 * 
 * ФІКС: 0.15 = 15% достатньо, once=true = не ховаємо назад
 */

interface UseSectionAnimationOptions {
  // ✅ МОЖНА МІНЯТИ - коли тригерити анімацію (0.15 = 15% секції в екрані)
  activationThreshold?: number;

  // 🚫 ДЛЯ СУМІСНОСТІ - старі параметри, лишай щоб не ламався HeroSection
  resetThreshold?: number;
  minCycleMs?: number;

  // ⚠️ ОБЕРЕЖНО - зсув тригера, "-12%" = тригеримо трохи раніше
  rootMargin?: string;

  // ✅ МОЖНА МІНЯТИ - true = анімується один раз і лишається видимим
  once?: boolean;
}

interface UseSectionAnimationReturn<T extends HTMLElement> {
  setRef: RefCallback<T>; // 🚫 НЕ ЧІПАТИ - ref для секції
  controls: any; // 🚫 НЕ ЧІПАТИ - контроли анімації
  initial: "hidden"; // 🚫 НЕ ЧІПАТИ - початковий стан
  isVisible: boolean; // ✅ МОЖНА ВИКОРИСТОВУВАТИ - чи видима секція
  isActive: boolean; // 🚫 ДЛЯ СУМІСНОСТІ з HeroSection
}

export function useSectionAnimation<T extends HTMLElement = HTMLElement>(
  options: UseSectionAnimationOptions = {}
): UseSectionAnimationReturn<T> {
  const {
    activationThreshold = 0.15, // ✅ Було 0.4, тепер 0.15 - раніше з'являється
    rootMargin = "0px 0px -12% 0px", // ⚠️ Тригеримо на 12% раніше
    once = true, // ✅ Було false з ресетом, тепер true - не ховаємо назад
  } = options;

  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T | null>(null);
  const hasAnimated = useRef(false);

  const setRef = useCallback<RefCallback<T>>((node) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Якщо вже анімували і once=true - одразу показуємо
    if (once && hasAnimated.current) {
      controls.set("visible");
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // ✅ Секція зайшла в екран - показуємо
          if (!hasAnimated.current || !once) {
            controls.start("visible");
            setIsVisible(true);
            hasAnimated.current = true;
          }
          if (once) observer.unobserve(el); // Більше не слідкуємо
        } else if (!once) {
          // Тільки для старої логіки з ресетом
          controls.start("hidden");
          setIsVisible(false);
        }
      },
      {
        threshold: activationThreshold,
        rootMargin,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activationThreshold, rootMargin, once, controls]);

  return {
    setRef,
    controls,
    initial: "hidden" as const,
    isVisible,
    isActive: isVisible,
  };
}
