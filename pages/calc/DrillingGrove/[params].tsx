import { useRouter } from "next/router";
import LayoutsParams from "../../../components/components/LayoutsParams";
import Range from "../../../components/UI/Range";
import dynamic from "next/dynamic";
import {useState } from "react";
import { TGrove } from ".";
import { TPoint } from "../../../components/components/KonvaHole";

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
  const [scaleX,setScaleX]=useState(0)
  const [scaleY,setScaleY]=useState(1)
  
  return (
    <LayoutsParams>
      <div className=" relative">
        <div className="ml-4">
          <KonvaGrove
            sector={sector}
            radiusHole={radiusHole}
            quality={quality}
            initialCarrier={initialCarrier}
            groveCarrier={groveCarrier}
            radiusCenter={radiusCenter}
            scaleX={scaleX}
            scaleY={scaleY}
          />
        </div>
        <div className="text-white font-SofiaSans border-t-2 m-4">
          <Range
            label="Точность"
            quality={quality}
            setQuality={setQuality}
            maxValue={50}
          />
          <Range label="Масшатаб оси X" maxValue={2} minValue={-2} stepRange={0.1} quality={scaleX} setQuality={setScaleX}/>
          <Range label="Масштаб оси Y" maxValue={2} minValue={0.1} stepRange={0.1} quality={scaleY} setQuality={setScaleY}/>
        </div>
      </div>
    </LayoutsParams>
  );
}
