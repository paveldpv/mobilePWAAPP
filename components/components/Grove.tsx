import { Wedge,  Group, Line, Arrow, Circle, Text } from "react-konva";
import { getCoordinate } from "../../function/getCoordinate";
type TGrove = {
  id: number;
  radius: number;
  angle: number;
  selected?: boolean;
  changeSector?: (id: number) => void;
  groveCarrier?: number;
  hole?: number;
  initialAngle?: number;
  stroke?: boolean;
};

export default function Grove({
  radius,
  angle,
  selected,
  changeSector,
  id,
  groveCarrier,
  hole = 36,
  initialAngle = 0,
  stroke,
}: TGrove) {
  let quality = groveCarrier ? 150 : 15;
  let points = new Array(quality).fill(1).map((item, index) => {
    if (index % 2 == 0) {
      if (groveCarrier) {
        return index == 0
          ? getCoordinate(groveCarrier / quality, radius).x
          : getCoordinate((groveCarrier / quality) * index, radius).x; //
      } else {
        return getCoordinate(30 + 2 * index, radius).x;
      }
    } else {
      if (groveCarrier) {
        return index == 0
          ? getCoordinate(groveCarrier / quality, radius).y
          : getCoordinate((groveCarrier / quality) * index, radius).y; //
      } else {
        return getCoordinate(30 + 2 * index, radius).y;
      }
    }
  });

  let startPoints = [points[0], points[1]];

  return (
    <Group opacity={stroke ? 0.2 : 1} rotation={angle + initialAngle}>
      <Line
        opacity={selected ? 1 : 0.08}
        onClick={() => changeSector && changeSector(id)}
        onTap={() => changeSector && changeSector(id)}
        stroke="#FCFFFD"
        points={points}
        strokeWidth={hole}
        lineCap="round"
        lineJoin="round"
      />

      <Text
        text="R"
        fill="#FFAAC7"
        x={getCoordinate(60, 75).x}
        y={getCoordinate(60, 75).y}
        rotation={-angle}
        fontSize={28}
        fontFamily="Lobster"
        opacity={selected ? 1 : 0}
      />
      <Arrow
        points={[0, 0, ...startPoints]}
        fill="#8AC187"
        stroke="#8AC187"
        opacity={selected ? 1 : 0}
        rotation={groveCarrier ? groveCarrier : 26}
      />
      <Wedge
        angle={26}
        radius={35}
        rotation={33}
        stroke="#FED47E"
        opacity={selected ? 1 : 0}
      />
      <Wedge
        angle={30}
        radius={35}
        stroke="#FED47E"
        opacity={selected ? 1 : 0}
      />
      <Arrow
        points={[0, 0, ...startPoints]}
        fill="#FFAAC7"
        stroke="#FFAAC7"
        opacity={selected ? 1 : 0}
      />
      <Circle
        x={startPoints[0]}
        y={startPoints[1]}
        stroke="#8AC187"
        strokeWidth={3}
        radius={hole / 2}
        opacity={selected ? 1 : 0}
      />
      <Text
        text="D"
        fill="#8AC187"
        x={startPoints[0] + 15}
        y={startPoints[1] + 15}
        rotation={-angle}
        fontSize={28}
        fontFamily="Lobster"
        opacity={selected ? 1 : 0}
      />
    </Group>
  );
}
