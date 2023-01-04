import React from "react";
import clsx from "clsx";
import { Form, Input } from "antd";
import { ReactSortable } from "react-sortablejs";
import Icon from "@/common/components/icon";
import { uuid } from "@/utils/utils";
import { FlexFormLayout } from "../render";
import "./index.css";

const HANDLE_CLASS = ".sort-cell-handle";

const GROUP_NAME = "form-editor";

function Layout({ left, right, children, style }) {
  return (
    <div className="form-editor-layout" style={style}>
      {left && <div className="form-editor-layout-side">{left}</div>}
      <div className="form-editor-layout-body">{children}</div>
      {right && <div className="form-editor-layout-side">{right}</div>}
    </div>
  );
}

function InputCell({ className, title, ...restProps }) {
  return (
    <div className={clsx("input-cell", className)} {...restProps}>
      {title}
    </div>
  );
}

function FormCell({ className, children, ...restProps }) {
  return (
    <div className={clsx("form-cell", className)} {...restProps}>
      <div className="form-cell-button form-cell-handle" title="拖拽交换位置">
        <Icon type="icon-move" />
      </div>
      <div className="form-cell-actions">
        <div className="form-cell-button" title="锁定">
          <Icon type="icon-password" />
        </div>
        <div className="form-cell-button" title="行内">
          <Icon type="icon-return" />
        </div>
        <div className="form-cell-button" title="替换">
          <Icon type="icon-CurrencyConverter" />
        </div>
        <div className="form-cell-button" title="删除">
          <Icon type="icon-ashbin" />
        </div>
      </div>
      {children}
    </div>
  );
}

function InputList({ group, items }) {
  const [source, setSource] = React.useState(items || []);

  return (
    <ReactSortable
      animation={150}
      list={source}
      setList={setSource}
      group={{ name: group, pull: "clone", put: false }}
      clone={item => ({ ...item, key: uuid() })}
      sort={false}
    >
      {source.map(item => (
        <InputCell title={item.title} key={item.key} />
      ))}
    </ReactSortable>
  );
}

function Canvas({ group, value, layout }) {
  const [state, setState] = React.useState(value || []);

  const items = React.useMemo(
    () =>
      state.map(col => ({
        ...col,
        node: (
          <FormCell key={col.key}>
            <Form.Item label={col.title} tooltip={col.tip} name={col.name || col.dataIndex}>
              <Input />
            </Form.Item>
          </FormCell>
        ),
      })),
    [state]
  );

  return (
    <ReactSortable
      handle={HANDLE_CLASS}
      animation={150}
      list={state}
      setList={newList => {
        console.log(newList);
        setState(newList);
      }}
      group={{ name: group, pull: "clone" }}
    >
      <FlexFormLayout items={items} layout={layout} />
    </ReactSortable>
  );
}

const inputNodes = [
  {
    key: "input",
    title: "输入框",
  },
];

function Editor({ value }) {
  return (
    <Layout left={<InputList group={GROUP_NAME} items={inputNodes} />} style={{ maxHeight: "calc(100vh - 140px)" }}>
      <Form name="basic" layout="vertical" style={{ width: "100%" }}>
        <Canvas group={GROUP_NAME} value={value.columns} layout={value.layout} />
      </Form>
    </Layout>
  );
}

export default Editor;
