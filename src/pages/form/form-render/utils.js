import cloneDeep from "lodash/cloneDeep";

export const version = "1.0.0";

export const isObject = value => Object.prototype.toString.call(value) === "[object Object]";

export const uuid = ((start = 0) => {
  let id = start;
  return (prefix = "key") => `${prefix}_${id++}`;
})();

function jsxTemplate(data) {
  return `<Form name="basic" layout="vertical">
  <Row gutter={[10, 10]}>
    <Col span={24}>
      <Form.Item name="name">
        <Input placeholder="请输入" />
      </Form.Item>
    </Col>
  </Row>
</Form>`;
}

export const EditorUtil = {
  /**
   * 校验数据格式
   * @param {*} value
   * @returns
   */
  checkValue: value => {
    value = value || {};
    if (Array.isArray(value.columns) && isObject(value.layout) && !!value.layout.type) return true;
    return false;
  },
  /**
   * 转换导入数据格式
   * @param {*} value
   * @returns
   */
  importValue: value => {
    const cloneValue = cloneDeep(value);
    cloneValue.columns = cloneValue.columns.map(item => ({ ...item, id: uuid(), name: item.name || item.dataIndex }));
    cloneValue.version = version;
    return cloneValue;
  },
  /**
   * 转换导出 json 格式
   * @param {*} value
   * @returns
   */
  exportJson: value => {
    const cloneValue = cloneDeep(value);
    cloneValue.columns = cloneValue.columns.map(({ id, selected, chosen, ...column }) => column);
    cloneValue.version = version;
    return JSON.stringify(cloneValue, null, 2);
  },
  /**
   * 转换导出 jsx 格式
   * @param {*} value
   * @returns
   */
  exportJsx: value => {
    return jsxTemplate(value);
  },
};

/**
 * 百分比转数字
 * @param {*} string
 * @returns
 */
export const p2n = string => +(string + "").replace("%", "") || 0;

/**
 * 百分比的加法运算
 * @param {*} x
 * @param {*} y
 * @returns
 */
export const addPercent = (x, y) => p2n(x) + p2n(y) + "%";

/**
 * 根据索引交换数组元素
 * @param {*} array 数组
 * @param {*} x 索引1
 * @param {*} y 索引2
 * @returns
 */
export const swap = (array, x, y) => {
  if (x < 0 || x >= array.length || y < 0 || y >= array.length) return array;
  const arrayCopy = [...array];
  const tempNode = arrayCopy[x];
  arrayCopy[x] = arrayCopy[y];
  arrayCopy[y] = tempNode;
  return arrayCopy;
};

/**
 * 格式化输入值
 * @param {*} event
 * @returns
 */
export const inputValueFormat = event => {
  if (event && event.target) return event.target.value;
  return event;
};

export const stopPropagationEvent = fn => event => {
  event.stopPropagation();
  event.nativeEvent?.stopImmediatePropagation();
  fn && fn(event);
};
