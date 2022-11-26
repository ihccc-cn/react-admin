import React from "react";
import ReactDOM from "react-dom/client";

function plugin() {
  const name = "react-render";

  function run(ReactNode, root = "root", strictMode = true) {
    const target = document.getElementById(root);
    const reactDom = strictMode ? React.createElement(React.StrictMode, null, ReactNode) : ReactNode;
    ReactDOM.createRoot(target).render(reactDom);
  }

  return { name, run };
}

export default plugin;
