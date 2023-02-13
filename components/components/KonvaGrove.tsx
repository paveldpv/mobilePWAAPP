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
  scaleX: number;
  scaleY: number;
};

export default function KonvaGrove({
  quality,
  sector,
  initialCarrier,
  groveCarrier,
  radiusCenter,
  radiusHole,
  scaleX,
  scaleY,
}: TKonvaGrove) {
  const widthStage = window.innerWidth;
  const heightStage = window.innerHeight;
  const [points, setPoints] = useState<TPoint[]>([]);

  const relativeRadius = scaleX<0 && scaleX!=0 ?widthStage / Math.abs(scaleX*5):widthStage/1.5;
  console.log(relativeRadius);
  
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
  }, [quality, scaleX, scaleY]);

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
        x: getCoordinateSector(
          sector,
          widthStage,
          heightStage / 1.7,
          relativeRadius * scaleX
        ).x,
        y: getCoordinateSector(
          sector,
          widthStage,
          heightStage / 1.7,
          relativeRadius * scaleX
        ).y,
      }}
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
