import { Group, Circle, Arrow, Text, Transformer } from "react-konva";
import { forwardRef, RefObject } from "react";

type TFieldCoordinate = {
  radius: number;
};

const FieldCoordinate = forwardRef(({radius}:TFieldCoordinate, ref) => {
  return (
    <Group listening={false}>
      <Circle radius={radius} stroke="#776AD6" opacity={0.4} />
      <Arrow
        dash={[33, 10]}
        stroke={`#FCFFFD`}
        points={[-radius - 18, 0, radius + 18, 0]}
      />
      <Text fontSize={24} text="X" fill="#FCFFFD" x={radius} y={-28} />
      <Arrow
        dash={[33, 10]}
        stroke={`#FCFFFD`}
        points={[0, radius + 18, 0, -radius - 55]}
      />
      <Text text="Y" fontSize={24} fill="#FCFFFD" y={-radius-28} x={5}/>
    </Group>
  );
});
export default FieldCoordinate;

