"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import Menu from "@/components/Menu";
import type { Node } from "reactflow";


const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Node 1" },
  },
  {
    id: "2",
    position: { x: 100, y: 200 },
    data: { label: "Node 2" },
  },
];

const initialEdges: any = [];

export default function Flow() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowNode: { position: { x: number; y: number } } = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      if (reactFlowNode) {
        const { x, y } = reactFlowNode.position;
        const newNode: Node = {
          id: (nodes.length + 1).toString(),
          position: { x, y },
          data: { label: `Node ${nodes.length + 1}` },
        };

        setNodes((prevNodes:any) => [...prevNodes, newNode]);
      }
    },
    [setNodes, nodes]
  );
  
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => event.preventDefault(), []);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flex w-screen h-screen">
       <div
        style={{
          width: "100%",
          height: "100%", // Set the desired height of your canvas
          border: "1px solid #ddd",
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
      <Menu />
    </div>
  );
}
