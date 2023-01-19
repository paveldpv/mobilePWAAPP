import { MutableRefObject } from "react";

export type TCalcGears = {
  label: String;
  units: String;
  mark: String;
  value?: Number;
  control: Boolean;
  defaultValue?: Number;  
  myref?: MutableRefObject<HTMLInputElement >|null;
  ref?:MutableRefObject<HTMLInputElement >|null;
};
export const dataCalcGears: TCalcGears[] = [
  {
    label: "Модуль зацепления",
    units: "ММ",
    mark: "M",
    control: true,
    defaultValue: 2,
  },
  {
    label: "Число зубьев колеса",
    units: "ШТ",
    mark: "Z",
    control: true,
    defaultValue: 32,
  },
  {
    label: "Угол наклона зубьев колеса",
    units: "Градусы",
    mark: "B",
    control: true,
    defaultValue: 0,
  },
  {
    label: "Коэффициент смещения исходного контура",
    units: "-",
    mark: "Х",
    control: true,
    defaultValue: 0,
  },
  {
    label: "Угол профиля нормального исходного контура",
    units: "Градусы",
    mark: "А",
    control: true,
    defaultValue: 20,
  },
  //расчетные параметры
  { label: "Угол профиля", units: "Градусы", mark: "AT", control: false },
  {
    label: "Условное число зубьев колеса",
    units: "ШТ",
    mark: "ZK",
    control: false,
  },
  {
    label: "Число зубьев в длине общей нормали",
    units: "ШТ",
    mark: "ZN",
    control: false,
  },
  { label: "Длина общей нормали", units: "ММ", mark: "W", control: false },
];
