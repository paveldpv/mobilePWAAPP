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
  points?: TPoint[]
): TCoordinate => {
  let radius = (width / corrector) * scale;
  let centerY = width / 2;
  let centerX = height / 2;
  switch (sector.initialAngle) {
    case 90:
      if (scale > 0 && points) {
        return {
          x: points[Math.round(points.length / 2)]?.coordinate.absolute.x,
          y: points[Math.round(points.length / 2)]?.coordinate.absolute.x,
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
          x: points[Math.round(points.length / 2)]?.coordinate.absolute.x,
          y: points[Math.round(points.length / 2)]?.coordinate.absolute.x,
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
          x: points[Math.round(points.length / 2)]?.coordinate.absolute.x,
          y: points[Math.round(points.length / 2)]?.coordinate.absolute.x,
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
        let pointX =
          points[Math.round(points.length / 2)]?.coordinate.absolute.x;
        let pointY =
          points[Math.round(points.length / 2)]?.coordinate.absolute.y;
        let r = Math.sqrt(
          Math.pow(centerX - pointX, 2) - Math.pow(centerY - pointY, 2)
        );
        return {
          x:- pointX*scale+60,
          y: pointY*scale+height/4/corrector,
        };
      } else {
        return {
          x: getCoordinate(45, radius).x - corrector * 20,
          y: getCoordinate(45, radius).y - corrector * 20,
        };
      }
  }
};
