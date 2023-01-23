import { useRouter } from "next/router";
import { useContext } from "react";

import dynamic from "next/dynamic";

import { AnimatePresence, motion } from "framer-motion";
import { variantTopOpacity } from "../../../FrameVariants/variantTopOpacity";
import { ctxVisibleNav } from "../../../components/components/Layouts";

import KonvaHole from "../../../components/components/KonvaHole";

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

  let isVisibleNav = useContext(ctxVisibleNav);

  return (
    <div className="relative">
      <AnimatePresence>
        {!isVisibleNav && (
          <motion.div
            variants={variantTopOpacity}
            initial={"hidden"}
            exit={"exit"}
            animate={"visible"}
            className={`grid grid-rows-3`}
          >
            <KonvaHole amountPointer={amountPointer} diameter={diameter} manual={manual} />
            <div className=" row-span-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quae aut eveniet, necessitatibus consectetur repellendus accusamus corrupti beatae tenetur dolore? Quam, fugit ducimus expedita molestias natus provident culpa mollitia cum.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
