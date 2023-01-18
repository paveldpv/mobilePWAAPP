import { useRouter } from "next/router"

type Props = {}

export default function CalcDrillingHole({}: Props) {

  const t =useRouter()
  console.log(t);
  
  return (
    <div>drillinghole[params]</div>
  )
}