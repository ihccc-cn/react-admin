import React from "react";

export default {
  /**
   * 基础布局
   */
  layout: React.lazy(async () => await import("@/layout/main-layout")),

  /**
   * 首页
   */
  home: React.lazy(async () => await import("@/pages/home")),

  /**
   * 组织架构
   */
  organzation: React.lazy(async () => await import("@/pages/organzation")),

  /**
   * 消息中心
   */
  message: React.lazy(async () => await import("@/pages/message")),

  /**
   * 统计分析
   */
  analysis: React.lazy(async () => await import("@/pages/analysis")),

  /**
   * page 404
   */
  404: React.lazy(() => import("@/404")),
};
