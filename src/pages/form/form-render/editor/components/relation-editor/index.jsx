import React from "react";
import useUnmountedRef from "ahooks/lib/useUnmountedRef";
import useUpdate from "ahooks/lib/useUpdate";
import differenceWith from "lodash/differenceWith";
import { Button, Select } from "antd";
import { langs } from "@uiw/codemirror-extensions-langs";
import Icon from "@/common/components/icon";
import { CodePopover } from "../code-editor";
import "./index.css";

const extensions = [langs.javascript()];

const effectOptions = [
  { label: "隐藏", value: "hidden" },
  { label: "禁用", value: "disabled" },
  { label: "修改", value: "changeValue" },
];

function RelationEditor({ size, source, columns, value, onChange }) {
  const ctrlRef = React.useRef({ targets: [], next: null, labels: {}, targetEffectOptions: {}, effectLabels: {} });
  const [editTarget, setEditTarget] = React.useState(null);
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

  const syncCtrl = React.useCallback(
    type => {
      if (type === "target" || !type) {
        ctrlRef.current.targets = differenceWith(columns, valueRef.current, (x, y) => x.value === y.target);
        if (ctrlRef.current.targets.length > 0) ctrlRef.current.next = ctrlRef.current.targets[0];
      }
      if (type === "effect" || !type) {
        valueRef.current.forEach(relation => {
          ctrlRef.current.targetEffectOptions[relation.target] = differenceWith(effectOptions, relation.effects, (x, y) => x.value === y.type);
        });
      }
      update();
    },
    [columns]
  );

  const handleNextRelation = React.useCallback(e => {
    ctrlRef.current.next = e;
    update();
  }, []);

  const handleAddRelation = React.useCallback(() => {
    const target = ctrlRef.current.next?.value;
    if (target) valueRef.current.push({ source, target, effects: [] });
    syncCtrl("target");
  }, [source]);

  const handleAddEffect = React.useCallback((value, ix) => {
    const defaultFunc = value === "changeValue" ? "return value;" : "return !value;";
    valueRef.current[ix].effects.push({ type: value, func: defaultFunc });
    // syncCtrl("effect");
    onChange && onChange(valueRef.current);
  }, []);

  const handleEffectFunc = React.useCallback((value, ix, ex) => {
    valueRef.current[ix].effects[ex].func = value;
    // update();
    onChange && onChange(valueRef.current);
  }, []);

  const handleRelationRemove = React.useCallback(ix => {
    valueRef.current.splice(ix, 1);
    // syncCtrl("target");
    onChange && onChange(valueRef.current);
  }, []);

  const handleEffectRemove = React.useCallback((ix, ex) => {
    valueRef.current[ix].effects.splice(ex, 1);
    // syncCtrl("effect");
    onChange && onChange(valueRef.current);
  }, []);

  React.useEffect(() => {
    columns.forEach(item => (ctrlRef.current.labels[item.value] = item.label));
    syncCtrl();
  }, [columns]);

  React.useEffect(() => {
    valueRef.current = value || [];
    syncCtrl();
  }, [value, source]);

  return (
    <div className="relation-editor">
      <div className="relation-editor-source">
        <div className="relation-editor-unit-label">- 控制位 -</div>
        <div className="relation-editor-source-node">{getTargetLabel(source)}</div>
      </div>
      {valueRef.current.map((item, ix) => (
        <div className="relation-editor-item" key={item.target}>
          <div className="relation-editor-unit-label">- 执行位 -</div>
          {editTarget === item.target ? (
            <div className="relation-editor-item-target-config" onMouseEnter={handleCancelClearEditTarget} onMouseLeave={handleClearEditTarget}>
              <span className="relation-editor-item-target-label">执行效果：</span>
              <Select
                className="relation-editor-item-target-select"
                size={size}
                placeholder="请选择"
                options={ctrlRef.current.targetEffectOptions[item.target] || effectOptions}
                value={null}
                onChange={e => handleAddEffect(e, ix)}
              />
            </div>
          ) : (
            <div className="relation-editor-item-target">
              <Button className="relation-editor-item-target-node" size={size} onClick={() => setEditTarget(item.target)}>
                {getTargetLabel(item.target)}
              </Button>
              <Button
                className="relation-editor-item-target-remove"
                type="link"
                danger
                size={size}
                icon={<Icon type="icon-reduce" />}
                onClick={() => handleRelationRemove(ix)}
              />
            </div>
          )}
          {item.effects.map((effect, ex) => (
            <div className="relation-editor-item-effect" key={effect.type}>
              <CodePopover
                placement="leftBottom"
                width="480px"
                prefix={"function (val, all) {"}
                suffix={"}"}
                extensions={extensions}
                value={effect.func}
                onChange={e => handleEffectFunc(e, ix, ex)}
              >
                <Button className="relation-editor-item-effect-func" size={size} icon={<Icon type="icon-code" />} />
              </CodePopover>
              <div className="relation-editor-item-effect-type">{getEffectLabel(effect.type)}</div>
              <Button
                className="relation-editor-item-effect-remove"
                type="link"
                danger
                size={size}
                icon={<Icon type="icon-reduce" />}
                onClick={() => handleEffectRemove(ix, ex)}
              />
            </div>
          ))}
        </div>
      ))}
      {ctrlRef.current.targets.length > 0 && (
        <React.Fragment>
          <div className="relation-editor-unit-label">选择添加执行位</div>
          <div className="relation-editor-add">
            <Select
              labelInValue
              size={size}
              placeholder="请选择"
              options={ctrlRef.current.targets}
              value={ctrlRef.current.next}
              onChange={handleNextRelation}
            />
            <Button type="dashed" size={size} icon={<Icon type="icon-add-select" />} style={{ width: 60 }} onClick={handleAddRelation} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default RelationEditor;
