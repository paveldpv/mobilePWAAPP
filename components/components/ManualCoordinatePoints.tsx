import { forwardRef, useRef, useEffect } from "react";
import { Circle, Transformer } from "react-konva";
import Konva from "konva";
import { TCoordinatePoints } from "./CoordinatePoints";

import LineIndicatorPoint from "./LineIndicatorPoint";

import { getToleranceSnaps } from "../../function/getToleranceSnaps";

const ManuaLCoordinatePoints = forwardRef(
  (
    {
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
      changeCarrier,
      quality,
    }: TCoordinatePoints & { quality: number },
    ref
  ) => {
    const trRef = useRef<Konva.Transformer>(null);
    const circleRef = useRef<Konva.Circle>(null);
    const textCarrierRef = useRef<Konva.Text>(null)

    useEffect(() => {
      if (!circleRef) return;
      trRef.current?.nodes([circleRef.current!]);
      trRef.current?.rotation(carrier);
    }, []);

    return (
      <>
        <Transformer
          onTransform={(e) =>
            changeCarrier && changeCarrier(e.target.rotation(), id)
          }
          rotationSnaps={getToleranceSnaps(quality, id)}
          rotationSnapTolerance={quality}
          rotateAnchorOffset={radius}
          onClick={() => changeActivePoint(id)}
          onTap={() => changeActivePoint(id)}
          onDblClick={() => changeCompleted(id)}
          onDblTap={() => changeCompleted(id)}
          ref={trRef}
          resizeEnabled={false}
          borderEnabled={false}
          anchorFill="#FCFFFD"
          anchorCornerRadius={50}
          anchorSize={completed ? pointRadius / 3 : pointRadius * 2}
        />
        <Circle fill="transparent" radius={1} ref={circleRef} x={0} y={0} />
        <LineIndicatorPoint
          active={active}
          carrier={carrier}
          completed={completed}
          coordinate={coordinate}
          pointRadius={pointRadius}
          textRef = {textCarrierRef}
        />
      </>
    );
  }
);
export default ManuaLCoordinatePoints;
