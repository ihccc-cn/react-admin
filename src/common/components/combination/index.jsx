import React from "react";
import useUpdate from "ahooks/lib/useUpdate";
import { Button } from "antd";
import Icon from "@/common/components/icon";
import { inputValueFormat } from "@/utils";
import "./index.css";

function Combination({ buttonProps, newValue, value, onChange, children }) {
  const [nodes, setNodes] = React.useState(new Array(value.length).fill(children));
  const valueRef = React.useRef(value);
  const update = useUpdate();

  const addNodes = React.useCallback(() => {
    valueRef.current.push(newValue);
    setNodes(nodes => nodes.concat(children));
  }, [children]);

  const handleRemove = React.useCallback(
    index => {
      valueRef.current.splice(index, 1);
      onChange && onChange(valueRef.current);
      setNodes(nodes => {
        const newNodes = [...nodes];
        newNodes.splice(index, 1);
        return newNodes;
      });
    },
    [onChange]
  );

  const handleChange = React.useCallback(
    (index, e) => {
      valueRef.current[index] = inputValueFormat(e);
      onChange && onChange(valueRef.current);
      update();
    },
    [onChange]
  );

  return (
    <div>
      {nodes.map((item, index) => (
        <div className="combination-item" key={index + ""}>
          {React.cloneElement(item, { value: valueRef.current[index], onChange: e => handleChange(index, e) })}
          <span className="combination-item-remove" onClick={() => handleRemove(index)}>
            <Icon type="icon-reduce" />
          </span>
        </div>
      ))}
      <Button block type="dashed" icon={<Icon type="icon-add-select" />} style={{ width: "100%" }} {...buttonProps} onClick={addNodes} />
    </div>
  );
}

Combination.defaultProps = {
  newValue: "",
  value: [],
};

export default Combination;
