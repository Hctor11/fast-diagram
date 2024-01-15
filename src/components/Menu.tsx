
const Menu = () => {
  return (
    <div>
      <div
        draggable
        onDragStart={(event) => {
          const nodeData = { position: { x: 0, y: 0 } };
          event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeData));
        }}
      >
        Drag Me!
      </div>
      {/* Add more draggable elements as needed */}
    </div>
  )
}

export default Menu