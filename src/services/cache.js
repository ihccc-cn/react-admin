import app from "@/core";

const { request } = app;

/**
 * 获取所有角色缓存
 */
export async function roles(params) {
  return request("/api-mock/role/list", {
    params,
  });
}
