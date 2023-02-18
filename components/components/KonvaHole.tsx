import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Group, } from "react-konva";

import { getCoordinate } from "../../function/getCoordinate";

import CoordinatePoints from "./CoordinatePoints";
import ManualCoordinatePoints from "./ManualCoordinatePoints";
import FieldCoordinate from "./FieldCoordinate";





export type TKonvaHole = {
  diameter: number;
  amountPointer: number;
  manual: boolean;
  initialCarrier: number;
  quality: number;
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
  quality,
}: TKonvaHole) {
  const globalCenterX = window.innerWidth / 2;
  const globalCenterY = window.innerHeight / 3;

  const radius = (window.innerWidth + window.innerHeight) / 7; //начальный радиус рисованого круга

  
  const rotationCircleRef = useRef(null);

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
              x: getCoordinate(90-currentCarrier, diameter / 2, i).x,
              y: -getCoordinate(90-currentCarrier, diameter / 2, i).y,
            },
            relative: {
              x: getCoordinate(90-currentCarrier, radius, i).x,
              y: -getCoordinate(90-currentCarrier, radius, i).y,
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
  const changeManualCarrier = (carrier: number, id: number): void => {
       
    setPoints((state) =>
      state?.map((point, index) => {
        if (point.id === id) {
          return {
            ...point,
            coordinate: {
              absolute: {
                x: getCoordinate(90-carrier, diameter / 2).x,
                y: -getCoordinate(90-carrier, diameter / 2).y,
              },
              relative: {
                x: getCoordinate(90-carrier, radius).x,
                y: -getCoordinate(90-carrier, radius).y,
              },
            },
            active:true,
            carrier:carrier
          };
        } else {
          return {...point,active:false};
        }
      })
    );
  };

  return (
    <div className=" font-Lobster">
      <Stage width={window.innerWidth} height={window.innerHeight / 1.5}>
        <Layer x={globalCenterX} y={globalCenterY}>
          <Group>
            <FieldCoordinate radius={radius} ref={rotationCircleRef} />
            {points?.map((point, index) => {
              return (
                <Group key={index}>
                  {manual ? (
                    <ManualCoordinatePoints                    
                      quality={quality}
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
                </Group>
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}
