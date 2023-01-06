function CanvasEmpty() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#d5d5d5",
        fontSize: 20,
        fontWeight: "bold",
      }}
    >
      拖拽左侧栏目的组件进行添加
    </div>
  );
}

export default CanvasEmpty;
