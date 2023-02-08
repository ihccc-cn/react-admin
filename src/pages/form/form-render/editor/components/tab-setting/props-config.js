export const formProps = {
  defaultProps: {},
  config: [
    {
      title: "表单",
      name: "group-form",
      type: "Group",
      icon: "icon-product",
    },
    {
      title: "显示冒号",
      name: "colon",
      tip: "表示是否显示 label 后面的冒号（只有在属性 表单布局 为 horizontal 时有效）。",
      type: "Switch",
      defaultValue: true,
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
      type: "Radio",
      defaultValue: "right",
      options: "form.labelAlign",
      props: { optionType: "button", buttonStyle: "solid" },
    },
    {
      title: "标签换行",
      name: "labelWrap",
      tip: "label 标签的文本换行方式。[antd 版本 4.18.0]",
      type: "Switch",
      defaultValue: false,
    },
    {
      title: "标签布局",
      name: "labelCol",
      type: "GridEditor",
      tip: "label 标签布局，同 <Col /> 组件。对 Form 的标签布局进行统一设置，不会作用于嵌套 Item。当和 Item 同时设置时，以 Item 为准。",
    },
    {
      title: "表单布局",
      name: "layout",
      type: "Radio",
      defaultValue: "horizontal",
      options: "form.layout",
      props: { optionType: "button", buttonStyle: "solid" },
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
      defaultValue: true,
    },
    {
      title: "必选样式",
      name: "requiredMark",
      tip: "必选样式，可以切换为必选或者可选展示样式。[antd 版本 4.6.0]",
      type: "Select",
      defaultValue: true,
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
      type: "Radio",
      options: "global.size",
      defaultValue: "middle",
      props: { optionType: "button", buttonStyle: "solid" },
    },
    {
      title: "验证时机",
      name: "validateTrigger",
      tip: "统一设置字段触发验证的时机。[antd 版本 4.3.0]",
      defaultValue: "onChange",
    },
    {
      title: "控件布局",
      name: "wrapperCol",
      type: "GridEditor",
      tip: "需要为输入控件设置布局样式时，使用该属性，用法同标签布局。对 Form 的控件布局进行统一设置。当和 Item 同时设置时，以 Item 为准。",
    },
    {
      title: "样式",
      name: "style",
      type: "StyleEditor",
    },
  ],
};

export const layoutProps = {
  defaultProps: {},
  config: [
    {
      title: "布局",
      name: "group-layout",
      type: "Group",
      icon: "icon-integral",
    },
    {
      title: "类型",
      name: "type",
      type: "Select",
      options: "layout.type",
      defaultValue: "basic-form-layout",
    },
    {
      title: "响应式布局",
      name: "active",
      type: "ScreenEditor",
      options: "layout.screen",
      defaultValue: { active: "default", screens: ["default"] },
    },
  ],
};

export const formItemProps = {
  defaultProps: {},
  config: [
    {
      title: "表单项",
      name: "group-form-item",
      type: "Group",
      icon: "icon-Similarproducts",
    },
    {
      title: "显示冒号",
      name: "colon",
      tip: "配合 label 属性使用，表示是否显示 label 后面的冒号。",
      type: "Switch",
      defaultValue: true,
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
      type: "Radio",
      defaultValue: "right",
      options: "form.labelAlign",
      props: { optionType: "button", buttonStyle: "solid" },
    },
    {
      title: "标签布局",
      name: "labelCol",
      type: "GridEditor",
      tip: "label 标签布局，同 <Col /> 组件。你可以通过 Form 的标签布局进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准。",
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
      defaultValue: true,
    },
    {
      title: "必填",
      name: "required",
      tip: "必填样式设置。如不设置，则会根据校验规则自动生成",
      type: "Switch",
    },
    {
      title: "校验规则",
      name: "rules",
      tip: "设置字段的校验逻辑。",
      type: "RulesEditor",
    },
    {
      title: "收集数据时机",
      name: "trigger",
      tip: "设置收集字段值变更的时机。",
      defaultValue: "onChange",
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
      defaultValue: "onChange",
    },
    {
      title: "值属性",
      name: "valuePropName",
      tip: "子节点的值的属性，如 Switch 的是 'checked'。",
      type: "Input",
      defaultValue: "value",
    },
    {
      title: "控件布局",
      name: "wrapperCol",
      type: "GridEditor",
      tip: "需要为输入控件设置布局样式时，使用该属性，用法同标签布局。你可以通过 Form 的标签布局进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准。",
    },
  ],
};

export const getComponentTitleProps = (title, config) =>
  [
    {
      title: `组件 ${title}`,
      name: "group-component",
      type: "Group",
      icon: "icon-component",
    },
  ].concat(config || []);

export const relationConfig = [
  {
    title: "动态关联",
    name: "group-relation",
    type: "Group",
    icon: "icon-connections",
  },
  {
    title: "新建规则",
    name: "rules",
    tip: "功能待完善",
    type: "ArrayInput",
  },
];

export const dataConfig = [
  {
    title: "数据",
    name: "group-data",
    type: "Group",
    icon: "icon-zijin",
  },
  {
    title: "新建数据",
    name: "rules",
    tip: "功能待完善",
    type: "ArrayInput",
  },
];
