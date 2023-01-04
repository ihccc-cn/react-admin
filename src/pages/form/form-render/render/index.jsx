import React from "react";
import { Form, Input } from "antd";
import FlexFormLayout from "./flex-form-layout";

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

export { FlexFormLayout };

export default FormRender;
