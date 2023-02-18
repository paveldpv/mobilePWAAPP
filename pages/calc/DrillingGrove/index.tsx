import Router from "next/router";
import dynamic from "next/dynamic";
import { useRef, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ctxVisibleNav } from "../../../components/components/Layouts";
import { dataDrillingGrove } from "../../../data/dataDrlillingGrove";
import { variantTopOpacity } from "../../../FrameVariants/variantTopOpacity";

//import ChangeSectorGrove from "../../../components/UI/ChangeSectorGrove";
import InputParams from "../../../components/UI/InputParams";
import Button from "../../../components/UI/Button";

const ChangeSectorGrove = dynamic(
  () => import("../../../components/UI/ChangeSectorGrove"),
  { ssr: false }
);

export type TGrove ={
  id:number,
  initialAngle :number,
  endAngle:number,
  selected:boolean
}

export default function DrillingGrove() {
  const isVisibleNav = useContext(ctxVisibleNav);
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
  const [sector, setSector] = useState<TGrove[]>([
    {id:1,initialAngle:0,endAngle:90,selected:true},
    {id:2,initialAngle:90,endAngle:180,selected:false},
    {id:3,initialAngle:180,endAngle:270,selected:false},
    {id:4,initialAngle:270,endAngle:360,selected:false}
  ]);
  const changeSector=(id:number):void=>{
    setSector(sectors=>sectors.map(sector=>id===sector.id?{...sector,selected:true}:{...sector,selected:false}))
  }

  const goToCalcDrillingGroove = () => {
    let initialCarrier = refInitialCarrier.current?.value;
    let groveCarrier = refGroveCarrier.current?.value;
    let radiusCenter = refRadiusCenter.current?.value;
    let diameterHole = refDiameterHole.current?.value;
    let currentSector = sector.find(sector=>sector.selected)
    
    Router.push(
      `/calc/DrillingGrove/params?initialCarrier=${initialCarrier}&groveCarrier=${groveCarrier}&radiusCenter=${radiusCenter}&diameterHole=${diameterHole}&sector=${JSON.stringify(currentSector)}`
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
            className="absolute z-10  "
          >
            <span className=" text-basisBlack p-2 rounded-lg ml-12  mt-12 font-SofiaSans text-xl bg-blue ">Размещение</span>
            <div className="mt-2">
              <ChangeSectorGrove sector={sector} changeSector={changeSector}/>
            </div>

            <div className=" flex flex-col items-center ">
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
              <Button
                label={`Расчитать`}
                handlerClick={goToCalcDrillingGroove}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
