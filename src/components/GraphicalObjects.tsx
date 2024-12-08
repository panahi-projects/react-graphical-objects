import React, { useEffect, useState } from "react";

type Shape = "circle" | "square" | "triangle";

interface ShapeConfig {
  type: Shape;
  size: number;
  color: string;
  position?: { x: number; y: number }; // Optional specific position
}

interface GraphicalObjectsProps {
  shapes: ShapeConfig[]; // Shapes based on JSON schema
  randomize?: boolean; // Whether to randomize positions
  containerStyle?: React.CSSProperties; // Style for the container
}

const GraphicalObjects: React.FC<GraphicalObjectsProps> = ({
  shapes,
  randomize = true,
  containerStyle = {},
}) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (randomize) {
      const randomPositions = shapes.map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setPositions(randomPositions);
    }
  }, [shapes, randomize]);

  const renderShape = (shape: ShapeConfig, index: number) => {
    const { type, size, color } = shape;
    const position = randomize
      ? positions[index]
      : shape.position || { x: 0, y: 0 };

    const commonStyle: React.CSSProperties = {
      position: "absolute",
      width: size,
      height: size,
      backgroundColor: color,
      top: position.y,
      left: position.x,
    };

    if (type === "circle") {
      return (
        <div key={index} style={{ ...commonStyle, borderRadius: "50%" }} />
      );
    } else if (type === "square") {
      return <div key={index} style={commonStyle} />;
    } else if (type === "triangle") {
      return (
        <div
          key={index}
          style={{
            ...commonStyle,
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
          }}
        />
      );
    }
  };

  return (
    <div style={{ position: "relative", ...containerStyle }}>
      {shapes.map((shape, index) => renderShape(shape, index))}
    </div>
  );
};

export default GraphicalObjects;
