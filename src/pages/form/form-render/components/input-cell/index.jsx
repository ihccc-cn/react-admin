import React from "react";
import clsx from "clsx";
import "./index.css";

function InputCell({ className, title, ...restProps }) {
  return (
    <div className={clsx("input-cell", className)} {...restProps}>
      {title}
    </div>
  );
}

export default InputCell;
