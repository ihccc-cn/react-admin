import React from "react";
import clsx from "clsx";
import "./index.css";

function FlexFormLayout(props) {
  const { tag, items, layout, empty, rowKey, ...restProps } = props;
  const getLayout = name => {
    const { lock, inline, style } = layout.items?.[name] || {};
    return {
      lock: typeof lock === "undefined" ? layout.lock : lock,
      inline: typeof inline === "undefined" ? layout.inline : inline,
      style: typeof style === "undefined" ? layout.style : style,
    };
  };

  const itemList = items.map(item => {
    const { lock, inline, style } = getLayout(item.name);
    return React.cloneElement(
      item.node,
      Object.assign(
        {
          className: clsx(!inline ? "flex-form-layout-item" : "flex-form-layout-item-inline"),
          key: item[rowKey],
        },
        !tag ? {} : { lock, inline },
        style ? { style: style } : {}
      )
    );
  });

  const containerProps = { className: "flex-form-layout" };

  if (!tag) {
    return (
      <div {...containerProps} {...restProps}>
        {itemList}
      </div>
    );
  }

  return React.createElement(tag, Object.assign(containerProps, restProps), itemList.length === 0 ? empty : itemList);
}

FlexFormLayout.defaultProps = {
  rowKey: "id",
};

export default FlexFormLayout;
