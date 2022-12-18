import { message, Avatar, Tag } from "antd";
import useApi from "@/common/hooks/useApi";
import BaseList from "./base-list";
import { query } from "./services";

// 统一配置请求后的处理选项
useApi.config({
  onMessage: (level, info) => {
    const types = ["success", "warning", "error"];
    message[types[level]](info);
  },
  // onData: (data) => {

  // },
  dessert: {
    handleQuery: {
      auto: true,
      initialData: {},
      page: { pageNumber: 1, pageSize: 10 },
      verify: res => res.code === "0",
      message: (pass, response) => !pass && (response.message || "失败！"),
      format: response => response.data || {},
    },
  },
});

const columns = [
  {
    title: "头像",
    dataIndex: "avatar",
    width: 100,
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
  },
];

function TableList() {
  const { data } = useApi(query, "handleQuery");

  console.log("data: ", data);

  return (
    <div style={{ padding: 20 }}>
      <BaseList size="small" dataSource={data.list} columns={columns} />
    </div>
  );
}

export default TableList;
