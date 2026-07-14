import "./GalleryLamp.css";

type GalleryLampProps = {
  variant?: "grid" | "modal";
  className?: string;
};

export function GalleryLamp({ variant = "grid", className }: GalleryLampProps) {
  return (
    <div className={["gallery-lamp", `gallery-lamp--${variant}`, className].filter(Boolean).join(" ")} aria-hidden="true">
      <div className="gallery-lamp__ambient" />
      <div className="gallery-lamp__rig">
        <span className="gallery-lamp__cable" />
        <span className="gallery-lamp__body">
          <span className="gallery-lamp__light-strip" />
        </span>
        <span className="gallery-lamp__beam" />
      </div>
    </div>
  );
}