import Router from "next/router";
import dynamic from "next/dynamic";
import { useRef, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ctxVisibleNav } from "../../../components/components/Layouts";
import { dataDrillingGrove } from "../../../data/dataDrlillingGrove";
import { variantTopOpacity } from "../../../FrameVariants/variantTopOpacity";

import ChangeSectorGrove from "../../../components/UI/ChangeSectorGrove";
import InputParams from "../../../components/UI/InputParams";
import Button from "../../../components/UI/Button";

const NoSSRComponent = dynamic(
  () => import("../../../components/UI/ChangeSectorGrove"),
  { ssr: false }
);

export default function DrillingGrove() {
  const refInitialCarrier = useRef<HTMLInputElement>(null);
  const refGroveCarrier = useRef<HTMLInputElement>(null);
  const refRadiusCenter = useRef<HTMLInputElement>(null);
  const refDiameterHole = useRef<HTMLInputElement>(null);
  const inputRefs = [
    refRadiusCenter,
    refGroveCarrier,
    refInitialCarrier,
    refDiameterHole,
  ];

  const isVisibleNav = useContext(ctxVisibleNav);
  
  const goToCalcDrillingGroove = () => {
    let initialCarrier = refInitialCarrier.current?.value;
    let groveCarrier = refGroveCarrier.current?.value;
    let radiusCenter = refRadiusCenter.current?.value;
    let diameterHole = refDiameterHole.current?.value;
    Router.push(
      `/calc/DrillingGrove/params?initialCarrier=${initialCarrier}&groveCarrier=${groveCarrier}&radiusCenter=${radiusCenter}&diameterHole=${diameterHole}`
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
            <div>
              <ChangeSectorGrove/>
            </div>
            {dataDrillingGrove.map((param, index) => (
              <InputParams
                key={index}
                control={param.control}
                label={param.label}
                mark={param.mark}
                units={param.units}
                defaultValue={param.defaultValue}
                ref={inputRefs[index]}
              />
            ))}
            <Button label={`Расчитать`} handlerClick={goToCalcDrillingGroove} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
