import Link from "next/link";

import { TNav } from "../../data/dataNav";

export default function ButtonNav({ label, href }: TNav) {
  return (
    <button className=" p-2 rounded-md w-2/3 border-2 border-violet-600 text-violet-900 mt-2 bg-gradient-to-t from-violet-500 to-violet-300">
      <Link href={href}>{label}</Link>
    </button>
  );
}
