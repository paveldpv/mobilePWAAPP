import React, { useState, useEffect, useRef, useCallback } from "react";
import { Stage, Layer } from "react-konva";
import { TGrove } from "../../pages/calc/DrillingGrove";
import { TCoordinate, TPoint } from "./KonvaHole";
import { getCoordinate } from "../../function/getCoordinate";

import { getRadius } from "../../function/getRadius";
import { getOffset } from "../../function/getOffset";
import CoordinatePoints from "./CoordinatePoints";
import Grove from "./Grove";
import FieldCoordinate from "./FieldCoordinate";

type TKonvaGrove = {
  quality: number;
  sector: TGrove;
  initialCarrier: number;
  groveCarrier: number;
  radiusCenter: number;
  radiusHole: number;
  scale: number;
  draggable: boolean;
};

export default function KonvaGrove({
  quality,
  sector,
  initialCarrier,
  groveCarrier,
  radiusCenter,
  radiusHole,
  scale,
  draggable,
}: TKonvaGrove) {
  const widthStage = window.innerWidth;
  const heightStage = window.innerHeight;
  const relativeRadius = getRadius(scale, widthStage, 1.5);
  const [points, setPoints] = useState<TPoint[]>([]);
  const [offset, setOffset] = useState<TCoordinate>({ x: 0, y: 0 });
  
  
  useEffect(() => {
    let res = [];
    let meanCarrier = groveCarrier / quality;
    console.log("useEffect");

    for (let i = 0; i <= quality; i++) {
      let point: TPoint = {
        id: i,
        coordinate: {
          absolute: {
            x: getCoordinate(
              meanCarrier * i + sector.initialAngle + initialCarrier,
              radiusCenter
            ).x,
            y: getCoordinate(
              meanCarrier * i + sector.initialAngle + initialCarrier,
              radiusCenter
            ).y,
          },
          relative: {
            x: getCoordinate(
              meanCarrier * i + sector.initialAngle + initialCarrier,
              relativeRadius
            ).x,
            y: getCoordinate(
              meanCarrier * i + sector.initialAngle + initialCarrier,
              relativeRadius
            ).y,
          },
        },
        carrier: meanCarrier * i,
        manual: false,
        active: i == 0,
        completed: false,
      };

      res.push(point);
    }

    setOffset(
      getOffset(
        sector,
        widthStage,
        heightStage,
        1.5,
        scale,
        initialCarrier,
        points
      )
    );

    setPoints(res);
  }, [quality, scale]);

  const changeActivePoint = (id: number): void => {
    let activePoints = points?.map((point) =>
      point.id == id ? { ...point, active: true } : { ...point, active: false }
    );
    setPoints(activePoints);
  };
  const changeCompleted = (id: number): void => {
    let activePoints = points?.map((point) =>
      point.id == id ? { ...point, completed: true } : point
    );
    setPoints(activePoints);
  };

  return (
    <Stage
      draggable={draggable}
      width={widthStage}
      height={heightStage / 1.5}
      offset={offset}
      scale={{
        x: scale > 0 ? 1 + scale / 2 : 1,
        y: scale > 0 ? 1 + scale / 2 : 1,
      }}
    >
      <Layer>
        <Grove
          stroke={true}
          initialAngle={initialCarrier}
          angle={sector.initialAngle}
          radius={relativeRadius}
          id={1}
          selected={true}
          hole={radiusHole}
          groveCarrier={groveCarrier}
        />
        {points.map((point, index) => (
          <CoordinatePoints
            key={index}
            radius={relativeRadius}
            pointRadius={radiusHole / 5}
            id={point.id}
            active={point.active}
            coordinate={point.coordinate}
            carrier={point.carrier}
            completed={point.completed}
            manual={point.manual}
            changeActivePoint={changeActivePoint}
            changeCompleted={changeCompleted}
          />
        ))}
        <FieldCoordinate radius={relativeRadius} />
      </Layer>
    </Stage>
  );
}
