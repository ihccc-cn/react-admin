import React from "react";
import clsx from "clsx";
import { Form, Input } from "antd";
import "./index.css";

function GridFormLayout({ items }) {
  return;
}

function FlexFormLayout(props) {
  const { items, layout } = props;

  console.log(props);
  const getLayout = item => {
    const { inline, style } = layout.items?.[item.name || item.dataIndex] || {};
    return {
      inline: typeof inline === "undefined" ? layout.inline : inline,
      style: typeof style === "undefined" ? layout.style : style,
    };
  };

  return (
    <div className="flex-form-layout">
      {items.map(item => {
        const { inline, style } = getLayout(item);
        return React.cloneElement(
          item.node,
          Object.assign(
            {
              className: clsx(!inline ? "flex-form-layout-item" : "flex-form-layout-item-inline"),
              key: item.key,
            },
            style ? { style: style } : {}
          )
        );
      })}
    </div>
  );
}

function FormRender({ schema, layoutStyle, ...restProps }) {
  const items = schema.columns.map(col => ({
    ...col,
    node: (
      <Form.Item label={col.title} tooltip={col.tip} name={col.name || col.dataIndex}>
        <Input />
      </Form.Item>
    ),
  }));

  return (
    <Form {...restProps}>
      <FlexFormLayout items={items} layout={schema.layout} />
    </Form>
  );
}

export { FlexFormLayout, GridFormLayout };

export default FormRender;
