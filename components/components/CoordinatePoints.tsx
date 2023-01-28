import { Circle, Group, Transformer } from "react-konva";
import Konva from "konva";
import { useRef, useEffect, createRef } from "react";
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
}) {
  const refCircle = useRef<Konva.Stage>() || null;

  const { absolute, relative } = coordinate;

  useEffect(() => {
    
    refCircle.current?.addEventListener("dragmove", () => {
      var x = globalCenterX;
      var y = globalCenterY;
      const pos = refCircle.current?.absolutePosition();

      var scale =
        radius /
        Math.sqrt(
          Math.pow(Number(pos?.x) - x, 2) + Math.pow(Number(pos?.y) - y, 2)
        );

      if (scale < 1 || scale > 1) {
        refCircle.current?.x(Math.round((Number(pos?.x) - x) * scale + x));
        refCircle.current?.y(Math.round((Number(pos?.y) - y) * scale + y));
      }
    });
  }, []);

  return (
    <Group>
      <Circle
        ref={refCircle}
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
        // draggable={manual}
        onDragStart={(e) => changeCarrier(e, id)}
        // onDragEnd={}
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
