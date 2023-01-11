import { TCalcGears } from "../../data/dataCalcGears"

export default function InputParamsGears({label,units,mark,ref,value}: TCalcGears) {
  return (
    <div className={` grid grid-cols-5 border-2 border-solid border-black rounded-md w-11/12 mx-auto`}>
      <div className=" col-span-3 text-center align-middle">{label}</div>
      <div className=" border-r-2 border-l-2 border-black">
        <div className=" border-b-2 border-black"> = {mark}</div>
        <div>{units}</div>
      </div>
      <div className="p-1">
       <input type="number" className=" w-full h-full"/>
      </div>
    </div>
  )
}