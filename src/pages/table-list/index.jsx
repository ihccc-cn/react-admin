import BaseList from "./base-list";
import useApi from "@/common/hooks/useApi";
import { query } from "./services";

// 统一配置请求后的处理选项
useApi.config({
  // onMessage: (type, message) => {

  // },
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

function TableList() {
  const { data } = useApi(query, "handleQuery");

  return (
    <div style={{ padding: 20 }}>
      <BaseList />
    </div>
  );
}

export default TableList;
