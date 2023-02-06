import {Stage,Layer,Circle} from 'react-konva'
type Props = {}

export default function ChangeSectorGrove({}: Props) {
  return (
    <Stage>
      <Layer>
         <Circle fill='red' radius={50}/>
      </Layer>
    </Stage>
  )
}

