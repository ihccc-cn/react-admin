import React from "react";
import { Form } from "antd";
import useSchema from "../hooks/useSchema";
import components from "../components";
import FlexFormLayout from "./basic-form-layout";

function FormRender({ schema, replace, ...restProps }) {
  const { value } = useSchema(schema);

  const items = value.columns.map(col => {
    const replaceNode = replace && replace(col);
    return {
      ...col,
      node: replaceNode || (
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
