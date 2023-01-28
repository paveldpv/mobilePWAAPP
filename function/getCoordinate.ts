import { TCoordinate } from '../components/components/KonvaHole'

export const getCoordinate = (
	carrier: number,
	radius: number,
	i: number
): TCoordinate => {
	return {
		
		x: +Math.cos(((carrier ) / 180) * Math.PI).toFixed(3) * radius,
		y: +Math.sin(((carrier ) / 180) * Math.PI).toFixed(3) * radius
	}
}
