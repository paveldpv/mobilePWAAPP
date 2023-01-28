import { TPoint } from "./KonvaHole";

import { Line, Group, Text, Wedge } from "react-konva";

import { getCenterVector } from "../../function/getCenterVector";

type TlineIndicator = {
  globalCenterX: number;
  globalCenterY: number;
  pointRadius: number;
} & Omit<TPoint, "id" | "manual">;

export default function LineIndicatorPoint({
  active,
  completed,
  coordinate,
  globalCenterX,
  globalCenterY,
  pointRadius,
  carrier,
}: TlineIndicator) {
  const { absolute, relative } = coordinate;
  return (
    <Group opacity={completed ? 0 : active ? 1 : 0.5}>
      <Line
        dash={[10, 10]}
        stroke={active ? "#FCFFFD" : "#23232D"}
        opacity={0.08}
        points={[globalCenterX, globalCenterY, relative.x, relative.y]}
      />
      <Wedge
        x={globalCenterX}
        y={globalCenterY}
        radius={pointRadius * 4}
        angle={carrier}
        stroke={active ? "#FCFFFD" : "#23232D"}
        rotation={-carrier}
        
      />
      
      
      <Line
        stroke={active ? "#FCFFFD" : "1#23232D"}
        points={[relative.x, relative.y, 0 + globalCenterX, relative.y]}
        dash={[10, 10]}
        opacity={active ? 1 : 0.5}
      />
      <Text
        text={`${Math.abs(+absolute.x.toFixed(2))}`}
        fontSize={18}
        fill={active ? "#FCFFFD" : "17181C"}
        x={getCenterVector(relative.x, globalCenterX, -20)}
        y={relative.y - 20}
        opacity={active ? 1 : 0.5}
      />

      <Line
        stroke={active ? "#FCFFFD" : "17181C"}
        points={[relative.x, relative.y, relative.x, 0 + globalCenterY]}
        dash={[10, 10]}
        opacity={active ? 1 : 0.5}
      />
      <Text
        text={`${Math.abs(+absolute.y.toFixed(2))}`}
        fontSize={18}
        fill={active ? "#FCFFFD" : "17181C"}
        y={getCenterVector(relative.y, globalCenterY, -20)}
        x={relative.x + 20}
        rotation={90}
        opacity={active ? 1 : 0.5}
      />
    </Group>
  );
}
