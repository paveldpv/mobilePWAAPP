import { useRouter } from "next/router"


type Props = {}

export default function CalcDrillingHole({}: Props) {

  const params =useRouter()
  let diameter = params.query.D as Number |undefined
  let amountPointer = params.query.N as Number |undefined
  let manual = params.query.manual as Boolean |undefined

  
  
  return (
    <div>drillinghole[params]</div>
  )
}