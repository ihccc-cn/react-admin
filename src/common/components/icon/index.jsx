import clsx from "clsx";
import "./index.css";

function Icon({ type, className, ...restProps }) {
  return (
    <svg className={clsx("icon", className)} aria-hidden="true" {...restProps}>
      <use href={"#" + type}></use>
    </svg>
  );
}

export default Icon;
