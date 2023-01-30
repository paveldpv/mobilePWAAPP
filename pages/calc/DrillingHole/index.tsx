import { useRef, useState, useContext } from "react";
import Router from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { ctxVisibleNav } from "../../../components/components/Layouts";

import Button from "../../../components/UI/Button";
import InputParamsGears from "../../../components/UI/InputParams";
import InputCheckbox from "../../../components/UI/InputCheck";

import { variantTopOpacity } from "../../../FrameVariants/variantTopOpacity";

import { dataDrillingHole } from "../../../data/dataDrillingHole";

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
  let refInitialCarrier = useRef<HTMLInputElement>();
  let inputRefs = [refDiameter, refAmountPointer, refInitialCarrier];
  let refManualChecked = useRef<HTMLInputElement>();

  const goToCalcDrilling = () => {
    let diameter = refDiameter.current?.value;
    let amountPointer = refAmountPointer.current?.value;
    let manual = refManualChecked.current?.checked;
    let initialCarrier = refInitialCarrier.current?.value;
    console.log(`index params manual`,manual);
    
    Router.push(
      `/calc/DrillingHole/params?D=${diameter}&N=${amountPointer}&manual=${manual}&initialcarrier=${initialCarrier}`
    );
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
            {dataDrillingHole.map((param, index) => {
              return (
                <InputParamsGears
                  label={param.label}
                  mark={param.mark}
                  units={param.units}
                  control={param.control}
                  defaultValue={param.defaultValue}
                  ref={inputRefs[index]}
                />
              );
            })}
            <InputCheckbox label={"Вручную"} ref={refManualChecked} />
            <Button label={`Расчитать`} handlerClick={goToCalcDrilling} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
