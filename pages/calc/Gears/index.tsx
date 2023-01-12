import React from "react"; 

import InputParamsGears from "../../../components/UI/InputParamsGears";
import Button from "../../../components/UI/Button";
import { dataCalcGears } from "../../../data/dataCalcGears";

import axios from "axios";

type Props = {};

export default function Gears({}: Props) {

  const moduleRef = React.createRef()
   const amountTeethRef = React.createRef()
    const cornerRef = React.createRef()
     const KGearsRef = React.createRef()
      const cornerInitialRef = React.createRef()
const arrRef = [moduleRef,amountTeethRef,cornerRef,KGearsRef,cornerInitialRef]
  const calcGears = () => {
   console.log(moduleRef.current.value);
   console.log(amountTeethRef.current.value);
   
    
  };

  return (
    <div className="flex flex-col items-center">
        

      {dataCalcGears.map((item,index) => {
        return (
          item.control && (
            <InputParamsGears key={index}
              units={item.units}
              mark={item.mark}
              label={item.label}
              control={item.control}       
              myref={arrRef[index]}
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
