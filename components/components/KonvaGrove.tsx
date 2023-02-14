import React, { useState, useEffect } from "react";
import { Stage, Circle, Line, Layer, Group } from "react-konva";
import { TGrove } from "../../pages/calc/DrillingGrove";
import { TPoint } from "./KonvaHole";
import { getCoordinate } from "../../function/getCoordinate";
import { getCoordinateSector } from "../../function/getCoordinateSector";
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
};

export default function KonvaGrove({
  quality,
  sector,
  initialCarrier,
  groveCarrier,
  radiusCenter,
  radiusHole,
  scale,
}: TKonvaGrove) {
  console.log(sector);
  
  const widthStage = window.innerWidth;
  const heightStage = window.innerHeight;
  const [points, setPoints] = useState<TPoint[]>([]);
  const offset = getCoordinateSector(
    sector,
    widthStage,
    heightStage / 1.7,
    (widthStage / 1.5) * scale
  );
  console.log(offset);
  
  const relativeRadius =
    scale > 0 && scale != 0
      ? widthStage / 1.5 
      : widthStage / 1.5 - Math.abs(offset.x / 1.5);

  useEffect(() => {
    let res = [];
    let meanCarrier = groveCarrier / quality;

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
      width={widthStage}
      height={heightStage / 1.5}
      offset={{
        x: scale > 0 && scale != 0 ? points[0]?.coordinate?.absolute?.x-100: offset.x,
        y: scale > 0 && scale != 0 ? points[0]?.coordinate?.absolute?.y : offset.y,
      }}
       scale={{ x: scale > 0 ?1+ scale : 1, y: scale > 0 ? 1+scale : 1 }}
    >
      <Layer
      // x={getCoordinateSector(sector, widthStage, heightStage / 1.7,relativeRadius).x+10}
      // y={getCoordinateSector(sector, widthStage, heightStage / 1.7,relativeRadius).y+10}
      >
        <Grove
          stroke={true}
          initialAngle={initialCarrier}
          angle={sector.initialAngle}
          radius={relativeRadius}
          id={1}
          selected={true}
          hole={100}
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
