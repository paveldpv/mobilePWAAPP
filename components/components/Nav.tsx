import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { dataNav } from "../../data/dataNav";
import ButtonNav from "../UI/ButtonNav";
import {variantLeftOpacity} from './../../FrameVariants/variantLeftOpacity'

type Props = {
  setVisibleNav:()=>void
};



export default function Nav({setVisibleNav}: Props) {


  return (
    <div className="relative">
      <HiX size={40} className=" absolute -top-48 right-2  text-white" onClick={setVisibleNav}/>
      <ul className=" font-SofiaSans p-2 mx-auto text-center h-auto my-48 ">
      {dataNav.map((nav, index) => (
        <motion.li className="text-2xl my-7"
          key={index}
          variants={variantLeftOpacity}
          initial={"hidden"}
          animate={"visible"}
          custom={index}
        >
          <ButtonNav href={nav.href} label={nav.label} handler={setVisibleNav} />
        </motion.li>
      ))}
    </ul>
    </div>
  );
}
