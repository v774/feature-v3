import "./LiveProjectButton.css";
import { Link } from "react-router-dom";

type LiveProjectButtonProps = {
  href?: string;
};

export function LiveProjectButton({ href = "/" }: LiveProjectButtonProps) {
  return (
    <Link className="live-project-button" to={href}>
      Live Project
    </Link>
  );
}
