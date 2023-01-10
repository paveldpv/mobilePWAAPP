import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiViewList,HiX } from "react-icons/hi";
import Nav from "./Nav";

type Props = {
  children?: any;
};

export default function Layouts({ children }: Props) {
  const [isVisibleNav, setVisibleNav] = useState<boolean>(true);
   

  return (
    <div className=" h-screen overflow-hidden w-screen relative bg-slate-800">
      <button onClick={() => setVisibleNav((prev) => !prev)}>
         {isVisibleNav? <HiX size={40} className=' text-red-700'/>:<HiViewList size={40}/>}
      </button>
      <AnimatePresence>
        {isVisibleNav && (
          <motion.div className=" bg-gradient-to-t from-sky-400 to-sky-700  absolute mr-4 rounded-r-lg border-2 border-sky-800 border-solid"           
            initial={{x: -500}}
            animate={{x: 0}}
            transition={{ delay: 0.5 }}
            exit={{x:-500}}
          >
            <Nav />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
