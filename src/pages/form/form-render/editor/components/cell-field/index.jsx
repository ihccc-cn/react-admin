import React from "react";
import clsx from "clsx";
import Icon from "@/common/components/icon";
import "./index.css";

function CellField({ className, icon, title, type, ...restProps }) {
  return (
    <div className={clsx("input-cell", className)} title={title} {...restProps}>
      {icon && <Icon type={icon} />}
      <span className="input-cell-title">{title}</span>
      <div className="input-cell-desc">{type}</div>
    </div>
  );
}

export default CellField;
