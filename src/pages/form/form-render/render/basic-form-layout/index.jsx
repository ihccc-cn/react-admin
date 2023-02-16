import React from "react";
import clsx from "clsx";
import "./index.css";

function BasicFormLayout(props) {
  const { tag, empty, preview, items, getLayoutItem, rowKey, ...restProps } = props;

  const itemList = items.map(item => {
    const layoutItem = getLayoutItem(item.name);
    return React.cloneElement(
      item.node,
      Object.assign(
        {
          className: clsx(!layoutItem.inline ? "basic-form-layout-item" : "basic-form-layout-item-inline"),
          key: item[rowKey],
        },
        preview ? { style: layoutItem.style } : layoutItem
      )
    );
  });

  const containerProps = { className: "basic-form-layout" };

  if (!tag) {
    return (
      <div {...containerProps} {...restProps}>
        {itemList}
      </div>
    );
  }

  return React.createElement(tag, Object.assign(containerProps, restProps), itemList.length === 0 ? empty : itemList);
}

BasicFormLayout.defaultProps = {
  preview: true,
  rowKey: "id",
};

export default BasicFormLayout;
