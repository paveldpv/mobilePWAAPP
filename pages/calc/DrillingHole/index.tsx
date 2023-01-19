import { useRef, useState, useContext } from "react";
import Router from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { ctxVisibleNav } from "../../../components/components/Layouts";

import Button from "../../../components/UI/Button";
import InputParamsGears from "../../../components/UI/InputParams";
import InputCheckbox from "../../../components/UI/InputCheck";

import { variantTopOpacity } from "../../../FrameVariants/variantTopOpacity";

type Props = {};

type TParams = {
  diameter: Number;
  amount: Number;
  manual: false;
};

export default function DrillingHole({}: Props) {
  let isVisibleNav = useContext(ctxVisibleNav);
  let refDiameter = useRef<HTMLInputElement>();
  let refAmountPointer = useRef<HTMLInputElement>();
  let refManualChecked = useRef<HTMLInputElement>()
  

  const goToCalcDrilling = () => {
    let diameter = refDiameter.current?.value;
    let amountPointer  =refAmountPointer.current?.value;
    let manual = refManualChecked.current?.checked
   //console.log(refDiameter);
    // console.log(refManualChecked?.current?.checked);
    
    Router.push(`/calc/DrillingHole/params?D=${diameter}&N=${amountPointer}&manual=${manual}`)
  };

  return (
    <div className="relative">     
      <AnimatePresence>
        {!isVisibleNav && (
          <motion.div
            variants={variantTopOpacity}
            initial={"hidden"}
            exit={"exit"}
            animate={"visible"}
            className="absolute z-10 top-52 flex flex-col items-center "
          >
            <InputParamsGears
              label={"Диаметр"}
              mark={"D"}
              units={"ММ"}
              control={true}
              defaultValue={200}
              ref={refDiameter}
            />
            <InputParamsGears
              label={"Кол-во точек"}
              mark={"N"}
              units={"ШТ"}
              control={true}
              defaultValue={4}
              ref={refAmountPointer}
            />
            <InputCheckbox label={'Вручную'} ref={refManualChecked}/>
            <Button label={`Расчитать`} handlerClick={goToCalcDrilling} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
