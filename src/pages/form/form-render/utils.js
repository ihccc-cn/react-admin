import cloneDeep from "lodash/cloneDeep";

export const isObject = value => Object.prototype.toString.call(value) === "[object Object]";

export const uuid = ((start = 0) => {
  let id = start;
  return (prefix = "key") => `${prefix}_${id++}`;
})();

export const EditorUtil = {
  /**
   * 校验数据格式
   * @param {*} value
   * @returns
   */
  checkValue: value => {
    value = value || {};
    if (Array.isArray(value.columns) && isObject(value.layout)) return true;
    return false;
  },
  /**
   * 初始化数据格式
   * @param {*} value
   * @returns
   */
  initValue: value => {
    const cloneValue = cloneDeep(value);
    cloneValue.columns = cloneValue.columns.map(item => ({ ...item, id: uuid(), name: item.name || item.dataIndex }));
    return cloneValue;
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
