import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiViewList,HiX } from "react-icons/hi";
import Nav from "./Nav";

type Props = {
  children?: any;
};

export default function Layouts({ children }: Props) {
  const [isVisibleNav, setVisibleNav] = useState<Boolean>(true);
   

  return (
    <div className=" h-screen overflow-hidden w-screen relative bg-basisBlack  ">
      <AnimatePresence>
        {!isVisibleNav &&
        <motion.div
        initial={{y:-100}}
        animate={{y:0}}
        transition={{delay:0.1}}
        exit={{y:-100}}>
           <HiViewList className="text-white" size={40} onClick={()=>setVisibleNav(true)}/>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {isVisibleNav && (
          <motion.div className=" shadow-2xl bg-cardGreen absolute mr-4 top-8 rounded-r-lg "           
            initial={{x: -500}}
            animate={{x: 0}}
            transition={{ delay: 0.3 }}
            exit={{x:-500}}
          >
            <Nav  setVisibleNav={setVisibleNav} />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
