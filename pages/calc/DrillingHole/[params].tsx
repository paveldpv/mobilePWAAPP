import { useRouter } from "next/router";
import { useContext,useState } from "react";

import dynamic from "next/dynamic";

import { AnimatePresence, motion } from "framer-motion";
import { variantTopOpacity } from "../../../FrameVariants/variantTopOpacity";
import { ctxVisibleNav } from "../../../components/components/Layouts";

import KonvaHole from "../../../components/components/KonvaHole";
import { TCalcGears } from "../../../data/dataCalcGears";

import Range from "../../../components/UI/Range";


const NoSSRComponent = dynamic(
  () => import("../../../components/components/KonvaHole"),
  {
    ssr: false,
  }
);

export default function CalcDrillingHole() {
  const params                      = useRouter();
  let   diameter                    = Number(params.query.D);
  let   amountPointer               = Number(params.query.N);
  let   manual                      = !!JSON.parse(params.query.manual as string) ;
  let   initialCarrier              = Number(params.query.initialcarrier);
  
  
  let   dataParams: Pick<TCalcGears, "label" | "value" | "units">[] = [
    {
      label: `Диаметр`,
      value: diameter || 0,
      units: "ММ",
    },
    {
      label: `Кол-во точек`,
      value: amountPointer || 0,
      units: "ШТ",
    },
    {
      label: `Начальный угол`,
      value: initialCarrier || 0,
      units: "ГР-Ы",
    },
  ];

  let isVisibleNav = useContext(ctxVisibleNav);

  const [quality,setQuality]=useState(10)

  return (
    <div className="relative ">
      <AnimatePresence>
        {!isVisibleNav && (
          <motion.div
            variants={variantTopOpacity}
            initial={"hidden"}
            exit={"exit"}
            animate={"visible"}
          >
            <div>
              <KonvaHole
                amountPointer={amountPointer}
                diameter={diameter}
                manual={manual}
                initialCarrier={initialCarrier}
                quality = {quality}
              />
            </div>
            <div className=" p-4 mt-4 text-white font-SofiaSans border-t-2 ml-2 mr-2">
              {manual && <Range quality={quality} setQuality={setQuality}/>}
              {dataParams.map((param, index) => {
                return (
                  <ul key={index}>
                    <li className=" p-1 text-2xl text-center">
                      <p>
                        <span className=" font-bold ">{param.label}</span> :
                        <span className=" pl-2 ">
                          {param.value}
                          <span className=" font-Lobster text-xs pl-1">
                            {param.units}
                          </span>
                        </span>
                      </p>
                    </li>
                  </ul>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
