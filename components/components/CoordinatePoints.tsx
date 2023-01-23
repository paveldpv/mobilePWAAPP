import { Line, Text, Circle, Layer, Stage, Group } from 'react-konva'
import { TPoint } from './KonvaHole'

export default function CoordinatePoints({
	id,
	manual,
	coordinate,
	carrier,
	pointRadius,
}: TPoint & { pointRadius: number }) {
	const { absolute, relative } = coordinate

	return (
		<Group>
			<Circle
				x={relative.x}
				y={relative.y}
				fill='#FCFFFD'
				radius={pointRadius}
				stroke='#8AC187'
				strokeWidth={4}
			/>
			<Group>
				<Line
					stroke='#FCFFFD'
					points={[relative.x, relative.y, 0, relative.y]}
					dash={[10, 10]}
				/>
				<Text />
			</Group>
			<Group>
				<Line
					stroke='#FCFFFD'
					points={[relative.x, relative.y, relative.x, 0]}
					dash={[10, 10]}
				/>
				<Text />
			</Group>
		</Group>
	)
}
