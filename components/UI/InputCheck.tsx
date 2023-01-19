import { forwardRef, MutableRefObject } from "react";
import { motion } from "framer-motion";

type TCheckbox = {
  label: String;
  ref: MutableRefObject<HTMLInputElement> | null;
};

const InputCheckbox = forwardRef(({ label }: TCheckbox, ref) => {
  return (
    <div className="grid grid-cols-5 border-4  border-solid border-black rounded-xl p-10 mt-2 mb-2">
      <div className=" col-span-3 font-SofiaSans text-4xl font-bold text-basicBlack mr-10">
        <motion.div
          animate={{ y: [0, -20, 20], color: "#FED47E" }}
          transition={{
            delay: 5,
            duration: 1,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          {label}
        </motion.div>
      </div>
      <div className="col-span-2">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" ref={ref} />
          <div className="w-20 h-9 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white  after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-basisBlack after:rounded-full after:h-8 after:w-9 after:transition-all peer-checked:bg-cardGreen"></div>
        </label>
      </div>
    </div>
  );
});

export default InputCheckbox;
