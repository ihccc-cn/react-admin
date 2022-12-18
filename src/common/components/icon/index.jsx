import clsx from "clsx";
import "./index.css";

function Icon({ type, className }) {
  return (
    <svg className={clsx("icon", className)} aria-hidden="true">
      <use href={"#" + type}></use>
    </svg>
  );
}

export default Icon;
