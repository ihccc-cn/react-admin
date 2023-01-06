import React from "react";
import { Form } from "antd";
import TabFields from "./components/tab-fields";
import TabSetting from "./components/tab-setting";
import Canvas from "./components/canvas";
import Layout from "./layout";
import inputNodes from "./input-nodes.json";

const GROUP_NAME = "form-editor";

function Editor({ value }) {
  const [columns, setColumns] = React.useState(value.columns || []);
  const [layout, setLayout] = React.useState(value.layout || {});

  console.log(columns);

  return (
    <Layout
      left={<TabFields component={<TabFields.ComponentPanel groupName={GROUP_NAME} items={inputNodes} />} template={<TabFields.TemplatePanel />} />}
      right={<TabSetting form={<TabSetting.FormPanel />} component={<TabSetting.ComponentPanel />} />}
      style={{ height: "calc(100vh - 140px)" }}
    >
      <Form name="basic" layout="vertical" style={{ width: "100%" }}>
        <Canvas groupName={GROUP_NAME} columns={columns} setColumns={setColumns} layout={layout} setLayout={setLayout} />
      </Form>
    </Layout>
  );
}

export default Editor;
