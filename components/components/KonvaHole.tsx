import { useEffect, useState, useRef, RefObject, ForwardedRef } from "react";
import { Stage, Layer, Transformer, Group, Shape } from "react-konva";

import { getCoordinate } from "../../function/getCoordinate";

import CoordinatePoints from "./CoordinatePoints";
import ManualCoordinatePoints from "./ManualCoordinatePoints";
import FieldCoordinate from "./FieldCoordinate";

import Konva from "konva";

import TestingCoordinatePoint from "./TestComponetn/TestingCoordinatePointer";

export type TKonvaHole = {
  diameter: number;
  amountPointer: number;
  manual: boolean;
  initialCarrier: number;
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

  const trRef = useRef<Konva.Transformer>(null);
  const rotationCircleRef = useRef(null);
  // const list = [...Array(amountPointer)];
  // const pointsRefs = list.map(x => useRef(null) );

  const [points, setPoints] = useState<TPoint[]>();

  useEffect(() => {
    const calcStaticPoint = () => {
      let gapCarrier = 360 / amountPointer;
      let result = new Array<TPoint>();
      for (let i = 0; i < amountPointer; i++) {
        let currentCarrier: number =
          i == +0 ? initialCarrier : +initialCarrier + gapCarrier * i;
        let point: TPoint = {
          active: i == 0,
          id: i,
          manual: manual,
          carrier: currentCarrier,
          coordinate: {
            absolute: {
              x: getCoordinate(currentCarrier, diameter / 2, i).x,
              y: -getCoordinate(currentCarrier, diameter / 2, i).y,
            },
            relative: {
              x: getCoordinate(currentCarrier, radius, i).x,
              y: -getCoordinate(currentCarrier, radius, i).y,
            },
          },
          completed: false,
        };
        result.push(point);
      }

      setPoints(result);
    };
    calcStaticPoint();
  }, []);

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
  const changeManualCarrier = (
    e: Konva.KonvaEventObject<DragEvent>,
    id: number,
    ref?: ForwardedRef<Konva.Circle>
  ): void => {};

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight / 1.5}>
        <Layer x={globalCenterX} y={globalCenterY}>
          <Group>
            <FieldCoordinate radius={radius} ref={rotationCircleRef} />
            {points?.map((point, index) => {
              return (
                <>
                  {manual ? (
                    <ManualCoordinatePoints

                      id={point.id}
                      carrier={point.carrier}
                      key={point.id}
                      manual={point.manual}
                      coordinate={point.coordinate}
                      pointRadius={radius / 18}
                      active={point.active}
                      completed={point.completed}
                      changeActivePoint={changeActivePoint}
                      changeCompleted={changeCompleted}
                      changeCarrier={changeManualCarrier}
                      radius={radius}
                    />
                  ) : (
                    <CoordinatePoints
                      id={point.id}
                      carrier={point.carrier}
                      key={point.id}
                      manual={point.manual}
                      coordinate={point.coordinate}
                      pointRadius={radius / 18}
                      active={point.active}
                      completed={point.completed}
                      changeActivePoint={changeActivePoint}
                      changeCompleted={changeCompleted}
                      changeCarrier={changeManualCarrier}
                      radius={radius}
                    />
                  )}
                </>
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}
