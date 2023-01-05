import React from "react";
import { Form } from "antd";
import components from "../components";
import FlexFormLayout from "./flex-form-layout";

function FormRender({ schema, layoutStyle, ...restProps }) {
  const items = schema.columns.map(col => {
    const name = col.name || col.dataIndex;
    return {
      ...col,
      name,
      node: (
        <Form.Item label={col.title} tooltip={col.tip} name={name}>
          {React.createElement(components[col.input || "Input"])}
        </Form.Item>
      ),
    };
  });

  return (
    <Form {...restProps}>
      <FlexFormLayout items={items} layout={schema.layout} />
    </Form>
  );
}

export { FlexFormLayout };

export default FormRender;
