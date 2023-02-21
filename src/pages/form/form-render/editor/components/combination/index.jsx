import React from "react";
import useUpdate from "ahooks/lib/useUpdate";
import { Button } from "antd";
import Icon from "@/common/components/icon";
import { inputValueFormat } from "@/utils";
import "./index.css";

function Combination({ buttonProps, labels, fields, newValue, value, onChange, children }) {
  const [length, setLength] = React.useState(value?.length || 0);
  const valueRef = React.useRef(value || []);
  const update = useUpdate();

  const cells = React.useMemo(() => {
    let cells = [];
    const len = React.Children.count(children);
    while (cells.length < length * len) cells = cells.concat(children);
    return cells;
  }, [length]);

  const getIndex = React.useCallback(index => [~~(index / fields.length), fields[index % fields.length]], []);

  const getValue = React.useCallback(index => {
    if (fields.length > 0) {
      const [inx, key] = getIndex(index);
      return valueRef.current[inx][key];
    }
    return valueRef.current[index];
  }, []);

  const handleAddNodes = React.useCallback(() => {
    valueRef.current.push(newValue);
    onChange && onChange(valueRef.current);
    setLength(length => length + 1);
  }, [onChange]);

  const handleRemove = React.useCallback(
    index => {
      valueRef.current.splice(index, 1);
      onChange && onChange(valueRef.current);
      setLength(length => length - 1);
    },
    [onChange]
  );

  const handleChange = React.useCallback(
    (index, e) => {
      const value = inputValueFormat(e);
      if (fields.length > 0) {
        const [inx, key] = getIndex(index);
        valueRef.current[inx][key] = value;
      } else {
        valueRef.current[index] = value;
      }
      onChange && onChange(valueRef.current);
      update();
    },
    [onChange]
  );

  return (
    <div>
      {cells.map((item, index) => {
        const label = labels[index % fields.length];
        const inputNode = React.cloneElement(item, { value: getValue(index), onChange: e => handleChange(index, e) });
        return (
          <div className="combination-item" key={index + ""}>
            {!label ? (
              inputNode
            ) : (
              <div className="combination-item-input">
                {labels[index % fields.length] && <span>{labels[index % fields.length]}</span>}
                {inputNode}
              </div>
            )}
            {fields.length > 0 && index % fields.length > 0 ? (
              <span className="combination-item-placeholder"></span>
            ) : (
              <span className="combination-item-remove" onClick={() => handleRemove(index)}>
                <Icon type="icon-reduce" />
              </span>
            )}
          </div>
        );
      })}
      <Button block type="dashed" icon={<Icon type="icon-add-select" />} style={{ width: "100%" }} {...buttonProps} onClick={handleAddNodes} />
    </div>
  );
}

Combination.defaultProps = {
  labels: [],
  fields: [],
};

export default Combination;
