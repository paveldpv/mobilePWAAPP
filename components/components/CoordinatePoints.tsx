import { Line, Text, Circle, Group, Transformer } from "react-konva";
import { TPoint } from "./KonvaHole";

import { getCenterVector } from "../../function/getCenterVector";

import LineIndicatorPoint from "./LineIndicatorPoint";

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
  completed,
  changeCompleted,
}: TPoint & {
  pointRadius: number;
  globalCenterX: number;
  globalCenterY: number;
  changeActivePoint: (id: number) => void;
  changeCompleted: (id: number) => void;
}) {
  const { absolute, relative } = coordinate;

  return (
    <Group>
      <Circle
        onClick={() => changeActivePoint(id)}
        onTap={() => changeActivePoint(id)}
        onDblClick={() => changeCompleted(id)}
        onDblTap={() => changeCompleted(id)}
        x={relative.x}
        y={relative.y}
        fill="#FCFFFD"
        radius={completed ? pointRadius / 3 : pointRadius*2}
        stroke={completed ? `` : "#23232D"}
        strokeWidth={22}
      />
      {absolute.x != 0 && absolute.y != 0 && (
        <LineIndicatorPoint
          completed={completed}
          active={active}
          coordinate={coordinate}
          globalCenterX={globalCenterX}
          globalCenterY={globalCenterY}
        />
      )}
    </Group>
  );
}
