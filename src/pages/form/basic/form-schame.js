export default {
  columns: [
    {
      title: "头像",
      dataIndex: "avatar",
      inputNode: "upload.crop",
      input: "Upload",
      // itemProps: { valuePropName: "fileList" },
    },
    {
      title: "姓名",
      dataIndex: "name",
      inputNodeProps: { placeholder: "请输入" },
    },
    {
      title: "用户名",
      dataIndex: "username",
      inputNodeProps: { placeholder: "请输入" },
      // itemProps: { rules: [rule.required("姓名")] },
    },
    {
      title: "密码",
      tip: "密码长度最少6位！",
      dataIndex: "password",
      inputNode: "password",
      input: "Password",
      inputNodeProps: { placeholder: "请输入" },
      // itemProps: { rules: [rule.required("密码")] },
    },
    {
      title: "角色",
      dataIndex: "roles",
      name: "role_key",
      inputNode: "select.cache",
      input: "Select",
      inputNodeProps: { options: "roles" },
    },
    {
      title: "状态",
      dataIndex: "status",
      inputNode: "radio",
      input: "Radio",
      inputNodeProps: { options: "user.status", optionType: "button" },
    },
    {
      title: "邮箱",
      dataIndex: "email",
      inputNodeProps: { placeholder: "请输入" },
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      inputNodeProps: { placeholder: "请输入" },
    },
    {
      title: "生日",
      dataIndex: "brithday",
      inputNode: "date",
      input: "DatePicker",
    },
    {
      title: "地址",
      dataIndex: "address",
      input: "TextArea",
      inputNodeProps: { placeholder: "请输入" },
    },
    {
      title: "描述",
      dataIndex: "description",
      inputNode: "textarea",
      input: "TextArea",
      inputNodeProps: { rows: 3, placeholder: "请输入" },
    },
  ],
  form: {
    name: "basic",
    layout: "vertical",
  },
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
