import React from "react";
import clsx from "clsx";
import Icon from "@/common/components/icon";
import "./index.css";

function CellField({ className, icon, title, type, ...restProps }) {
  return (
    <div className={clsx("cell-field", className)} title={title} {...restProps}>
      {icon && <Icon type={icon} />}
      <span className="cell-field-title">{title}</span>
      <div className="cell-field-desc">{type}</div>
    </div>
  );
}

export default CellField;
