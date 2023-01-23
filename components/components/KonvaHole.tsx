import { useEffect, useState } from "react";
import { Stage, Layer, Circle, Text, Line, Arrow } from "react-konva";

import CoordinatePoints from "./CoordinatePoints";

export type Props = {
  diameter?: number;
  amountPointer?: number;
  manual?: boolean;
};

export type TPoint = {
  // x: number;
  // y: number;
  id: number;
  coordinate: [number, number]; //[x,y]
  carrier: number;
  manual: boolean;
};

export default function Konva({ amountPointer, diameter, manual }: Props) {
  const globalCenterX = window.innerWidth / 2;
  const globalCenterY = window.innerHeight / 3;

  const radius = (window.innerWidth + window.innerHeight) / 7;
  const [points, setPoints] = useState<TPoint[]>();

  useEffect(() => {
    const calcStaticPoint = () => {
      if (!amountPointer || !diameter) return;
      let initialCarrier = 360 / +amountPointer;
      let result = new Array<TPoint>();
      for (let i = 0; i < amountPointer; i++) {
        let point: TPoint = {
          id: i,
          manual: manual ? manual : false,
          carrier: initialCarrier * (i + 1),
          coordinate: [
            (+Math.sin(((initialCarrier * (i + 1)) / 180) * Math.PI).toFixed(
              3
            ) *
              diameter) /
              2,
            (+Math.cos(((initialCarrier * (i + 1)) / 180) * Math.PI).toFixed(
              3
            ) *
              diameter) /
              2,
          ],
        };
        result.push(point);
      }
      setPoints(result);
    };
    calcStaticPoint();
  }, []);

  return (
    <div className="grid grid-rows-3">
      <Stage width={window.innerWidth} height={window.innerHeight/1.5}>
        <Layer>
          <Circle
            x={globalCenterX}
            y={globalCenterY}
            radius={radius}
            stroke="#776AD6"
          />
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
            points={[0, radius + 18, 0, -radius - 18]}
          />
          <Text
            x={globalCenterX + 10}
            y={globalCenterY - radius - 25}
            text="Y"
            fontSize={24}
            fill="#FCFFFD"
          />
          {points?.map((point) => (
            <CoordinatePoints
              id={point.id}
              carrier={point.carrier}
              key={point.id}
              manual={point.manual}
              coordinate={point.coordinate}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
