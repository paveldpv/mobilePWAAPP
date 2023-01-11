export type TCalcGears = {
  label: string;
  units: string;
  mark: string;
  value?: number;
  ref?: React.RefObject<HTMLInputElement>;
  
};
export const dataCalcGears: TCalcGears[] = [
  { label: "Модуль зацепления", units: "ММ", mark: "M" },
  { label: "Число зубьев колеса", units: "ШТ", mark: "Z" },
  { label: "Угол наклона зубьев колеса", units: "Градусы", mark: "B" },
  { label: "Коэффициент смещения исходного контура", units: "-", mark: "Х" },
  { label: "Угол профиля нормального исходного контура", units: "Градусы", mark: "А" },
//расчетные параметры
  { label: "Угол профиля", units: "Градусы", mark: "AT" },
  { label: "Условное число зубьев колеса", units: "ШТ", mark: "ZK" },
  { label: "Число зубьев в длине общей нормали", units: "ШТ", mark: "ZN" },
  { label: "Длина общей нормали", units: "ММ", mark: "W" },
];
