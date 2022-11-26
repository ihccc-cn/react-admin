import React from "react";
import classnames from "classnames";
import LayoutContext from "./context";

// 只提供基础布局，无主题，无响应式

export const Header = ({ className, children }) => {
  const { pin, scrolled } = React.useContext(LayoutContext);

  return (
    <header
      className={classnames(
        "wow-header",
        { "wow-pin": pin },
        {
          "shadow-lg": scrolled,
        },
        className
      )}
    >
      {children}
    </header>
  );
};

export const Content = ({ className, children }) => {
  return <section className={classnames("wow-content", className)}>{children}</section>;
};

export const Aside = ({ className, logo, children }) => {
  const { pin, fold } = React.useContext(LayoutContext);

  return (
    <React.Fragment>
      <aside
        className={classnames("wow-aside wow-aside-placeholder", {
          "wow-fade": fold === 0,
          "wow-pin": pin && fold > 1,
        })}
      ></aside>
      <aside
        className={classnames(
          "wow-aside",
          "wow-aside-main",
          "wow-fixed",
          "wow-transition",
          {
            "wow-fade": fold === 0,
            "wow-open": fold === 2,
            // "wow-half": fold === 3,
            // "wow-full": fold === 4,
          },
          className
        )}
      >
        {/* logo */}
        <div className={classnames("wow-logo")}>{logo}</div>
        {children}
      </aside>
    </React.Fragment>
  );
};

export function Layout({ className, float, pin, fold, children }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = function () {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      setScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ pin, fold, scrolled }}>
      <div className={classnames("wow-layout", { "wow-space": float }, className)}>{children}</div>
    </LayoutContext.Provider>
  );
}

export default Layout;
