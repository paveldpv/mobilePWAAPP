import { useRef } from "react";

import InputParamsGears from "../../../components/UI/InputParamsGears";
import Button from "../../../components/UI/Button";
import { dataCalcGears } from "../../../data/dataCalcGears";

import axios from "axios";

type Props = {};

export default function Gears({}: Props) {

  const testRef = useRef(null)
  const calcGears = () => {
    console.log(testRef.current.value);
    
    
  };

  return (
    <div className="flex flex-col items-center">
      <input type="text" ref={testRef} />
      {dataCalcGears.map((item,index) => {
        return (
          item.control && (
            <InputParamsGears key={index}
              units={item.units}
              mark={item.mark}
              label={item.label}
              control={item.control}
              
            />
          )
        );
      })}
      <Button label="Расчитать" handlerClick={calcGears} />
      {dataCalcGears.map((item,index) => {
        return (
          !item.control && (
            <InputParamsGears key={index}
              units={item.units}
              mark={item.mark}
              label={item.label}
              control={item.control}
            />
          )
        );
      })}
    </div>
  );
}
