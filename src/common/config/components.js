import React from "react";

export default {
  /**
   * 基础布局
   */
  layout: React.lazy(() => import("@/layout/main-layout")),

  /**
   * 首页
   */
  home: React.lazy(() => import("@/pages/home")),

  /**
   * 表格列表
   */
  tableList: React.lazy(() => import("@/pages/table-list/basic")),

  /**
   * 表单页面
   */
  formBasic: React.lazy(() => import("@/pages/form/basic")),

  /**
   * 组织架构
   */
  organzation: React.lazy(() => import("@/pages/organzation")),

  /**
   * 消息中心
   */
  message: React.lazy(() => import("@/pages/message")),

  /**
   * 统计分析
   */
  analysis: React.lazy(() => import("@/pages/analysis")),

  /**
   * page 404
   */
  404: React.lazy(() => import("@/404")),
};
