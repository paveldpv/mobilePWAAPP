import { useState, createContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiViewList } from "react-icons/hi";
import Nav from "./Nav";

type Props = {
  children?: any;
};

export const ctxVisibleNav = createContext<Boolean>(true);

export default function Layouts({ children }: Props) {
  const [isVisibleNav, setVisibleNav] = useState<Boolean>(true);

  const closeNavBar = ()=>{
    setVisibleNav(false)
  }

  return (
    <ctxVisibleNav.Provider value={isVisibleNav}>
      <div className=" h-screen overflow-hidden w-screen relative bg-basisBlack  ">        
        <AnimatePresence>
          {!isVisibleNav && (
            <motion.div 
            className=" relative top-2 "
              initial={{ y: -1000 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
              exit={{ y: -1000 }}
            >
              <HiViewList 
                className="text-white"
                size={40}
                onClick={() => setVisibleNav(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isVisibleNav && (
            <motion.div
              className=" shadow-2xl bg-red absolute mr-4 top-8 rounded-r-lg z-40 h-5/6 w-11/12"
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
              exit={{ x: -1000 }}
            >
              <Nav setVisibleNav={closeNavBar} />
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </div>
    </ctxVisibleNav.Provider>
  );
}
