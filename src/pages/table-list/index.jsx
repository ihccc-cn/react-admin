import useApi from "@/common/hooks/useApi";
import BaseList from "./base-list";
import { columns, ac } from "./columns";
import { query } from "./services";

function TableList() {
  const api = useApi(query);

  console.log("api: ", api);

  return (
    <div style={{ padding: 20 }}>
      <BaseList size="small" api={api} columns={columns.concat(ac)} />
    </div>
  );
}

export default TableList;
