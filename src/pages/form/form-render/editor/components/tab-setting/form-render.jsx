import React from "react";
import { Tooltip } from "antd";
import Icon from "@/common/components/icon";
import { inputValueFormat } from "@/utils";
import inputElements from "./input-elements";
import options from "./options";
import extraBlocks from "./extra-blocks";
import EditorContext from "../../editor-context";
import "./form-render.css";

function FormRender({ config, consumer, value, valuePropsName, defaultValuePropsName, onChange }) {
  const { schema } = React.useContext(EditorContext);

  return (config || []).map(item => {
    if (item.type === "Group") {
      return (
        <div className="setting-form-group-bar" key={item.name}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.title}</span>
        </div>
      );
    }

    return (
      <div className="setting-form-node" key={item.name}>
        <div className="setting-form-node-title">
          <span className="setting-form-node-name">{item.name}</span>
          <div className="setting-form-node-title-text">
            <span>{item.title}</span>
            {item.tip && (
              <Tooltip title={item.tip}>
                <Icon type="icon-help" />
              </Tooltip>
            )}
          </div>
        </div>
        {React.cloneElement(
          inputElements[item.type] || inputElements["Input"],
          Object.assign(
            {
              [defaultValuePropsName[item.type] || "defaultValue"]: item.defaultValue,
            },
            item.props,
            !consumer ? {} : consumer(item, schema),
            item.options
              ? {
                  options: options[item.options],
                }
              : {},
            {
              [valuePropsName[item.type] || "value"]: value[item.name],
              onChange: e => {
                onChange && onChange(item.name, inputValueFormat(e));
              },
            }
          )
        )}
        {item.extra && React.createElement(extraBlocks[item.extra.type], item.extra.props)}
      </div>
    );
  });
}

FormRender.defaultProps = {
  value: {},
  valuePropsName: {
    Switch: "checked",
  },
  defaultValuePropsName: {
    Switch: "defaultChecked",
  },
};

export default FormRender;
