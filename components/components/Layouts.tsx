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
    <div className=" h-screen overflow-hidden w-screen relative bg-lime-900">
      <AnimatePresence>
        {!isVisibleNav &&
        <motion.div
        initial={{y:-100}}
        animate={{y:0}}
        transition={{delay:0.1}}
        exit={{y:-100}}>
           <HiViewList size={40} onClick={()=>setVisibleNav(true)}/>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {isVisibleNav && (
          <motion.div className=" shadow-2xl bg-gradient-to-t from-yellow-700 to-yellow-900  absolute mr-4 top-8 rounded-r-lg border-2 border-teal-900 border-solid"           
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
