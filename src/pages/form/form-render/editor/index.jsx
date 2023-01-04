import React from "react";
import { Form } from "antd";
import InputList from "./input-list";
import Canvas from "./canvas";
import Layout from "./layout";

const GROUP_NAME = "form-editor";

const inputNodes = [
  {
    key: "input",
    title: "输入框",
  },
];

function Editor({ value }) {
  const [columns, setColumns] = React.useState(value.columns || []);
  const [layout, setLayout] = React.useState(value.layout || {});

  return (
    <Layout left={<InputList group={GROUP_NAME} items={inputNodes} />} style={{ maxHeight: "calc(100vh - 140px)" }}>
      <Form name="basic" layout="vertical" style={{ width: "100%" }}>
        <Canvas group={GROUP_NAME} columns={columns} setColumns={setColumns} layout={layout} setLayout={setLayout} />
      </Form>
    </Layout>
  );
}

export default Editor;
