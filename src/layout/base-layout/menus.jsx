import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Icon from "@/common/components/icon";

export function Menus({ className, fold, routes }) {
  return (
    <ul className={clsx("menu", { fold: fold }, className)}>
      {routes.map(route => (
        <li className="menu-item" key={route.path}>
          <NavLink
            to={route.path}
            className={({ isActive }) =>
              clsx("menu-item-link", {
                active: isActive,
              })
            }
          >
            <span className="menu-item-icon">{route.icon && <Icon type={route.icon} />}</span>
            <span className={clsx("menu-item-text", { hidden: fold })}>{route.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Menus;
