import React from "react";
import "./index.css";

function Layout({ left, right, children, style }) {
  return (
    <div className="form-editor-layout" style={style}>
      {left && <div className="form-editor-layout-side">{left}</div>}
      <div className="form-editor-layout-body">{children}</div>
      {right && <div className="form-editor-layout-side">{right}</div>}
    </div>
  );
}

export default Layout;
