import { Input, InputNumber, Switch, Select } from "antd";
import Combination from "../combination";

function RulesEditor({ buttonProps, value, onChange }) {
  return (
    <Combination
      labels={["长度：", "最大长度：", "提示信息：", "最小长度：", "正则：", "必填：", "类型：", "仅警告：", "校验空格："]}
      fields={["len", "max", "message", "min", "pattern", "required", "type", "warningOnly", "whitespace"]}
      newValue={{}}
      buttonProps={buttonProps}
      value={value}
      onChange={onChange}
    >
      <InputNumber min={0} size="small" placeholder="请输入" style={{ width: "100%" }} />
      <InputNumber min={0} size="small" placeholder="请输入" style={{ width: "100%" }} />
      <Input size="small" placeholder="请输入" />
      <InputNumber min={0} size="small" placeholder="请输入" style={{ width: "100%" }} />
      <Input size="small" placeholder="请输入" />
      <Switch size="small" />
      <Select size="small" placeholder="请选择" style={{ width: "100%" }} />
      <Switch size="small" />
      <Switch size="small" />
    </Combination>
  );
}

export default RulesEditor;
