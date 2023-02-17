import FieldCoordinate from "../components/FieldCoordinate";

import { Stage, Layer } from "react-konva";
import Grove from "../components/Grove";
import { TGrove } from "../../pages/calc/DrillingGrove";
import { TCoordinate } from "../components/KonvaHole";
type TChangeSectorGrove = {
  sector: TGrove[];
  changeSector: (id: number) => void;
};

export default function ChangeSectorGrove({
  sector,
  changeSector,
}: TChangeSectorGrove) {
  const widthStage = window.innerWidth;
  const heightStage = window.innerHeight;
  const radius = widthStage / 3.5;
  const scale: TCoordinate = {
    x: widthStage < 450 ? 1.3 : 1,
    y: widthStage < 450 ? 1.3 : 1,
  };
 
  
  return (
    <Stage
      scale={scale}
      x={widthStage / 2}
      y={heightStage /3.9}
      width={widthStage}
      height={heightStage / 2}
    >
      <Layer>
        {sector.map((grove, index) => (         
          <Grove
            changeSector={changeSector}
            id={grove.id}
            selected={grove.selected}
            radius={radius}
            angle={grove.initialAngle}
            key={grove.id}
          />
        ))}
        <FieldCoordinate radius={radius} />
      </Layer>
    </Stage>
  );
}
