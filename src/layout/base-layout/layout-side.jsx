import React from "react";
import clsx from "clsx";
import Icon from "@/common/components/icon";
import { Layout, Aside, Content } from "./layout";
import Menus from "./menus";

export const transition = "transition-all duration-400 ease-in-out";

const Pushpin = ({ className, fold, pin, onClick }) => (
  <div className={clsx("wow-pin-button", { "wow-hide": fold < 2 }, className)} onClick={onClick}>
    <Icon type={pin ? "icon-pin-fill" : "icon-pin"} />
  </div>
);

// const FoldButton = ({ fold, onClick }) => (
//   <div className={clsx("wow-fold-button", "wow-fold-button-signle", { "wow-rotate": fold })} onClick={onClick}>
//     <Icon type="icon-arrow-right" />
//   </div>
// );

const FoldButton2 = ({ onClick }) => (
  <div className={clsx("wow-fold-button-two")}>
    <div className={clsx("wow-fold-button", "wow-fold-button-left")} onClick={() => onClick && onClick(-1)}>
      <Icon type="icon-arrow-left" />
    </div>
    <div className={clsx("wow-fold-button", "wow-fold-button-right")} onClick={() => onClick && onClick(1)}>
      <Icon type="icon-arrow-right" />
    </div>
  </div>
);

const Logo = ({ logo, title, shortTitle, fold }) => (
  <a className={clsx("flex flex-col justify-center items-center")}>
    {logo && (
      <div className={clsx("aside-logo w-12 h-12 mb-2", transition, { "w-8 h-8": fold < 2 })}>
        <img width="100%" src={logo} alt="logo" />
      </div>
    )}
    <div className={clsx("aside-title leading-4 text-white text-lg lg:text-lg font-bold truncate", transition, { "lg:text-xl": !fold })}>
      {fold < 2 ? shortTitle : title}
    </div>
  </a>
);

export function SideLayout({ logo, title, shortTitle, float, routes, renderLogo, renderMenu, renderBottom, children }) {
  const [ready, setReady] = React.useState(false);
  // 固定状态
  const [pin, setPin] = React.useState(true);
  // 折叠状态
  const [fold, setFold] = React.useState(2);
  const [dir, setDir] = React.useState(1);

  React.useEffect(() => {
    let lastMatches;
    const onResize = function () {
      const media = window.matchMedia("(min-width: 1024px)");
      if (lastMatches !== media.matches) setFold(media.matches ? 0 : 1);
      lastMatches = media.matches;
    };
    window.addEventListener("resize", onResize);
    setTimeout(() => setReady(true), 1000);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const changeFold = (step = 0) => {
    setFold(current => {
      let _dir = dir;
      if (current === 2 || current === 0) setDir((_dir = dir * -1));
      if (step === 0) return current + _dir;
      const next = current + step;
      return next === -1 || next > 2 ? current : next;
    });
  };

  const menuDom = <Menus fold={fold < 2} routes={routes || []} />;

  return (
    <Layout float={float} pin={pin} fold={fold}>
      <Aside
        className={clsx(ready ? "bg-primary dark:bg-gray-800" : "aside-loading")}
        logo={(renderLogo && renderLogo()) || <Logo logo={logo} title={title} shortTitle={shortTitle} fold={fold} />}
      >
        {/* 固钉按钮 */}
        <Pushpin fold={fold} pin={pin} onClick={() => setPin(!pin)} />
        {/* 伸缩按钮 */}
        {/* <FoldButton fold={fold === 2 || (fold === 1 && dir === -1)} onClick={changeFold} /> */}
        <FoldButton2 onClick={changeFold} />
        <div className="wow-menu-container">
          {/* 菜单列表 */}
          {(renderMenu && renderMenu(routes, menuDom)) || menuDom}
        </div>
        {/* 底部按钮 */}
        <div className="wow-aside-bottom">{renderBottom && renderBottom()}</div>
      </Aside>
      <Content>{children}</Content>
    </Layout>
  );
}

export default SideLayout;
