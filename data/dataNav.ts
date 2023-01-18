export type TNav = {
  label: string;
  href: string;
  handler?:()=>void
  params?:any
};

export const dataNav: TNav[] = [
  {
    label: `Расчет зубчатых колес`,
    href: `/calc/Gears`,
  },
  {
    label: `Расчет сверления крепежа фланцев`,
    href: `/calc/DrillingHole`,
  },
  {
    label: `Расчет сверления радиусных пазов `,
    href: `/calc/DrillingGrove`,
  },
];
