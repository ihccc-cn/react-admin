import React from "react";
import clsx from "clsx";
import "./index.css";

function Flexible({ className, placement, size, children, style, ...restProps }) {
  const [offset, setOffset] = React.useState(size);
  return (
    <div className={clsx("flexible-box", className)} style={{ ...style, width: Math.abs(offset) }} {...restProps}>
      <span className={clsx("flexible-handle", "flexible-handle-" + placement)} onClick={() => setOffset(offset === 0 ? size : 0)}></span>
      {children}
    </div>
  );
}

function Layout({ top, left, right, children, style }) {
  return (
    <div className="form-editor-layout" style={style}>
      {left && (
        <Flexible className="form-editor-layout-side form-editor-layout-side-left" placement="left" size={-256}>
          {left}
        </Flexible>
      )}
      <div className="form-editor-layout-body">
        <div className="form-editor-layout-body-top">{top}</div>
        <div className="form-editor-layout-body-main">{children}</div>
      </div>
      {right && (
        <Flexible className="form-editor-layout-side form-editor-layout-side-right" placement="right" size={256}>
          {right}
        </Flexible>
      )}
    </div>
  );
}

export default Layout;
