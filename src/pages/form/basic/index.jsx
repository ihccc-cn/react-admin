import React from "react";
import { Tabs, Form } from "antd";
import FormRender from "../form-render/render";
import Editor from "../form-render/editor";

function ContentTab({ children }) {
  const nodes = React.Children.toArray(children);
  return (
    <Tabs
      items={[
        { label: "基础布局", key: "form-render", children: nodes[0] },
        { label: "栅格布局", key: "form-render2", children: nodes[1] },
        { label: "联动渲染", key: "ralation-render", children: nodes[2] },
        { label: "动态编辑", key: "editor", children: nodes[3] },
      ]}
    />
  );
}

const schema = {
  columns: [
    {
      key: "avatar",
      title: "头像",
      dataIndex: "avatar",
      inputNode: "upload.crop",
    },
    {
      key: "name",
      title: "姓名",
      dataIndex: "name",
      inputNodeProps: { placeholder: "请输入" },
    },
    {
      key: "username",
      title: "用户名",
      dataIndex: "username",
      inputNodeProps: { placeholder: "请输入" },
      // itemProps: { rules: [rule.required("姓名")] },
    },
    {
      key: "password",
      title: "密码",
      tip: "密码长度最少6位！",
      dataIndex: "password",
      inputNode: "password",
      inputNodeProps: { placeholder: "请输入" },
      // itemProps: { rules: [rule.required("密码")] },
    },
    {
      key: "roles",
      title: "角色",
      dataIndex: "roles",
      name: "role_key",
      inputNode: "select.cache",
      inputNodeProps: { options: "roles" },
    },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      inputNode: "radio",
      inputNodeProps: { options: "user.status", optionType: "button" },
    },
    {
      key: "email",
      title: "邮箱",
      dataIndex: "email",
      inputNodeProps: { placeholder: "请输入" },
    },
    {
      key: "phone",
      title: "手机号码",
      dataIndex: "phone",
      inputNodeProps: { placeholder: "请输入" },
    },
    {
      key: "brithday",
      title: "生日",
      dataIndex: "brithday",
      inputNode: "date",
    },
    {
      key: "address",
      title: "地址",
      dataIndex: "address",
      inputNodeProps: { placeholder: "请输入" },
    },
    {
      key: "description",
      title: "描述",
      dataIndex: "description",
      inputNode: "textarea",
      inputNodeProps: { rows: 3, placeholder: "请输入" },
    },
  ],
  layout: {
    // inline: true,
    // style: { width: "40%", minWidth: 320 },
    items: {
      name: {
        inline: true,
        style: { width: "50%", minWidth: 160 },
      },
      username: {
        inline: true,
        style: { width: "50%", minWidth: 160 },
      },
      email: {
        inline: true,
        style: { width: "50%", minWidth: 160 },
      },
      phone: {
        inline: true,
        style: { width: "50%", minWidth: 160 },
      },
    },
  },
};

function BasicForm() {
  const [form] = Form.useForm();

  return (
    <div style={{ padding: "0 20px 20px" }}>
      <ContentTab>
        <div>
          <FormRender form={form} name="basic" layout="vertical" schema={schema} />
        </div>
        <div></div>
        <div></div>
        <div>
          <Editor value={schema} />
        </div>
      </ContentTab>
    </div>
  );
}

export default BasicForm;
