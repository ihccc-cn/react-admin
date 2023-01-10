import React from "react";
import { Form } from "antd";
import useSchema from "../hooks/useSchema";
import components from "../components";
import FlexFormLayout from "./flex-form-layout";

function FormRender({ schema, ...restProps }) {
  const { value } = useSchema(schema);

  const items = value.columns.map(col => {
    return {
      ...col,
      node: (
        <Form.Item label={col.title} tooltip={col.tip} name={col.name} {...col.itemProps}>
          {React.createElement(components[col.input] || components["Input"])}
        </Form.Item>
      ),
    };
  });

  return (
    <Form {...value.form} {...restProps}>
      <FlexFormLayout items={items} layout={value.layout} />
    </Form>
  );
}

export { FlexFormLayout };

export default FormRender;
