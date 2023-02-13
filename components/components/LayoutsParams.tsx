import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ctxVisibleNav } from "./Layouts";
import { variantTopOpacity } from "../../FrameVariants/variantTopOpacity";

type TLayoutsParams = {
  children: any;
};

export default function LayoutsParams({ children }: TLayoutsParams) {
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
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
