import { useRouter } from "next/router";
import LayoutsParams from "../../../components/components/LayoutsParams";
import Range from "../../../components/UI/Range";
import dynamic from "next/dynamic";
import { useState,useReducer,useRef } from "react";
import { TGrove } from ".";
import { TPoint } from "../../../components/components/KonvaHole";
import InputCheckbox from "../../../components/UI/InputCheck";

const KonvaGrove = dynamic(
  () => import("../../../components/components/KonvaGrove"),
  { ssr: false }
);

export default function CalcDrillingGrove() {
  const params = useRouter();
  const initialCarrier = Number(params.query.initialCarrier);
  const groveCarrier = Number(params.query.groveCarrier);
  const radiusCenter = Number(params.query.radiusCenter);
  const radiusHole = Number(params.query.diameterHole);
  const sector = JSON.parse(params.query.sector as string) as TGrove;
  
  const [quality, setQuality] = useState(4);
  const [scale, setScale] = useState(0);
  const [checked ,setChecked ]=useReducer(prev=>!prev,true)

  return (
    <LayoutsParams>
      <div className=" relative">
        <div className="">
          <KonvaGrove
            sector={sector}
            radiusHole={radiusHole}
            quality={quality}
            initialCarrier={initialCarrier}
            groveCarrier={groveCarrier}
            radiusCenter={radiusCenter}
            scale={scale}
            draggable={checked}
          />
        </div>
        <div className="text-white font-SofiaSans border-t-2 m-4">
          <Range
            label="Точность"
            quality={quality}
            setQuality={setQuality}
            maxValue={50}
          />
          <Range
            label="Масшатаб "
            maxValue={2}
            minValue={-1}
            stepRange={0.1}
            quality={scale}
            setQuality={setScale}
          />
          <InputCheckbox label={`Зафиксировать `} setChecked={setChecked}/>
        </div>
      </div>
    </LayoutsParams>
  );
}
