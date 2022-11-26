import app from "@/core";

const { request } = app;

/**
 * 获取所有角色缓存
 */
export async function query(params) {
  return request("/api-mock/role/query", {
    params,
  });
}
