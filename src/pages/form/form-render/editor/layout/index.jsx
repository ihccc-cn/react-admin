import React from "react";
import "./index.css";

function Layout({ top, left, right, children, style }) {
  return (
    <div className="form-editor-layout" style={style}>
      {left && <div className="form-editor-layout-side">{left}</div>}
      <div className="form-editor-layout-body">
        <div className="form-editor-layout-body-top">{top}</div>
        <div className="form-editor-layout-body-main">{children}</div>
      </div>
      {right && <div className="form-editor-layout-side">{right}</div>}
    </div>
  );
}

export default Layout;
