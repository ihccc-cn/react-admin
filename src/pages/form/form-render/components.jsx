import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber, Radio, Rate, Select, Slider, Switch, TimePicker, TreeSelect, Upload } from "antd";
// import Icon from "@/common/components/icon";

// function UplpadButton(props) {
//   return (
//     <Upload {...props}>
//       <Button icon={<Icon type="icon-upload" />}>点击上传</Button>
//     </Upload>
//   );
// }

const components = {
  // Cascader,
  // Checkbox,
  // DatePicker,
  Input,
  InputNumber,
  Password: Input.Password,
  // Radio: Radio.Group,
  Rate,
  Select,
  Slider,
  Switch,
  TextArea: Input.TextArea,
  // TimePicker,
  // TreeSelect,
  // Upload: UplpadButton,
  Br: "br",
};

export default components;
