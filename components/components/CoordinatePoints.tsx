import { Circle, Group, Transformer } from "react-konva";
import Konva from "konva";
import { useRef, useEffect, RefObject, forwardRef, ForwardedRef } from "react";
import { TPoint } from "./KonvaHole";

import { getCenterVector } from "../../function/getCenterVector";

import LineIndicatorPoint from "./LineIndicatorPoint";
import { KonvaEventObject } from "konva/lib/Node";

export type TCoordinatePoints = TPoint & {
  radius: number;
  pointRadius: number;
  changeActivePoint: (id: number) => void;
  changeCompleted: (id: number) => void;
  changeCarrier?: (e: Konva.KonvaEventObject<DragEvent>, id: number) => void;
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
        radius={completed ? pointRadius / 3 : pointRadius *2}
        stroke={completed ? `` : "#23232D"}           
        strokeWidth={pointRadius*2-pointRadius/5}        
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
