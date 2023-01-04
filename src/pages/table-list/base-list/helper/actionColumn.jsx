import React from "react";
import { Divider, Switch, Tooltip } from "antd";
import { A, Confirm } from "./buttons";

const presetButtonProps = {
  update: { className: "text-green-500", children: "编辑" },
  remove: { title: "确认删除吗？", className: "text-red-500", children: "删除" },
};

function revertValue(fields, ...args) {
  const source = this;
  fields.forEach(key => {
    if (typeof source[key] === "function") source[key] = source[key](...args);
  });
}

function WithDivider({ visible, children }) {
  return visible ? (
    <React.Fragment>
      <Divider type="vertical" />
      {children}
    </React.Fragment>
  ) : (
    children
  );
}

const ActionButtons = ({ record, buttons }) => {
  if (buttons.length === 0) return null;

  const buttonProps = React.useMemo(() => {
    return (buttons || []).map(item => {
      let btn = typeof item === "function" ? item(record) : Object.assign({}, item);

      revertValue.call(btn, ["tip", "title", "children", "className", "disabled"], record);

      if (!!btn.render) {
        btn.renderNode = btn.render(record);
        return btn;
      }

      if (btn.preset || btn.key) Object.assign(btn, presetButtonProps[btn.preset || btn.key]);

      const { tip, onClick, onConfirm, onSwitch, ...restProps } = btn;

      if (!!onClick) {
        btn.renderNode = <A {...restProps} onClick={() => onClick(record)} />;
      } else if (!!onConfirm) {
        btn.renderNode = <Confirm {...restProps} onConfirm={() => onConfirm(record)} />;
      } else if (!!onSwitch) {
        btn.renderNode = <Switch size="small" {...restProps} onChange={() => onSwitch(record)} />;
      }

      return btn;
    });
  }, [record, buttons]);

  return buttonProps.map((btn, index) => (
    <WithDivider visible={!!btn.renderNode && index > 0} key={btn.key}>
      {!btn.tip ? btn.renderNode : <Tooltip title={btn.tip}>{btn.renderNode}</Tooltip>}
    </WithDivider>
  ));
};

const actionColumn = ({ render, buttons, ...restOption }) => ({
  title: "操作",
  key: "action",
  render: (_, record, index) => (!!render && render(record, index)) || <ActionButtons record={record} buttons={buttons || []} />,
  ...restOption,
});

export default actionColumn;
