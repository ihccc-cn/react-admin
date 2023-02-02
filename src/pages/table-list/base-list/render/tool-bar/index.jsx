import clsx from "clsx";
import { Button, Space } from "antd";
import Icon from "@/common/components/icon";
import "./index.css";

function ToolBar({}) {
  return (
    <div className={clsx("tool-bar")}>
      <Space>
        <Button type="dashed" icon={<Icon type="icon-exchangerate" />}></Button>
        <Button type="primary" icon={<Icon type="icon-add-select" />}>
          新增
        </Button>
      </Space>
    </div>
  );
}

ToolBar.defaultProps = {};

export default ToolBar;
