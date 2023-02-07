import React from "react";
import { Form } from "antd";
import useSchema from "../hooks/useSchema";
import components from "../components";
import BasicFormLayout from "./basic-form-layout";

function FormRender({ schema, replace, ...restProps }) {
  const { value, getLayoutItem } = useSchema(schema);

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
      <BasicFormLayout items={items} getLayoutItem={getLayoutItem} />
    </Form>
  );
}

export { BasicFormLayout };

export default FormRender;
