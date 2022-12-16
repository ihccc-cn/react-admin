// import { Button } from "antd";
import ListLayout from "./list-layout";

// 列表布局组件 ListLayout ：用于搜索栏，列表功能栏，列表等布局，位于最外层
// 搜索栏布局组件 SearchLayout ：用于放置搜索表单和表单按钮，表单伸缩等布局情况
// 表单布局组件 FormRender ：用于渲染序列化的表单的组件，序列化表单为以后开发表单编辑器做铺垫
// 列表组件 List ：默认使用表格组件

function BaseList() {
  return (
    <ListLayout head={"搜索栏"} neck={"功能栏"}>
      <div>List</div>
    </ListLayout>
  );
}

export default BaseList;
