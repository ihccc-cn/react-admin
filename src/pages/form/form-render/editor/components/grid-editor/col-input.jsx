import React from "react";
import clsx from "clsx";
import { InputNumber, Input } from "antd";
import "./col-input.css";

function SpanInput({ name, row, type, style, defaultValue, data, onChange }) {
  const handleChange = React.useCallback(name => e => onChange(name, e), [onChange]);

  return (
    <div className={clsx(!row ? "span-input" : "span-input-row")} style={style}>
      {name && <div className="span-input-title">{name}</div>}
      {type === "Input" ? (
        <Input size="small" placeholder="请输入" defaultValue={defaultValue} value={data[name]} onChange={handleChange(name)} />
      ) : (
        <InputNumber
          size="small"
          min={0}
          max={24}
          placeholder="请输入"
          style={{ width: "100%" }}
          defaultValue={defaultValue}
          value={data[name]}
          onChange={handleChange(name)}
        />
      )}
    </div>
  );
}

SpanInput.defaultProps = {
  data: {},
};

function ColInput({ config, data, onChange }) {
  return (
    <React.Fragment>
      {config.map(item => (
        <SpanInput {...item} data={data} onChange={onChange} key={item.name} />
      ))}
    </React.Fragment>
  );
}

ColInput.defaultProps = {
  data: {},
};

export { SpanInput };

export default ColInput;
