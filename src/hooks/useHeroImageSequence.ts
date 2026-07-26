import { type RefObject, useEffect } from "react";

type HeroImageSequenceConfig = {
  basePath: string;
  filePrefix: string;
  extension: string;
  frameCount: number;
  framePadding: number;
};

const desktopQueryText = "(min-width: 1024px)";
const mobileFramesPerSecond = 30;

function getFrameSrc(config: HeroImageSequenceConfig, index: number) {
  const frameNumber = String(index).padStart(config.framePadding, "0");
  return `${config.basePath}/${config.filePrefix}${frameNumber}.${config.extension}`;
}

function drawCoverImage(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext("2d");
  if (!context || !image.naturalWidth || !image.naturalHeight) return;

  const width = canvas.width;
  const height = canvas.height;
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;

  context.clearRect(0, 0, width, height);
  context.drawImage(
    image,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

export function useHeroImageSequence(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  config: HeroImageSequenceConfig,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const desktopQuery = window.matchMedia(desktopQueryText);
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const images = Array.from({ length: config.frameCount }, () => new Image());
    const loadedFrames = new Set<number>();
    let animationFrame = 0;
    let targetFrame = 0;
    let renderedFrame = -1;
    let lastLoadedFrame = 0;
    let mobileFrame = 0;
    let mobileDirection: 1 | -1 = 1;
    let previousMobileTimestamp = 0;
    let mounted = true;

    const drawFrame = (frameIndex: number) => {
      const safeFrame = Math.min(Math.max(frameIndex, 0), config.frameCount - 1);
      const image = loadedFrames.has(safeFrame) ? images[safeFrame] : images[lastLoadedFrame];

      if (!image?.complete || !image.naturalWidth) return;
      renderedFrame = safeFrame;
      drawCoverImage(canvas, image);
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.max(1, Math.round(rect.width * dpr));
      const nextHeight = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        drawFrame(renderedFrame >= 0 ? renderedFrame : targetFrame);
      }
    };

    const requestDesktopDraw = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        if (desktopQuery.matches && !reducedMotionQuery.matches) drawFrame(targetFrame);
      });
    };

    const animateMobile = (timestamp: number) => {
      animationFrame = 0;
      if (desktopQuery.matches || reducedMotionQuery.matches) return;

      const frameInterval = 1000 / mobileFramesPerSecond;
      if (!previousMobileTimestamp) previousMobileTimestamp = timestamp;

      if (timestamp - previousMobileTimestamp >= frameInterval) {
        const elapsedFrames = Math.max(1, Math.floor((timestamp - previousMobileTimestamp) / frameInterval));
        previousMobileTimestamp = timestamp;
        mobileFrame += elapsedFrames * mobileDirection;

        if (mobileFrame >= config.frameCount - 1) {
          mobileFrame = config.frameCount - 1;
          mobileDirection = -1;
        } else if (mobileFrame <= 0) {
          mobileFrame = 0;
          mobileDirection = 1;
        }

        drawFrame(mobileFrame);
      }

      animationFrame = window.requestAnimationFrame(animateMobile);
    };

    const onPointerMove = (event: MouseEvent) => {
      if (!desktopQuery.matches || reducedMotionQuery.matches) return;
      const progress = Math.min(Math.max(event.clientX / Math.max(window.innerWidth, 1), 0), 1);
      targetFrame = Math.round(progress * (config.frameCount - 1));
      requestDesktopDraw();
    };

    const applyMode = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      previousMobileTimestamp = 0;
      canvas.hidden = false;
      resizeCanvas();

      if (reducedMotionQuery.matches) {
        drawFrame(0);
      } else if (desktopQuery.matches) {
        requestDesktopDraw();
      } else {
        animationFrame = window.requestAnimationFrame(animateMobile);
      }
    };

    images.forEach((image, index) => {
      image.decoding = "async";
      image.onload = () => {
        if (!mounted) return;
        loadedFrames.add(index);
        lastLoadedFrame = index;
        if (index === 0 || index === targetFrame || index === mobileFrame) drawFrame(index);
      };
      image.src = getFrameSrc(config, index);
    });

    applyMode();
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    desktopQuery.addEventListener("change", applyMode);
    reducedMotionQuery.addEventListener("change", applyMode);

    return () => {
      mounted = false;
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", resizeCanvas);
      desktopQuery.removeEventListener("change", applyMode);
      reducedMotionQuery.removeEventListener("change", applyMode);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [canvasRef, config]);
}
