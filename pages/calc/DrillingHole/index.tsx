import { useRef, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ctxVisibleNav } from "../../../components/components/Layouts";
import Button from "../../../components/UI/Button";
import ButtonNav from "../../../components/UI/ButtonNav";
import InputParamsGears from "../../../components/UI/InputParams";

type Props = {};

type TParams ={
  diameter:Number,
  amount:Number
}

export default function DrillingHole({}: Props) {
  const isVisibleNav = useContext(ctxVisibleNav);
  const refDiameter = useRef<HTMLInputElement>()
  const refAmount = useRef<HTMLInputElement>()

  const [params, setParams] = useState<TParams>({diameter:200,amount:4});

  const goToCalcDrilling =()=>{
    console.log({
      diameter:Number(refDiameter.current?.value),
      amount:Number(refAmount.current?.value)
    });
    
    setParams({
      diameter:Number(refDiameter.current?.value),
      amount:Number(refAmount.current?.value)
    })
    
    
  }

  return (
    <AnimatePresence>
      {!isVisibleNav && (
        <motion.div >
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
            ref={refAmount}
          />
          <ButtonNav href={`/calc/DrillingHole/calc`} label="Расчитать" params={params} handler={goToCalcDrilling} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
