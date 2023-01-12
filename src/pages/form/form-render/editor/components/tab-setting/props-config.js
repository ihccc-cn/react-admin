export const formProps = [
  {
    title: "Form",
    name: "group-form",
    type: "Group",
    icon: "icon-product",
  },
  {
    title: "显示冒号",
    name: "colon",
    tip: "表示是否显示 label 后面的冒号（只有在属性 表单布局 为 horizontal 时有效）。",
    type: "Switch",
  },
  {
    title: "是否禁用",
    name: "disabled",
    tip: "设置表单组件禁用，仅对 antd 组件有效。[antd 版本 4.21.0]",
    type: "Switch",
  },
  {
    title: "标签对齐",
    name: "labelAlign",
    tip: "label 标签的文本对齐方式。",
    type: "Select",
  },
  {
    title: "标签换行",
    name: "labelWrap",
    tip: "label 标签的文本换行方式。[antd 版本 4.18.0]",
    type: "Switch",
  },
  {
    title: "表单布局",
    name: "layout",
    type: "Select",
  },
  {
    title: "表单名称",
    name: "name",
    type: "Input",
  },
  {
    title: "保留值",
    name: "preserve",
    tip: "当字段被删除时保留字段值。[antd 版本 4.4.0]",
    type: "Switch",
  },
  {
    title: "必选样式",
    name: "requiredMark",
    tip: "必选样式，可以切换为必选或者可选展示样式。[antd 版本 4.6.0]",
    type: "Select",
  },
  {
    title: "失败自动滚动",
    name: "scrollToFirstError",
    tip: "提交失败自动滚动到第一个错误字段。",
    type: "Switch",
  },
  {
    title: "尺寸",
    name: "size",
    tip: "设置字段组件的尺寸（仅限 antd 组件）。",
    type: "Select",
    options: "field.size",
  },
  {
    title: "验证时机",
    name: "validateTrigger",
    tip: "统一设置字段触发验证的时机。[antd 版本 4.3.0]",
    type: "Select",
  },
  {
    title: "样式",
    name: "style",
    type: "TextArea",
  },
];

export const formItemProps = [
  {
    title: "Form.Item",
    name: "group-form-item",
    type: "Group",
    icon: "icon-Similarproducts",
  },
  {
    title: "显示冒号",
    name: "colon",
    tip: "配合 label 属性使用，表示是否显示 label 后面的冒号。",
    type: "Switch",
  },
  {
    title: "显示校验状态",
    name: "hasFeedback",
    tip: "配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用。",
    type: "Switch",
  },
  {
    title: "是否隐藏字段",
    name: "hidden",
    tip: "是否隐藏字段（依然会收集和校验字段）。[antd 版本 4.4.0]",
    type: "Switch",
  },
  {
    title: "标签文本",
    name: "label",
    type: "Input",
  },
  {
    title: "标签对齐",
    name: "labelAlign",
    tip: "label 标签的文本对齐方式。",
    type: "Select",
  },
  {
    title: "字段名",
    name: "name",
    type: "Input",
  },
  {
    title: "无样式",
    name: "noStyle",
    tip: "开启时不带样式，作为纯字段控件使用",
    type: "Switch",
  },
  {
    title: "保留值",
    name: "preserve",
    tip: "当字段被删除时保留字段值。[antd 版本 4.4.0]",
    type: "Switch",
  },
  {
    title: "必填",
    name: "required",
    tip: "必填样式设置。如不设置，则会根据校验规则自动生成",
    type: "Switch",
  },
  {
    title: "验证时机",
    name: "trigger",
    tip: "设置收集字段值变更的时机。",
    type: "Select",
    extra: {
      type: "info-link",
      props: { prefix: "还有疑问？", text: "查看示例", href: "https://ant-design.gitee.io/components/form-cn#components-form-demo-customized-form-controls" },
    },
  },
  {
    title: "校验滚动",
    name: "validateFirst",
    tip: "当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验。parallel 支持: [antd 版本 4.4.0]",
    type: "Switch",
  },
  {
    title: "验证时机",
    name: "validateTrigger",
    tip: "设置字段触发验证的时机。",
    type: "Select",
  },
  {
    title: "值属性",
    name: "valuePropName",
    tip: "子节点的值的属性，如 Switch 的是 'checked'。",
    type: "Input",
    props: { defaultValue: "value" },
  },
];
