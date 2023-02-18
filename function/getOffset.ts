import { TPoint } from "./../components/components/KonvaHole";
import { TCoordinate } from "../components/components/KonvaHole";
import { TGrove } from "../pages/calc/DrillingGrove";

import { getCoordinate } from "./getCoordinate";

export const getOffset = (
  sector: TGrove,
  width: number,
  height: number,
  corrector: number,
  scale: number,
  initialCarrier: number,
  points: TPoint[]
): TCoordinate => {
  let radius = (width / corrector) * scale;
  let meanAngle =
    points && points[Math.round(points.length / 2)]?.carrier + initialCarrier;
  switch (sector.initialAngle) {
    case 90:
      if (scale > 0 && points) {
        return {
          x:
            getCoordinate(meanAngle + sector.initialAngle, radius).x +
            corrector * 20 -
            width,
          y:
            getCoordinate(+meanAngle + sector.initialAngle, radius / corrector)
              .y +
            corrector * 20,
        };
      }
      if (scale === 0) {
        return {
          x: -width + corrector * 20,
          y: -corrector * 20,
        };
      } else {
        return {
          x: getCoordinate(sector.initialAngle + 45, radius).x - width,
          y: getCoordinate(sector.initialAngle + 45, radius).y,
        };
      }
    case 180:
      if (scale > 0 && points) {
        return {
          x: getCoordinate(meanAngle || 45, radius).x + corrector * 20 - width,
          y:
            -getCoordinate(meanAngle || 45, radius / corrector).y -
            corrector * 20 -
            height / corrector,
        };
      }
      if (scale === 0) {
        return {
          x: -width,
          y: -height / corrector,
        };
      } else {
        return {
          x: getCoordinate(sector.initialAngle + 45, radius).x - width,
          y:
            getCoordinate(sector.initialAngle + 45, radius).y -
            height / corrector,
        };
      }

    case 270:
      if (scale > 0 && points) {
        return {
          x: getCoordinate(meanAngle+sector.initialAngle , radius).x - corrector * 20,
          y:-
            getCoordinate(meanAngle+sector.initialAngle , radius / corrector).y -
            corrector * 20-height/corrector,
        };
      }
      if (scale === 0) {
        return {
          x: 0,
          y: -height / corrector,
        };
      } else {
        return {
          x: getCoordinate(sector.initialAngle + 45, radius).x,
          y:
            getCoordinate(sector.initialAngle + 45, radius).y -
            height / corrector,
        };
      }

    default:
      if (scale > 0 && scale != 0 && points) {
        return {
          x: getCoordinate(meanAngle , radius).x + corrector * 20,
          y:
            getCoordinate(meanAngle , radius / corrector).y -
            corrector * 20,
        };
      } else {
        return {
          x: getCoordinate(45, radius).x - corrector * 20,
          y: getCoordinate(45, radius).y - corrector * 20,
        };
      }
  }
};
