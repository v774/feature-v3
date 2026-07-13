import "./LiveProjectButton.css";
import { Link } from "react-router-dom";
import { homepageContent } from "../../content/homepageContent";

type LiveProjectButtonProps = {
  href?: string;
};

export function LiveProjectButton({ href = "/" }: LiveProjectButtonProps) {
  return (
    <Link className="live-project-button" to={href}>
      {homepageContent.projects.liveProjectLabel}
    </Link>
  );
}
