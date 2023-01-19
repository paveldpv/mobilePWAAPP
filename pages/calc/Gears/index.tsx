import { useRef, useState, useContext } from "react";
import $axios from "../../../config/axios";
import { AnimatePresence, motion } from "framer-motion";

import { ctxVisibleNav } from "../../../components/components/Layouts";
import InputParams from "../../../components/UI/InputParams";
import Button from "../../../components/UI/Button";
import { dataCalcGears } from "../../../data/dataCalcGears";

import { variantTopOpacity } from "../../../FrameVariants/variantTopOpacity";

import {
  getAmountTeeth,
  getCommonNormal,
  getCornerProfile,
  getLengthCommonNormal,
} from "./../../../function/getEquationCalcGears";

type Props = {};

export default function Gears({}: Props) {
  const isVisibleNav = useContext(ctxVisibleNav);

  const moduleRef = useRef<HTMLInputElement>();
  const amountTeethRef = useRef<HTMLInputElement>();
  const cornerRef = useRef<HTMLInputElement>();
  const KGearsRef = useRef<HTMLInputElement>();
  const cornerInitialRef = useRef<HTMLInputElement>();
  const inputRefs = [
    moduleRef,
    amountTeethRef,
    cornerRef,
    KGearsRef,
    cornerInitialRef,
  ];

  const [outCornerProfileRef, setOutCornerProfileRef] = useState<Number>(0);
  const [outCountTeethRef, setOutCountTeethRef] = useState<Number>(0);
  const [outCountTeethInLengthWRef, setOutCountTeethInLengthWRef] =
    useState<Number>(0);
  const [outCountW, setOutCountW] = useState<Number>(0);

  const outputValue = [
    outCornerProfileRef,
    outCountTeethRef,
    outCountTeethInLengthWRef,
    outCountW,
  ];

  const calcGears = async () => {
    let module = Number(moduleRef.current?.value);
    let amountTeeth = Number(amountTeethRef.current?.value);
    let corner = Number(cornerRef.current?.value);
    let KGears = Number(KGearsRef.current?.value);
    let cornerInitial = Number(cornerInitialRef.current?.value);

    let calcGear = {
      expr: [
        `${getCornerProfile(corner, cornerInitial)}`,
        `${getAmountTeeth(amountTeeth, corner, cornerInitial)}`,
        `${getCommonNormal(amountTeeth, corner, KGears, cornerInitial)}`, //round
        `${getLengthCommonNormal(
          module,
          amountTeeth,
          corner,
          KGears,
          cornerInitial
        )}`,
      ],
      precision: 8,
    };

    const res = await $axios.post(``, calcGear);
    const data = res.data.result as String[];

    setOutCornerProfileRef(Number(data[0]));
    setOutCountTeethRef(Number(data[1]));
    setOutCountTeethInLengthWRef(Math.round(Number(data[2])));
    setOutCountW(Number(Number(data[3]).toFixed(2)));
  };

  return (
    <div className=" relative">
      <AnimatePresence>
        {!isVisibleNav && (
          <motion.div
            variants={variantTopOpacity}
            initial={'hidden'}            
            exit={'exit'}
            animate={'visible'}
            className={` absolute z-10 top-2 flex flex-col items-center`}
          >
            {dataCalcGears.map((item, index) => {
              return (
                item.control && (
                  <InputParams
                    key={index}
                    units={item.units}
                    mark={item.mark}
                    label={item.label}
                    control={item.control}
                    ref={inputRefs[index]}
                    defaultValue={item.defaultValue}
                  />
                )
              );
            })}
            <Button label="Расчитать" handlerClick={calcGears} />
            {dataCalcGears.map((item, index) => {
              return (
                !item.control && (
                  <InputParams
                    key={index}
                    units={item.units}
                    mark={item.mark}
                    label={item.label}
                    control={item.control}
                    value={outputValue[index - 5]}
                  />
                )
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
