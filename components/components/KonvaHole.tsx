import { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";

import { getCoordinate } from "../../function/getCoordinate";

import CoordinatePoints from "./CoordinatePoints";
import FieldCoordinate from "./FieldCoordinate";

import Konva from "konva";

export type TKonvaHole = {
  diameter?: number;
  amountPointer?: number;
  manual?: boolean;
  initialCarrier?: number;
};

export type TCoordinate = {
  x: number;
  y: number;
};

export type TPoint = {
  id: number;
  coordinate: {
    absolute: TCoordinate;
    relative: TCoordinate;
  };
  carrier: number;
  manual: boolean;
  active?: boolean;
  completed: boolean;
};

export default function KonvaHole({
  amountPointer,
  diameter,
  manual,
  initialCarrier,
}: TKonvaHole) {
  const globalCenterX = window.innerWidth / 2;
  const globalCenterY = window.innerHeight / 3;

  const radius = (window.innerWidth + window.innerHeight) / 7; //начальный радиус рисованого круга

  const [points, setPoints] = useState<TPoint[]>();

  useEffect(() => {
    const calcStaticPoint = () => {
      if (!amountPointer || !diameter || !initialCarrier) return;
      let gapCarrier = 360 / amountPointer;
      let result = new Array<TPoint>();
      for (let i = 0; i < amountPointer; i++) {
        let currentCarrier: number =
          i == +0 ? initialCarrier : +initialCarrier + gapCarrier * i;
        let point: TPoint = {
          active: i == 0,
          id: i,
          manual: manual ? manual : false,
          carrier: currentCarrier,
          coordinate: {
            absolute: {
              x: getCoordinate(currentCarrier, diameter / 2, i).x,
              y: -getCoordinate(currentCarrier, diameter / 2, i).y,
            },
            relative: {
              x: getCoordinate(currentCarrier, radius, i).x + globalCenterX,
              y: -getCoordinate(currentCarrier, radius, i).y + globalCenterY,
            },
          },
          completed: false,
        };
        result.push(point);
      }
      console.log(result);
      setPoints(result);
    };
    
    
    calcStaticPoint();
  }, [manual]);

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
  const changeManualCarrier = (e:Konva.KonvaEventObject<DragEvent> ,id: number): void => {
    console.log(id);
    console.log(e);
    
    
  };

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight / 1.5}>
        <Layer>
          {points?.map((point, index) => (
            <CoordinatePoints
              id={point.id}
              carrier={point.carrier}
              key={point.id}
              manual={point.manual}
              coordinate={point.coordinate}
              pointRadius={radius / 18}
              globalCenterX={globalCenterX}
              globalCenterY={globalCenterY}
              active={point.active}
              completed={point.completed}
              changeActivePoint={changeActivePoint}
              changeCompleted={changeCompleted}
              changeCarrier={changeManualCarrier}
              radius={radius}
            />
          ))}
          <FieldCoordinate
            globalCenterX={globalCenterX}
            globalCenterY={globalCenterY}
            radius={radius}
          />
        </Layer>
      </Stage>
    </div>
  );
}
