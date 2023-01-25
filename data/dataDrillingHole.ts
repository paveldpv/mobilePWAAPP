import { TCalcGears } from "./dataCalcGears";

export const dataDrillingHole :TCalcGears[]=[
   {
      label:"Диаметр",
      units:"D",
      mark:"ММ",      
      defaultValue:200,
      control:true,

   },
   {
      label:"Кол-во точек",
      units:"N",
      mark:"ШТ",      
      defaultValue:4,
      control:true,

   },
   {
      label:"Начальный угол",
      units:"°",
      mark:"ГР-Ы",      
      defaultValue:0,
      control:true,

   }
]