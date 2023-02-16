import React from "react";
import useUnmountedRef from "ahooks/lib/useUnmountedRef";
import useUpdate from "ahooks/lib/useUpdate";
import differenceWith from "lodash/differenceWith";
import { Button, Select } from "antd";
import Icon from "@/common/components/icon";
import "./index.css";

const effectOptions = [
  { label: "隐藏", value: "hidden" },
  { label: "禁用", value: "disabled" },
  { label: "修改", value: "changeValue" },
];

function RelationEditor({ size, source, columns, value, onChange }) {
  const ctrlRef = React.useRef({ targets: [], next: null, labels: {}, effectLabels: {} });
  const [editTarget, setEditTarget] = React.useState(null);
  // [{
  //   source: "password",
  //   target: "username",
  //   effects: [{ type: "hidden", func: "return false;" }, { type: "disabled", func: "return false;" }]
  // }]
  const valueRef = React.useRef([]);
  const clearEditTargetTimer = React.useRef(null);
  const update = useUpdate();
  const unmountedRef = useUnmountedRef();

  const getTargetLabel = React.useCallback(name => {
    return ctrlRef.current.labels[name] || name;
  }, []);

  const getEffectLabel = React.useCallback(name => {
    if (!ctrlRef.current.effectLabels[name]) {
      effectOptions.forEach(option => (ctrlRef.current.effectLabels[option.value] = option.label));
    }
    return ctrlRef.current.effectLabels[name] || name;
  }, []);

  const handleClearEditTarget = React.useCallback(() => {
    clearEditTargetTimer.current = setTimeout(() => {
      if (unmountedRef.current) return;
      setEditTarget(null);
    }, 2000);
  }, []);

  const handleCancelClearEditTarget = React.useCallback(() => {
    if (clearEditTargetTimer.current) clearTimeout(clearEditTargetTimer.current);
  }, []);

  const syncCtrl = React.useCallback(() => {
    ctrlRef.current.targets = differenceWith(columns, valueRef.current, (x, y) => x.value === y.target);
    const currentTargets = ctrlRef.current.targets;
    if (currentTargets.length > 0) ctrlRef.current.next = currentTargets[0];
    update();
  }, [columns]);

  const handleNextRelation = React.useCallback(e => {
    ctrlRef.current.next = e;
    update();
  }, []);

  const handleAddRelation = React.useCallback(() => {
    const target = ctrlRef.current.next?.value;
    if (target) valueRef.current.push({ source, target, effects: [] });
    syncCtrl();
  }, []);

  const handleAddEffect = React.useCallback((value, ix) => {
    valueRef.current[ix].effects.push({ type: value, func: "" });
    syncCtrl();
  }, []);

  const handleRemoveRelation = React.useCallback(ix => {
    valueRef.current.splice(ix, 1);
    syncCtrl();
  }, []);

  const handleRemoveEffect = React.useCallback((ix, ex) => {
    valueRef.current[ix].effects.splice(ex, 1);
    update();
  }, []);

  React.useEffect(() => {
    columns.forEach(item => (ctrlRef.current.labels[item.value] = item.label));
    syncCtrl();
  }, [columns]);

  React.useEffect(() => {
    valueRef.current = value || [];
  }, [value]);

  return (
    <div className="relation-editor">
      <div className="relation-editor-source">
        <span className="relation-editor-source-label">控制位：</span>
        <div className="relation-editor-source-node">{getTargetLabel(source)}</div>
      </div>
      {valueRef.current.map((item, ix) => (
        <div className="relation-editor-item" key={item.target}>
          {editTarget === item.target ? (
            <div className="relation-editor-item-target-config" onMouseEnter={handleCancelClearEditTarget} onMouseLeave={handleClearEditTarget}>
              <span className="relation-editor-item-target-label">控制效果：</span>
              <Select
                className="relation-editor-item-target-select"
                size={size}
                placeholder="请选择"
                options={effectOptions}
                // value={""}
                onChange={e => handleAddEffect(e, ix)}
              />
              <Button
                className="relation-editor-item-target-remove"
                type="link"
                danger
                size={size}
                icon={<Icon type="icon-reduce" />}
                onClick={() => handleRemoveRelation(ix)}
              />
            </div>
          ) : (
            <div className="relation-editor-item-target">
              <span className="relation-editor-item-target-label">执行位：</span>
              <div className="relation-editor-item-target-node">{getTargetLabel(item.target)}</div>
              <span className="relation-editor-item-target-add" onClick={() => setEditTarget(item.target)}>
                <Icon type="icon-conditions" />
              </span>
            </div>
          )}
          {item.effects.map((effect, ex) => (
            <div className="relation-editor-item-effect" key={effect.type}>
              <Button className="relation-editor-item-effect-func" size={size} icon={<Icon type="icon-code" />} />
              <div className="relation-editor-item-effect-type">{getEffectLabel(effect.type)}</div>
              <Button
                className="relation-editor-item-effect-remove"
                type="link"
                danger
                size={size}
                icon={<Icon type="icon-reduce" />}
                onClick={() => handleRemoveEffect(ix, ex)}
              />
            </div>
          ))}
        </div>
      ))}
      {ctrlRef.current.targets.length > 0 && (
        <div className="relation-editor-add">
          <Select labelInValue size={size} placeholder="请选择" options={ctrlRef.current.targets} value={ctrlRef.current.next} onChange={handleNextRelation} />
          <Button type="dashed" size={size} icon={<Icon type="icon-add-select" />} style={{ width: 60 }} onClick={handleAddRelation} />
        </div>
      )}
    </div>
  );
}

export default RelationEditor;
