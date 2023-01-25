import { useEffect, useState } from "react";
import { Stage, Layer, Circle, Text, Arrow } from "react-konva";

import { getCoordinate } from "../../function/getCoordinate";

import CoordinatePoints from "./CoordinatePoints";

export type TKonvaHole = {
  diameter?: number;
  amountPointer?: number;
  manual?: boolean;
  initialCarrier?:number
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
};

export default function Konva({ amountPointer, diameter, manual,initialCarrier }: TKonvaHole) {
  const globalCenterX = window.innerWidth / 2;
  const globalCenterY = window.innerHeight / 3;

  const radius = (window.innerWidth + window.innerHeight) / 7;

  const [points, setPoints] = useState<TPoint[]>();

  useEffect(() => {
    const calcStaticPoint = () => {
      if (!amountPointer || !diameter) return;
      let currentCarrier = 360 / +amountPointer;
      let result = new Array<TPoint>();
      for (let i = 0; i < amountPointer; i++) {
        let point: TPoint = {
          active: i == 0,
          id: i,
          manual: manual ? manual : false,
          carrier: currentCarrier * (i + 1),
          coordinate: {
            absolute: {
              x: getCoordinate(currentCarrier, diameter / 2, i).x,
              y: getCoordinate(currentCarrier, diameter / 2, i).y,
            },
            relative: {
              x: getCoordinate(currentCarrier, radius, i).x + globalCenterX,
              y: getCoordinate(currentCarrier, radius, i).y + globalCenterY,
            },
          },
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

  return (
    <div className="">
      <Stage width={window.innerWidth} height={window.innerHeight / 1.5}>
        <Layer>
          <Circle
            x={globalCenterX}
            y={globalCenterY}
            radius={radius}
            stroke="#776AD6"
          />
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
              changeActivePoint={changeActivePoint}
            />
          ))}
          <Arrow
            dash={[33, 10]}
            stroke={`#FCFFFD`}
            y={globalCenterY}
            x={globalCenterX}
            points={[-radius - 18, 0, radius + 18, 0]}
          />
          <Text
            x={globalCenterX + radius + 5}
            y={globalCenterY + 10}
            fontSize={24}
            text="X"
            fill="#FCFFFD"
          />
          <Arrow
            dash={[33, 10]}
            stroke={`#FCFFFD`}
            y={globalCenterY}
            x={globalCenterX}
            points={[0, radius + 18, 0, -radius - 55]}
          />
          <Text
            x={globalCenterX + 10}
            y={globalCenterY - radius - 40}
            text="Y"
            fontSize={24}
            fill="#FCFFFD"
          />
        </Layer>
      </Stage>
    </div>
  );
}
