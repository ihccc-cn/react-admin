import { Input } from "antd";
import Combination from "../combination";

function ArrayInput({ buttonProps, value, onChange, ...props }) {
  return (
    <Combination buttonProps={buttonProps} value={value} onChange={onChange}>
      <Input {...props} />
    </Combination>
  );
}

export default ArrayInput;
