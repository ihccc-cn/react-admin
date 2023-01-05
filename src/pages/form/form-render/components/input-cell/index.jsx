import React from "react";
import clsx from "clsx";
import Icon from "@/common/components/icon";
import "./index.css";

function InputCell({ className, icon, title, ...restProps }) {
  return (
    <div className={clsx("input-cell", className)} {...restProps}>
      {icon && <Icon type={icon} />}
      <span className="input-cell-title">{title}</span>
    </div>
  );
}

export default InputCell;
