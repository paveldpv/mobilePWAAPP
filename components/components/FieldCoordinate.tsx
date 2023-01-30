import { Group, Circle, Arrow, Text } from "react-konva";
import { forwardRef,RefObject } from "react";


type TFiletCoordinate = {
  globalCenterY: number;
  globalCenterX: number;
  radius: number;
};


export default function FieldCoordinate({radius,globalCenterX,globalCenterY}: TFiletCoordinate) {
  return (
    <Group>
       <Circle
            x={globalCenterX}
            y={globalCenterY}
            radius={radius}
            stroke="#776AD6"
            opacity={0.4}
          />
          <Arrow
            dash={[33, 10]}
            stroke={`#FCFFFD`}
            y={globalCenterY}
            x={globalCenterX}
            points={[-radius - 18, 0, radius + 18, 0]}
          />
          <Text
            x={globalCenterX + radius + 5}
            y={globalCenterY + 10}
            fontSize={24}
            text="X"
            fill="#FCFFFD"
          />
          <Arrow
            dash={[33, 10]}
            stroke={`#FCFFFD`}
            y={globalCenterY}
            x={globalCenterX}
            points={[0, radius + 18, 0, -radius - 55]}
          />
          <Text
            x={globalCenterX + 10}
            y={globalCenterY - radius - 40}
            text="Y"
            fontSize={24}
            fill="#FCFFFD"
          />
    </Group>
  )
}
