import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Icon from "@/common/components/icon";

export function Menus({ className, fold, routes }) {
  return (
    <ul className={classnames("menu", { fold: fold }, className)}>
      {routes.map(route => (
        <li className="menu-item" key={route.path}>
          <NavLink
            to={route.path}
            className={({ isActive }) =>
              classnames("menu-item-link", {
                active: isActive,
              })
            }
          >
            <span className="menu-item-icon">{route.icon && <Icon type={route.icon} />}</span>
            <span className={classnames("menu-item-text", { hidden: fold })}>{route.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Menus;
