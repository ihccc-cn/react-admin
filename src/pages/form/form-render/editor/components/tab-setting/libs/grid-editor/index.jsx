import React from "react";
import useUpdate from "ahooks/lib/useUpdate";
import differenceWith from "lodash/differenceWith";
import { Button, Radio, Select } from "antd";
import Icon from "@/common/components/icon";
import { inputValueFormat } from "@/utils";
import ColInput, { SpanInput } from "./col-input";
import "./index.css";

const mediaOptions = [
  { label: "默认", value: "default" },
  { label: "xs < 576px", value: "xs" },
  { label: "sm ≥ 576px", value: "sm" },
  { label: "md ≥ 768px", value: "md" },
  { label: "lg ≥ 992px", value: "lg" },
  { label: "xl ≥ 1200px", value: "xl" },
  { label: "xxl ≥ 1600px", value: "xxl" },
];

const inputType = [
  { label: "数值", value: "number" },
  { label: "对象", value: "object" },
];

const colPropsConfig = [
  { name: "span", style: { width: "50%", paddingRight: 4 } },
  { name: "flex", style: { width: "50%", paddingLeft: 4 }, type: "Input" },
  { name: "push", style: { width: "50%", paddingRight: 4 }, defaultValue: 0 },
  { name: "pull", style: { width: "50%", paddingLeft: 4 }, defaultValue: 0 },
  { name: "offset", style: { width: "50%", paddingRight: 4 }, defaultValue: 0 },
  { name: "order", style: { width: "50%", paddingLeft: 4 }, defaultValue: 0 },
];

function GridEditor({ size, value, onChange }) {
  const ctrlRef = React.useRef({ nodes: [], medias: mediaOptions, next: { media: mediaOptions[0], type: "number" } });
  const valueRef = React.useRef({});
  const update = useUpdate();

  const changeFormat = React.useCallback(
    value => {
      value = Object.assign({}, value);
      if (typeof value.default === "number") {
        value.span = value.default;
      } else if (typeof value.default === "object") {
        value = Object.assign(value, value.default);
      }
      delete value.default;
      onChange && onChange(value);
    },
    [onChange]
  );

  const handleNextMedia = React.useCallback(e => {
    ctrlRef.current.next.media = inputValueFormat(e);
    update();
  }, []);

  const handleNextType = React.useCallback(e => {
    ctrlRef.current.next.type = inputValueFormat(e);
    update();
  }, []);

  const syncMedias = React.useCallback(() => {
    ctrlRef.current.medias = differenceWith(mediaOptions, ctrlRef.current.nodes, (x, y) => x.value === y.media.value);
    const currentMedias = ctrlRef.current.medias;
    if (currentMedias.length > 0) ctrlRef.current.next.media = currentMedias[0];
    update();
  }, []);

  const handleAddNodes = React.useCallback(() => {
    ctrlRef.current.nodes = ctrlRef.current.nodes.concat(Object.assign({}, ctrlRef.current.next));
    syncMedias();
  }, []);

  const handleRemove = React.useCallback((item, index) => {
    delete valueRef.current[item.media.value];
    changeFormat && changeFormat(valueRef.current);
    ctrlRef.current.nodes.splice(index, 1);
    syncMedias();
  }, []);

  const handleChange = React.useCallback(
    item => (name, e) => {
      const media = item.media.value;
      const value = inputValueFormat(e);
      if (typeof valueRef.current[media] !== "object") valueRef.current[media] = {};
      valueRef.current[media][name] = value;
      changeFormat && changeFormat(valueRef.current);
    },
    [changeFormat]
  );

  React.useEffect(() => {
    const colProps = colPropsConfig.map(item => item.name);
    const isNodesEmpty = ctrlRef.current.nodes.length === 0;
    if (isNodesEmpty) {
      const nodes = [];
      let defaultMediaCount = 0;
      for (const key in value) {
        if (colProps.indexOf(key) > -1) {
          defaultMediaCount++;
        } else {
          nodes.push({ type: typeof value[key], media: mediaOptions.find(item => item.value === key) });
        }
      }
      if (defaultMediaCount > 0) {
        nodes.unshift({
          type: defaultMediaCount === 1 && typeof value.span === "number" ? "number" : "object",
          media: mediaOptions.find(item => item.value === "default"),
        });
      }
      ctrlRef.current.nodes = nodes;
    }
    const newValue = Object.assign({}, value);
    for (const name of colProps) {
      if (name in newValue) {
        if (!newValue.default) newValue.default = {};
        newValue.default[name] = newValue[name];
        delete newValue[name];
      }
    }
    valueRef.current = newValue;
    isNodesEmpty ? syncMedias() : update();
  }, [value]);

  return (
    <div className="grid-editor">
      {ctrlRef.current.nodes.map((item, index) => (
        <div className="grid-editor-item" key={item.media.value}>
          <div className="grid-editor-item-head">
            <span className="grid-editor-item-type">{item.media.label}</span>
            <span className="grid-editor-item-remove" onClick={() => handleRemove(item, index)}>
              <Icon type="icon-reduce" />
            </span>
          </div>
          {item.type === "number" && (
            <SpanInput name="span" style={{ display: "block" }} data={valueRef.current[item.media.value]} onChange={handleChange(item)} />
          )}
          {item.type === "object" && <ColInput config={colPropsConfig} data={valueRef.current[item.media.value]} onChange={handleChange(item)} />}
        </div>
      ))}
      {ctrlRef.current.medias.length > 0 && (
        <React.Fragment>
          <div className="grid-editor-type-select">
            <Select labelInValue size={size} options={ctrlRef.current.medias} value={ctrlRef.current.next.media} onChange={handleNextMedia} />
            <Radio.Group size={size} options={inputType} optionType="button" buttonStyle="solid" value={ctrlRef.current.next.type} onChange={handleNextType} />
          </div>
          <Button block type="dashed" size={size} icon={<Icon type="icon-add-select" />} style={{ width: "100%" }} onClick={handleAddNodes} />
        </React.Fragment>
      )}
    </div>
  );
}

export default GridEditor;
