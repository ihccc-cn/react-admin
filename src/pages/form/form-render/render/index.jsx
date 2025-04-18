import React from "react";
import { Form } from "antd";
import useSchema from "../hooks/useSchema";
import components from "../components";
import BasicFormLayout from "./basic-form-layout";
import { defineFunction } from "../utils";

function FormRender({ schema: schemaValue, replace, onValuesChange, ...restProps }) {
  const schema = useSchema(schemaValue);

  const { form, columns, formItem, component, layout, relations } = schema.value;

  const items = columns.map(col => {
    const replaceNode = replace && replace(col);
    if (!!replaceNode) return replaceNode;

    const itemConfig = formItem?.[col.name] || {};
    const componentConfig = component?.[col.name] || {};

    const inputNdoe = React.createElement(components[col.input] || components["Input"], Object.assign({}, componentConfig.props));

    console.log(col.title, itemConfig.props);
    const formItemNode = (
      <Form.Item label={col.title} tooltip={col.tip} name={col.name} {...itemConfig.props}>
        {inputNdoe}
      </Form.Item>
    );

    return {
      ...col,
      node: formItemNode,
    };
  });

  const relationMap = React.useMemo(() => {
    const rmap = {};
    if (!relations) return rmap;
    for (let relation of relations) {
      if (!rmap[relation.source]) rmap[relation.source] = [];
      rmap[relation.source] = rmap[relation.source].concat(
        relation.effects.map(rule => {
          if (rule.type && rule.func) {
            return { target: relation.target, effect: rule.type, func: defineFunction(rule.func, ["val", "all"]) };
          }
        })
      );
    }
    return rmap;
  }, [relations]);

  const triggerRelations = React.useCallback(
    (key, value, formValues) => {
      const rules = relationMap[key];

      if (!rules) return;

      for (let rule of rules) {
        if (rule.effect === "disabled") {
          const result = rule.func(value, formValues);
          console.log(key, value, rule.target, "disabled", result);
          schema.setComponentProps("disabled", Boolean(result), rule.target);
        }
        if (rule.effect === "hidden") {
          const result = rule.func(value, formValues);
          console.log(key, value, rule.target, "hidden", result);
          schema.setFormItemProps("hidden", Boolean(result), rule.target);
        }
        if (rule.effect === "changeValue") {
          const result = rule.func(value, formValues);
          console.log("changeValue:", rule.target, result);
          // schema.setFormItemProps('hidden', Boolean(result), rule.target);
        }
      }
    },
    [relationMap, onValuesChange]
  );

  const handleValuesChange = React.useCallback(
    (...args) => {
      onValuesChange && onValuesChange(...args);
      const [changedValue, formValues] = args;
      const [key, value] = Object.entries(changedValue)[0];
      triggerRelations(key, value, formValues);
    },
    [triggerRelations]
  );

  React.useEffect(() => {
    const { initialValues = {} } = restProps;
    for (let key in initialValues) {
      triggerRelations(key, initialValues[key], initialValues);
    }
  }, []);

  return (
    <Form onValuesChange={handleValuesChange} {...form?.props} {...restProps}>
      {layout.type === "basic-form-layout" && <BasicFormLayout items={items} getLayoutItem={schema.getLayoutItem} />}
    </Form>
  );
}

export { BasicFormLayout };

export default FormRender;
