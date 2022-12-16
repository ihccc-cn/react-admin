import app from "@/core";

/**
 * 获取所有角色缓存
 */
export async function query(params) {
  return app.request("/role/query", {
    params,
  });
}
