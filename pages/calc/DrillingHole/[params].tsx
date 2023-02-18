import { useRouter } from "next/router";
import {  useState } from "react";

import dynamic from "next/dynamic";

import { TCalcGears } from "../../../data/dataCalcGears";

import Range from "../../../components/UI/Range";
import LayoutsParams from "../../../components/components/LayoutsParams";

const KonvaHole = dynamic(
  () => import("../../../components/components/KonvaHole"),
  {
    ssr: false,
    
  }
);

export default function CalcDrillingHole() {
  const params = useRouter();
  let diameter = Number(params.query.D || 200);
  let amountPointer = Number(params.query.N || 4);
  let manual = !!JSON.parse((params.query.manual || false) as string );
  let initialCarrier = Number(params.query.initialcarrier || 45);

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

  const [quality, setQuality] = useState(10);

  return (
    <LayoutsParams>
      <>
        <div>
          <KonvaHole
            amountPointer={amountPointer}
            diameter={diameter}
            manual={manual}
            initialCarrier={initialCarrier}
            quality={quality}
          />
        </div>
        <div className=" p-4 mt-4 text-white font-SofiaSans border-t-2 ml-2 mr-2">
          {manual && <Range quality={quality} setQuality={setQuality} />}
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
      </>
    </LayoutsParams>
  );
}
