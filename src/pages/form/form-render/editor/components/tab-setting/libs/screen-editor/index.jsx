import React from "react";
import clsx from "clsx";
import useUpdate from "ahooks/lib/useUpdate";
import differenceWith from "lodash/differenceWith";
import { Button, Select } from "antd";
import Icon from "@/common/components/icon";
import { inputValueFormat } from "@/utils";
import "./index.css";

function ScreenEditor({ size, options, value, onChange }) {
  const ctrlRef = React.useRef({ screens: options, labelFormat: {}, next: options[0]?.value });
  const valueRef = React.useRef({ active: null, screens: [] });
  const update = useUpdate();

  const handleNextScreen = React.useCallback(e => {
    console.log(e);
    ctrlRef.current.next = inputValueFormat(e);
    update();
  }, []);

  const syncScreens = React.useCallback(() => {
    ctrlRef.current.screens = differenceWith(options, valueRef.current.screens, (x, y) => x.value === y);
    const currentScreens = ctrlRef.current.screens;
    if (currentScreens.length > 0) ctrlRef.current.next = currentScreens[0].value;
    update();
  }, []);

  const handleAddScreen = React.useCallback(() => {
    onChange &&
      onChange({
        // screens: valueRef.current.screens.concat(ctrlRef.current.next),
        active: ctrlRef.current.next,
        create: ctrlRef.current.next,
      });
  }, []);

  const handleActive = React.useCallback(item => {
    onChange && onChange({ active: item });
  }, []);

  const handleRemove = React.useCallback(index => {
    // const nextScreens = [...valueRef.current.screens];
    // nextScreens.splice(index, 1);
    // onChange && onChange({ ...valueRef.current, screens: nextScreens });
    onChange && onChange({ remove: valueRef.current.screens[index] });
  }, []);

  React.useEffect(() => {
    if (value) {
      valueRef.current = value;
      syncScreens();
    }
  }, [value]);

  React.useEffect(() => {
    if (options) {
      const labelFormat = {};
      options.forEach(item => (labelFormat[item.value] = item.label));
      ctrlRef.current.labelFormat = labelFormat;
    }
  }, [options]);

  return (
    <div className="screen-editor">
      {valueRef.current.screens.map((item, index) => (
        <div className={"screen-editor-item"} key={item}>
          <div className={clsx("screen-editor-item-type", valueRef.current.active === item && "screen-editor-item-active")} onClick={() => handleActive(item)}>
            {ctrlRef.current.labelFormat[item]}
          </div>
          {valueRef.current.active === item ? (
            <span className="screen-editor-item-icon-success">
              <Icon type="icon-success" />
            </span>
          ) : (
            <span className="screen-editor-item-icon-danger" onClick={() => handleRemove(index)}>
              <Icon type="icon-reduce" />
            </span>
          )}
        </div>
      ))}
      {ctrlRef.current.screens.length > 0 && (
        <React.Fragment>
          <div className="screen-editor-add">
            <Select size={size} options={ctrlRef.current.screens} value={ctrlRef.current.next} onChange={handleNextScreen} />
            <Button type="dashed" size={size} icon={<Icon type="icon-add-select" />} style={{ width: 60 }} onClick={handleAddScreen} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

ScreenEditor.defaultProps = {
  options: [],
};

export default ScreenEditor;
