import React from "react";
import { Input } from "antd";
import { inputValueFormat } from "@/utils";

function StyleEditor({ value, onChange, ...props }) {
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

export default StyleEditor;
