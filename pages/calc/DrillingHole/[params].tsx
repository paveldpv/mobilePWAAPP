import { useRouter } from "next/router";
import { useContext } from "react";

import dynamic from "next/dynamic";

import { AnimatePresence, motion } from "framer-motion";
import { variantTopOpacity } from "../../../FrameVariants/variantTopOpacity";
import { ctxVisibleNav } from "../../../components/components/Layouts";

import KonvaHole from "../../../components/components/KonvaHole";
import { TCalcGears } from "../../../data/dataCalcGears";

type Props = {};

const NoSSRComponent = dynamic(
  () => import("../../../components/components/KonvaHole"),
  {
    ssr: false,
  }
);

export default function CalcDrillingHole({}: Props) {
  const params = useRouter();
  let diameter = params.query.D as number | undefined;
  let amountPointer = params.query.N as number | undefined;
  let manual = params.query.manual as boolean | undefined;
  let initialCarrier = params.query.initialcarrier as number | undefined;
  let dataParams: Pick<TCalcGears, "label" | "value" | "units">[] = [
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
                initialCarrier = {initialCarrier}
              />
            </div>
            <div className=" p-4 mt-4 text-white font-SofiaSans border-t-2 ml-2 mr-2">
              {dataParams.map((param, index) => {
                return (
                  <ul>
                    <li className=" p-1 text-2xl text-center">
                      <p>
                        <span className=" font-bold ">{param.label}</span> :
                        <span className=" pl-2 ">
                          {param.value}
                          <span className=" font-Lobster text-xs pl-1">{param.units}</span>
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
