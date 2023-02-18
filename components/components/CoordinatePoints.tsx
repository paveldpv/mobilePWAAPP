import { Circle, Group } from "react-konva";

import { TPoint } from "./KonvaHole";


import LineIndicatorPoint from "./LineIndicatorPoint";


export type TCoordinatePoints = TPoint & {
  radius: number;
  pointRadius: number;
  changeActivePoint: (id: number) => void;
  changeCompleted: (id: number) => void;
  changeCarrier?: (carrier:number, id: number) => void;
};

export default function CoordinatePoints({
  id,
  manual,
  coordinate,
  carrier,
  pointRadius,
  active,
  changeActivePoint,
  completed,
  changeCompleted,  
  radius,
}: TCoordinatePoints) {
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
        radius={completed ? pointRadius / 3 : pointRadius }
             
        draggable={false}
      />
      {absolute.x != 0 && absolute.y != 0 && (
        <LineIndicatorPoint 

          completed={completed}
          active={active}
          coordinate={coordinate}
          pointRadius={pointRadius}
          carrier={carrier}
        />
      )}
    </Group>
  );
}
