import { Circle, Group, Transformer } from "react-konva";
import Konva from "konva";
import { useRef, useEffect, RefObject,forwardRef,ForwardedRef } from "react";
import { TPoint } from "./KonvaHole";

import { getCenterVector } from "../../function/getCenterVector";

import LineIndicatorPoint from "./LineIndicatorPoint";
import { KonvaEventObject } from "konva/lib/Node";




 function CoordinatePoints({
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

  
  
  const refCircle = useRef<Konva.Circle>(null);
  // const trRef = useRef<Konva.Transformer>(null);

  const { absolute, relative } = coordinate;

  useEffect(() => {
    refCircle.current?.addEventListener("dragmove", () => {
      var x = globalCenterX;
      var y = globalCenterY;
      const pos = refCircle.current?.absolutePosition();
      // trRef?.current?.nodes([refCircle.current]);
      // trRef.current?.getLayer()?.batchDraw();

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
    <Group >
      {/* {manual && (
        <Transformer
          ref={trRef as RefObject<Konva.Transform | any>}
          x={globalCenterX}
          y={globalCenterY}
          rotationSnapTolerance={10}          
          resizeEnabled={false}
          rotationSnaps={[45,90,135,180,225,270,360]}
          onTransform={(e:KonvaEventObject<Event>)=>{
            console.log(e.target.rotation())
            console.log(e);
            
          }}
          anchorCornerRadius={radius}
        />
      )} */}

      <Circle
        ref={refCircle as RefObject<Konva.Circle | any>}
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
export default forwardRef(CoordinatePoints)