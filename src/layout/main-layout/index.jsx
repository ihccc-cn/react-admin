import React from "react";
import { Input } from "antd";
import Icon from "@/common/components/icon";
import app from "@/core";
import { HeadLayout, SideLayout } from "../base-layout";
import "../base-layout/style";

const { locale } = app;

const SearchInput = ({ fold }) => (
  <div className="mb-8 px-3 max-w-md">
    {fold ? (
      <div
        className={clsx(
          "p-3 bg-white bg-opacity-70 rounded-lg dark:bg-gray-600 text-black dark:text-white text-md shadow-md cursor-pointer hover:scale-110",
          transition
        )}
      >
        <Icon type="icon-search" />
      </div>
    ) : (
      <Input className="w-full p-2 bg-white bg-opacity-70 dark:bg-gray-600 rounded-lg shadow-md" type="text" placeholder="请输入" />
    )}
  </div>
);

const Setting = () => {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="w-6 h-6 mx-auto my-12 text-2xl cursor-pointer" onClick={() => setDark(!dark)}>
      <Icon type="icon-setting" />
    </div>
  );
};

function MainLayout({ children, ...restProps }) {
  return (
    <SideLayout
      title={locale.format("title")}
      shortTitle={locale.format("shortTitle")}
      renderMenu={(_, menuDom) => (
        <React.Fragment>
          <SearchInput />
          {menuDom}
        </React.Fragment>
      )}
      renderBottom={() => <Setting />}
      {...restProps}
    >
      <HeadLayout>{children}</HeadLayout>
    </SideLayout>
  );
}

export default MainLayout;
