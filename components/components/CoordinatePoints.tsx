import { Line, Text, Circle, Layer, Stage, Group } from "react-konva";
import { TPoint } from "./KonvaHole";

import { getCenterVector } from "../../function/getCenterVector";

export default function CoordinatePoints({
  id,
  manual,
  coordinate,
  carrier,
  pointRadius,
  globalCenterX,
  globalCenterY,
  active,
  changeActivePoint,
}: TPoint & {
  pointRadius: number;
  globalCenterX: number;
  globalCenterY: number;
  changeActivePoint: (id: number) => void;
}) {
  const { absolute, relative } = coordinate;

  return (
    <Group>
      <Circle
        onClick={() => changeActivePoint(id)}
        onTap={() => changeActivePoint(id)}
        x={relative.x}
        y={relative.y}
        fill="#FCFFFD"
        radius={pointRadius}
        stroke="#8AC187"
        strokeWidth={4}
      />
      {absolute.x != 0 && absolute.y != 0 && (
        <>
          <Group opacity={active ? 1 : 0.5}>
            <Line
              stroke={active ? "#FCFFFD" : "1#23232D"}
              points={[relative.x, relative.y, 0 + globalCenterX, relative.y]}
              dash={[10, 10]}
            />
            <Text
              text={`${Math.abs(+absolute.x.toFixed(2))}`}
              fontSize={16}
              fill={active ? "#FCFFFD" : "17181C"}
              x={getCenterVector(relative.x, globalCenterX, -20)}
              y={relative.y - 20}
            />
          </Group>
          <Group opacity={active ? 1 : 0.5}>
            <Line
              stroke={active ? "#FCFFFD" : "17181C"}
              points={[relative.x, relative.y, relative.x, 0 + globalCenterY]}
              dash={[10, 10]}
            />
            <Text
              text={`${Math.abs(+absolute.y.toFixed(2))}`}
              fontSize={16}
              fill={active ? "#FCFFFD" : "17181C"}
              y={getCenterVector(relative.y, globalCenterY, -20)}
              x={relative.x + 20}
              rotation={90}
            />
          </Group>
        </>
      )}
    </Group>
  );
}
