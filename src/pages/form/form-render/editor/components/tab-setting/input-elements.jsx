import React from "react";
import { Input, InputNumber, Radio, Select, Slider, Switch } from "antd";
import ArrayInput from "../array-input";
import GridEditor from "../grid-editor";
import RelationEditor from "../relation-editor";
import RulesEditor from "../rules-editor";
import ScreenEditor from "../screen-editor";
import StyleEditor from "../style-editor";

const inputElements = {
  Input: <Input size="small" placeholder="请输入" />,
  InputNumber: <InputNumber size="small" placeholder="请输入" />,
  Radio: <Radio.Group size="small" />,
  Select: <Select size="small" placeholder="请选择" style={{ width: "100%" }} />,
  Slider: <Slider />,
  Switch: <Switch size="small" />,
  TextArea: <Input.TextArea size="small" rows={5} placeholder="请输入" />,
  ArrayInput: <ArrayInput size="small" placeholder="请输入" buttonProps={{ size: "small" }} />,
  GridEditor: <GridEditor size="small" />,
  RelationEditor: <RelationEditor size="small" />,
  RulesEditor: <RulesEditor size="small" buttonProps={{ size: "small" }} />,
  ScreenEditor: <ScreenEditor size="small" />,
  StyleEditor: <StyleEditor size="small" rows={5} placeholder="请输入" />,
};

export default inputElements;
