import { TPoint } from "./KonvaHole";

import { Line, Group, Text, Wedge } from "react-konva";

import { getCenterVector } from "../../function/getCenterVector";
import { correctCoordinateTextCarrier } from "../../function/correctCoordinateTextCarrier";

type TlineIndicator = {
  pointRadius: number;
  textRef:any
} & Omit<TPoint, "id" | "manual">;

export default function LineIndicatorPoint({
  active,
  completed,
  coordinate,
  pointRadius,
  carrier,
  textRef
}: TlineIndicator) {
  const { absolute, relative } = coordinate;
  return (
    <Group opacity={completed ? 0 : active ? 1 : 0.5} >
      <Line
        dash={[10, 10]}
        stroke={active ? "#FCFFFD" : "#23232D"}
        opacity={0.08}
        points={[0, 0, relative.x, relative.y]}
      />
      <Wedge
        radius={pointRadius * 4}
        angle={carrier}
        stroke={active ? "#FCFFFD" : "#23232D"}
        rotation={270}
      />
      <Text 
        offsetX={50} offsetY={50} 
        rotation={carrier}
        text={`${Math.round(Math.abs(carrier))}°`}
        opacity={active ? 1 : 0}
       // ref={textRef}
        fontSize={18}
        fill={`#FCFFFD`}
      />

      <Line
        stroke={active ? "#FCFFFD" : "1#23232D"}
        points={[relative.x, relative.y, 0, relative.y]}
        dash={[10, 10]}
        opacity={active ? 1 : 0.5}
      />
      <Text
        text={`${Math.abs(+absolute.x.toFixed(2))}`}
        fontSize={18}
        fill={active ? "#FCFFFD" : "17181C"}
        x={getCenterVector(relative.x, -20)}
        y={relative.y - 20}
        opacity={active ? 1 : 0.5}
      />

      <Line
        stroke={active ? "#FCFFFD" : "17181C"}
        points={[relative.x, relative.y, relative.x, 0]}
        dash={[10, 10]}
        opacity={active ? 1 : 0.5}
      />
      <Text
        text={`${Math.abs(+absolute.y.toFixed(2))}`}
        fontSize={18}
        fill={active ? "#FCFFFD" : "17181C"}
        y={getCenterVector(relative.y, -20)}
        x={relative.x + 20}
        rotation={90}
        opacity={active ? 1 : 0.5}
      />
    </Group>
  );
}
