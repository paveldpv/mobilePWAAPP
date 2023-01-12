import { TCalcGears } from "../../data/dataCalcGears";

export default function InputParamsGears({
  label,
  units,
  mark,
  ref,
  value,
  control,
}: TCalcGears) {
  return (
    <div
      className={` my-2 grid grid-cols-5  border-solid rounded-md w-11/12 mx-auto font-SofiaSans  text-center ${
        control ? "bg-blue" : "bg-basicPurple"
      } shadow-2xl text-basisBlack`}
    >
      <div className=" col-span-3 text-center align-middle font-bold text-xl pt-3 shadow-sm">
        {label}
      </div>
      <div className="  border-l-2 border-r-2 border-basisBlack ">
        <div className=" border-b-2 border-basisBlack  font-Lobster">
          {mark}
        </div>
        <div>{units}</div>
      </div>
      <div className="p-1">
        <input
          type="number"
          ref={ref}
          defaultValue={2}
          className=" text-center text-3xl font-bold rounded-md p-1 w-full h-full"
        />
      </div>
    </div>
  );
}
