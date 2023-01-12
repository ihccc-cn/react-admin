import { Input, InputNumber, Select, Switch } from "antd";

const fields = {
  Input: <Input size="small" placeholder="请输入" />,
  InputNumber: <InputNumber size="small" placeholder="请输入" />,
  Switch: <Switch size="small" />,
  Select: <Select size="small" placeholder="请选择" style={{ width: "100%" }} />,
  TextArea: <Input.TextArea rows={5} placeholder="请输入" />,
};

export default fields;
