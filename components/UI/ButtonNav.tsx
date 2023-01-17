import Link from "next/link";

import { TNav } from "../../data/dataNav";


export default function ButtonNav({ label, href,handlerClose }: TNav) {
  return (
    <button className="p-2 rounded-3xl w-2/3  mt-2 bg-cardGreen shadow-2xl" onClick={()=>handlerClose(false)}>
      <Link href={href}>{label}</Link>
    </button>
  );
}
