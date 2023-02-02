import React from "react";
import { Input, InputNumber, Radio, Select, Slider, Switch } from "antd";
import { inputValueFormat } from "../../../utils";

function StyleInput({ value, onChange, ...props }) {
  const [style, setStyle] = React.useState();

  const handleChange = React.useCallback(
    e => {
      const value = inputValueFormat(e);
      try {
        onChange && onChange(JSON.parse(value));
      } catch (error) {
        setStyle(value);
      }
    },
    [onChange]
  );

  React.useEffect(() => {
    if (typeof value === "object") setStyle(JSON.stringify(value, null, 2));
  }, [value]);

  return <Input.TextArea {...props} value={style} onChange={handleChange} />;
}

const inputElements = {
  Input: <Input size="small" placeholder="请输入" />,
  InputNumber: <InputNumber size="small" placeholder="请输入" />,
  Radio: <Radio.Group size="small" />,
  Select: <Select size="small" placeholder="请选择" style={{ width: "100%" }} />,
  Slider: <Slider />,
  Switch: <Switch size="small" />,
  TextArea: <Input.TextArea size="small" rows={5} placeholder="请输入" />,
  StyleInput: <StyleInput size="small" rows={5} placeholder="请输入" />,
};

export default inputElements;
