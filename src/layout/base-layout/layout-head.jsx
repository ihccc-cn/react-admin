import React from "react";
// import clsx from "clsx";
// import Icon from "@/common/components/icon";
import { Header } from "./layout";

function HeadLayout({ children }) {
  return (
    <React.Fragment>
      <Header className="dark:bg-gray-700">
        <div className="truncate text-xl xl:text-2xl font-bold">下午好, 汪汪用户（Admin）!</div>
      </Header>
      {children}
    </React.Fragment>
  );
}

export default HeadLayout;
