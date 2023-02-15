import React from "react";
import useUpdate from "ahooks/lib/useUpdate";
import { Button, Select } from "antd";
import Icon from "@/common/components/icon";
import "./index.css";

function RelationEditor({ size, value, onChange }) {
  // [{ source: "", target: "", effects: [] }]
  const valueRef = React.useRef([
    {
      source: "password",
      target: "用户名",
      effects: [
        { type: "hidden", func: "return false;" },
        { type: "disabled", func: "return false;" },
      ],
    },
  ]);
  const update = useUpdate();

  const handleNextRelation = React.useCallback(() => {}, []);

  const handleAddRelation = React.useCallback(() => {}, []);

  React.useEffect(() => {
    valueRef.current = [];
  }, [value]);

  return (
    <div className="relation-editor">
      <div className="relation-editor-source">
        <div className="relation-editor-source-label">触发表单</div>
        <div className="relation-editor-source-node">加密密码</div>
      </div>
      {valueRef.current.map(item => (
        <div className="relation-editor-item" key={item.target}>
          <div className="relation-editor-item-target">
            <div className="relation-editor-item-target-label">执行表单</div>
            <div className="relation-editor-item-target-node">{item.target}</div>
            <span className="relation-editor-item-target-add">
              <Icon type="icon-conditions" />
            </span>
          </div>
          {item.effects.map(effect => (
            <div className="relation-editor-item-effect" key={effect.type}>
              <div className="relation-editor-item-effect-func">条件代码</div>
              <div className="relation-editor-item-effect-type">{effect.type}</div>
              <span className="relation-editor-item-effect-remove" onClick={() => handleRemove(index)}>
                <Icon type="icon-reduce" />
              </span>
            </div>
          ))}
        </div>
      ))}
      <div className="relation-editor-add">
        <Select size={size} options={[]} onChange={handleNextRelation} />
        <Button type="dashed" size={size} icon={<Icon type="icon-add-select" />} style={{ width: 60 }} onClick={handleAddRelation} />
      </div>
    </div>
  );
}

export default RelationEditor;
