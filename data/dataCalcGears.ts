export type TCalcGears = {
  label: String;
  units: String;
  mark: String;
  value?: Number;
  control:Boolean
  myref?:any

  // ref?: React.MutableRefObject<HTMLInputElement>;
  
};
export const dataCalcGears: TCalcGears[] = [
  { label: "Модуль зацепления", units: "ММ", mark: "M" ,control:true},
  { label: "Число зубьев колеса", units: "ШТ", mark: "Z" ,control:true},
  { label: "Угол наклона зубьев колеса", units: "Градусы", mark: "B",control:true },
  { label: "Коэффициент смещения исходного контура", units: "-", mark: "Х",control:true },
  { label: "Угол профиля нормального исходного контура", units: "Градусы", mark: "А" ,control:true},
//расчетные параметры
  { label: "Угол профиля", units: "Градусы", mark: "AT" ,control:false},
  { label: "Условное число зубьев колеса", units: "ШТ", mark: "ZK",control:false },
  { label: "Число зубьев в длине общей нормали", units: "ШТ", mark: "ZN",control:false },
  { label: "Длина общей нормали", units: "ММ", mark: "W" ,control:false},
];
