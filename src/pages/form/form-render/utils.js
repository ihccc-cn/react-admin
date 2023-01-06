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
