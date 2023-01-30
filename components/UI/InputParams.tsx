import { TCalcGears } from "../../data/dataCalcGears";
import React ,{RefObject} from "react";

const InputParams = React.forwardRef(
  ({ label, mark, units, control,  defaultValue, value  }: TCalcGears,ref) => {
    
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
          <div className=" border-b-2 border-basisBlack  font-Lobster ">
            {mark}
          </div>
          <div className=" align-middle inline-block">{units}</div>
        </div>
        <div className="p-1">
          {control  ? (
            <input
              type="number"
              ref={ref as RefObject<HTMLInputElement>}
              defaultValue={Number(defaultValue) | 0}
              className=" text-center text-3xl font-bold rounded-md p-1 w-full h-full"
            />
          ) : (
            <div className={` text-center  font-bold rounded-md p-1 w-full h-full ${value&& value.toString().length>3 ? ' text-xl':'text-3xl'}`}>
              {`${value}`}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default InputParams;
