import React, { useRef, useState } from "react";

import InputParamsGears from "../../../components/UI/InputParamsGears";
import Button from "../../../components/UI/Button";
import { dataCalcGears } from "../../../data/dataCalcGears";

import {getAmountTeeth,getCommonNormal,getCornerProfile,getLengthCommonNormal} from './../../../function/getEquationCalcGears'

import $axios from "../../../config/axios";

type Props = {};

export default function Gears({}: Props) {
  const moduleRef = React.createRef<HTMLInputElement>();
  const amountTeethRef = React.createRef<HTMLInputElement>();
  const cornerRef = React.createRef<HTMLInputElement>();
  const KGearsRef = React.createRef<HTMLInputElement>();
  const cornerInitialRef = React.createRef<HTMLInputElement>();
  const inputRefs = [
    moduleRef,
    amountTeethRef,
    cornerRef,
    KGearsRef,
    cornerInitialRef,
  ];

  const [outCornerProfileRef, setOutCornerProfileRef] = useState(0);
  const [outCountTeethRef, setOutCountTeethRef] = useState(0);
  const [outCountTeethInLengthWRef, setOutCountTeethInLengthWRef] = useState(0);
  const [outCountW, setOutCountW] = useState(0);

  const outputValue = [
    outCornerProfileRef,
    outCountTeethRef,
    outCountTeethInLengthWRef,
    outCountW,
  ];

  const calcGears = async () => {
    let module = Number(moduleRef.current?.value)
    let amountTeeth = Number(amountTeethRef.current?.value)
    let corner = Number(cornerRef.current?.value)
    let KGears = Number(KGearsRef.current?.value)
    let cornerInitial= Number(cornerInitialRef.current?.value)
    
    let calcGear = {
      expr: [
        `a=${getCornerProfile(corner,cornerInitial)}`,
        `b=${getAmountTeeth(amountTeeth,corner,cornerInitial)}`,
        `c=${getCommonNormal(amountTeeth,corner,KGears,cornerInitial)}`,//round
        `d=${getLengthCommonNormal(module,amountTeeth,corner,KGears,cornerInitial)}`
      ],
      precision: 14
    }
    
      const t = await $axios.post(``,calcGear)
      console.log(t);
      
  };

  return (
    <div className="flex flex-col items-center">
      {dataCalcGears.map((item, index) => {
        return (
          item.control && (
            <InputParamsGears
              key={index}
              units={item.units}
              mark={item.mark}
              label={item.label}
              control={item.control}
              myref={inputRefs[index]}
              defaultValue={item.defaultValue}
            />
          )
        );
      })}
      <Button label="Расчитать" handlerClick={calcGears} />
      {dataCalcGears.map((item, index) => {        
        return (
          !item.control && (
            <InputParamsGears
              key={index}
              units={item.units}
              mark={item.mark}
              label={item.label}
              control={item.control}
              value={outputValue[index-5]}
            />
          )
        );
      })}
    </div>
  );
}
