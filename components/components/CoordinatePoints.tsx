import {Line,Text,Circle,Layer,Stage} from 'react-konva'
import { TPoint } from './KonvaHole'



export default function CoordinatePoints({manual,coordinate,carrier}: TPoint) {
  return (
    <>
      <Circle/>
      {coordinate.map(coordinate=>{
        return(
          <>
            <Text text={`${coordinate}`}/>
            <Line />
          </>
        )
      })}
      
    </>
  )
}