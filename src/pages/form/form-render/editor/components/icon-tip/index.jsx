import { Tooltip } from "antd";
import Icon from "@/common/components/icon";

function IconTip({ icon, showTitle, ...props }) {
  return (
    <Tooltip {...props}>
      {icon && <Icon type={icon} />}
      {showTitle && <span>{props.title}</span>}
    </Tooltip>
  );
}

export default IconTip;
