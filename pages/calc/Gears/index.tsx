
import InputParamsGears from '../../../components/UI/InputParamsGears'
import { dataCalcGears } from '../../../data/dataCalcGears'

type Props = {}

export default function Gears({}: Props) {
  return (
    <div>
      <InputParamsGears units={dataCalcGears[0].units} mark={dataCalcGears[0].mark} label={dataCalcGears[0].label} control= {dataCalcGears[0].control}/>
    </div>
  )
}