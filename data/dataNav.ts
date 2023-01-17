export type TNav = {
  label: string;
  href: string;
  handlerClose?:React.Dispatch<React.SetStateAction<Boolean>>
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
