import Link from "next/link";

import { TNav } from "../../data/dataNav";


export default function ButtonNav({ label, href,handler ,params}: TNav) {
  return (
    <button className="p-2 rounded-3xl w-2/3  mt-2 bg-cardGreen shadow-2xl" onClick={handler}>
      <Link className=" block" href={{pathname:href,query:params}}  >{label}</Link>
    </button>
  );
}
