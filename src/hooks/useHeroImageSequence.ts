import { type RefObject, useEffect } from "react";

type HeroImageSequenceConfig = {
  basePath: string;
  filePrefix: string;
  extension: string;
  frameCount: number;
  framePadding: number;
};

const desktopQueryText = "(min-width: 1024px)";

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
  const drawX = (width - drawWidth) / 2;
  const drawY = (height - drawHeight) / 2;

  context.clearRect(0, 0, width, height);
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
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
    const frameRef = { current: 0 };
    const targetFrameRef = { current: 0 };
    const renderedFrameRef = { current: -1 };
    const lastLoadedFrameRef = { current: 0 };
    let mounted = true;

    const drawFrame = (frameIndex: number) => {
      const safeFrame = Math.min(Math.max(frameIndex, 0), config.frameCount - 1);
      const image = loadedFrames.has(safeFrame)
        ? images[safeFrame]
        : images[lastLoadedFrameRef.current];

      if (!image || !image.complete) return;
      renderedFrameRef.current = safeFrame;
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
        drawFrame(renderedFrameRef.current >= 0 ? renderedFrameRef.current : targetFrameRef.current);
      }
    };

    const requestDraw = () => {
      if (frameRef.current) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        if (!desktopQuery.matches || reducedMotionQuery.matches) return;
        drawFrame(targetFrameRef.current);
      });
    };

    const onPointerMove = (event: MouseEvent) => {
      if (!desktopQuery.matches || reducedMotionQuery.matches) return;

      const progress = Math.min(Math.max(event.clientX / Math.max(window.innerWidth, 1), 0), 1);
      targetFrameRef.current = Math.round(progress * (config.frameCount - 1));
      requestDraw();
    };

    const preloadFrames = () => {
      images.forEach((image, index) => {
        image.decoding = "async";
        image.onload = () => {
          if (!mounted) return;
          loadedFrames.add(index);
          lastLoadedFrameRef.current = index;

          if (index === 0 || index === targetFrameRef.current) {
            requestDraw();
          }
        };
        image.src = getFrameSrc(config, index);
      });
    };

    const applyMode = () => {
      resizeCanvas();
      if (desktopQuery.matches && !reducedMotionQuery.matches) {
        canvas.hidden = false;
        requestDraw();
      } else {
        canvas.hidden = true;
      }
    };

    preloadFrames();
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

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [canvasRef, config]);
}
