import { TCoordinate } from "./../components/components/KonvaHole";
import { TGrove } from "../pages/calc/DrillingGrove";
import { getCoordinate } from "./getCoordinate";

export const getCoordinateSector = (
  sector: TGrove,
  width: number,
  height: number,
  radius:number
): TCoordinate => {
  switch (sector.initialAngle) {
    case 90:
      return {
        x:getCoordinate(45,radius).x-height,        
        y:getCoordinate(45,radius).y,
      };
    case 180:
      return {
        x:getCoordinate(45,radius).x,
        y: getCoordinate(45,radius).y,
      };
    case 270:
      return {
        x:getCoordinate(45,radius).x,
        y: getCoordinate(45,radius).y,
      };

    default:
      return {
        x:getCoordinate(45,radius).x,
        y:getCoordinate(45,radius).y
      };
  }
};
