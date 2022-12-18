import clsx from "clsx";
import { Input, Button, Space } from "antd";
import Icon from "@/common/components/icon";
import "./index.css";

function SearchBar({}) {
  return (
    <div className={clsx("search-bar")}>
      <div className={clsx("search-form-layout")}>
        <div>
          <Input placeholder="请输入" />
        </div>
      </div>
      <div className={clsx("search-buttons")}>
        <Space direction="vertical">
          <Button type="primary" icon={<Icon type="icon-search" />}>
            查询
          </Button>
          <Button icon={<Icon type="icon-responsetime" />}>重置</Button>
        </Space>
      </div>
    </div>
  );
}

SearchBar.defaultProps = {};

export default SearchBar;
