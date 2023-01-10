import { motion } from "framer-motion";

import { dataNav } from "../../data/dataNav";
import ButtonNav from "../UI/ButtonNav";
type Props = {};

export default function Nav({}: Props) {
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
  );
}
