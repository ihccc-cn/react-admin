import React from "react";
import clsx from "clsx";
import { Avatar, Dropdown } from "antd";
import Icon from "@/common/components/icon";

const items = [
  {
    label: "个人中心",
    icon: <Icon type="icon-account" />,
    key: "account",
  },
  {
    label: "系统设置",
    icon: <Icon type="icon-set" />,
    key: "setting",
  },
  {
    label: "缓存清理",
    icon: <Icon type="icon-ashbin" />,
    key: "cache-clear",
  },
  {
    type: "divider",
  },
  {
    label: "退出登录",
    icon: <Icon type="icon-switch" />,
    key: "logout",
  },
];

export function UserInfoBlock({}) {
  return (
    <Dropdown placement="bottomRight" menu={{ items }}>
      <div className={clsx("user-info-block")}>
        <div className={clsx("user-info-avatar")}>
          <Avatar src="/logo.png" />
        </div>
        <div className={clsx("user-info-name")}>派大星</div>
      </div>
    </Dropdown>
  );
}

export default UserInfoBlock;
