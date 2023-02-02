import { Avatar, Tag } from "antd";
import actionColumn from "../base-list/helper/action-column";

export const columns = [
  {
    title: "头像",
    dataIndex: "avatar",
    width: 80,
    render: val => <Avatar src={val} />,
  },
  {
    title: "名字",
    dataIndex: "name",
    width: 120,
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: 120,
  },
  {
    title: "用户状态",
    dataIndex: "status",
    width: 120,
    render: val => (val ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag>),
  },
  {
    title: "电话",
    dataIndex: "phone",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "brithday",
    width: 120,
  },
  {
    title: "地址",
    dataIndex: "address",
    width: 180,
  },
  {
    title: "描述",
    dataIndex: "description",
    ellipsis: true,
    width: 240,
  },
];

export const ac = actionColumn({
  width: 160,
  buttons: [
    {
      key: "update",
      onClick: row => console.log(row),
    },
    {
      key: "remove",
      onConfirm: row => console.log(row),
    },
  ],
});
