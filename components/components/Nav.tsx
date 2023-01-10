import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { dataNav } from "../../data/dataNav";
import ButtonNav from "../UI/ButtonNav";


type Props = {
  setVisibleNav:React.Dispatch<React.SetStateAction<Boolean>>
};

export default function Nav({setVisibleNav}: Props) {
  const listNavVariant = {
    visible: (i: Number) => ({
      x: 0,
      transition: {
        delay: Number(i) * 0.5,
      },
    }),
    hidden: {
      x: -500,
    },
  };
  return (
    <div className="relative">
      <HiX size={40} className=" absolute -top-48 right-2" onClick={()=>setVisibleNav(false)}/>
      <ul className="p-2 mx-auto text-center h-auto my-48 ">
      {dataNav.map((nav, index) => (
        <motion.li className="text-2xl my-7"
          key={index}
          variants={listNavVariant}
          initial={"hidden"}
          animate={"visible"}
          custom={index}
        >
          <ButtonNav href={nav.href} label={nav.label} />
        </motion.li>
      ))}
    </ul>
    </div>
  );
}
