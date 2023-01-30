import { Circle, Group, Transformer } from "react-konva";
import Konva from "konva";
import { useRef, useEffect, RefObject, forwardRef, ForwardedRef } from "react";
import { TPoint } from "../KonvaHole";

import { getCenterVector } from "../../../function/getCenterVector";

import LineIndicatorPoint from "../LineIndicatorPoint";
import { KonvaEventObject } from "konva/lib/Node";

const TestingCoordinatePoint = forwardRef(
  ({
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
    changeCarrier,
    radius,
  }: TPoint & {
    radius: number;
    pointRadius: number;
    globalCenterX: number;
    globalCenterY: number;
    changeActivePoint: (id: number) => void;
    changeCompleted: (id: number) => void;
    changeCarrier: (e: Konva.KonvaEventObject<DragEvent>, id: number) => void;
  },ref) => {
    const { absolute, relative } = coordinate;

    return (
      <Group >
        <Circle ref={ref}
          onClick={() => changeActivePoint(id)}
          onTap={() => changeActivePoint(id)}
          onDblClick={() => changeCompleted(id)}
          onDblTap={() => changeCompleted(id)}
          x={relative.x}
          y={relative.y}
          fill="#FCFFFD"
          radius={completed ? pointRadius / 3 : pointRadius * 2}
          stroke={completed ? `` : "#23232D"}
          strokeWidth={22}
          draggable={manual}
          onDragEnd={(e) => changeCarrier(e, id)}
        />
        {absolute.x != 0 && absolute.y != 0 && (
          <LineIndicatorPoint
            completed={completed}
            active={active}
            coordinate={coordinate}
            globalCenterX={globalCenterX}
            globalCenterY={globalCenterY}
            pointRadius={pointRadius}
            carrier={carrier}
          />
        )}
      </Group>
    );
  }
);
export default TestingCoordinatePoint