import React from "react";
import { Tabs, Form, Modal } from "antd";
import FormRender from "../form-render/render";
import Editor from "../form-render/editor";
import schemaValue from "../fr-example.json";

function ContentTab({ children }) {
  const nodes = React.Children.toArray(children);
  return (
    <Tabs
      defaultActiveKey="form-editor"
      items={[
        { label: "基础布局", key: "form-render-base", children: nodes[0] },
        { label: "栅格布局", key: "form-render-grid", children: nodes[1] },
        { label: "联动渲染", key: "form-ralation", children: nodes[2] },
        { label: "动态编辑", key: "form-editor", children: nodes[3] },
      ]}
    />
  );
}

function BasicForm() {
  const [form] = Form.useForm();

  return (
    <div style={{ padding: "0 20px 20px" }}>
      {/* <Modal open centered width={1600} footer={null}>
        <Editor style={{ height: "760px" }} />
      </Modal> */}
      <ContentTab>
        <div>
          <FormRender
            form={form}
            schema={schemaValue}
            replace={col => {
              // 替换为自定义渲染
              // if(col.name === "") {
              //   return
              // }
            }}
          />
        </div>
        <div></div>
        <div></div>
        <div>
          <Editor schema={schemaValue} style={{ height: "calc(100vh - 140px)" }} />
        </div>
      </ContentTab>
    </div>
  );
}

export default BasicForm;
