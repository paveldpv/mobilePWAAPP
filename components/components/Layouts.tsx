import { useState, createContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiViewList, HiX } from "react-icons/hi";
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
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              exit={{ y: -100 }}
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
              className=" shadow-2xl bg-basisBlack absolute mr-4 top-8 rounded-r-lg z-40"
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
              exit={{ x: -500 }}
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
