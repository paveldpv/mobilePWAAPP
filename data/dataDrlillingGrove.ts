import { TCalcGears } from "./dataCalcGears";

export const dataDrillingGrove: TCalcGears[] = [
  {
    label: `Радиус паза`,
    units: `ММ`,
    mark: `R`,
    control: true,
    defaultValue: 130,
  },
  {
    label: `угол сектора`,
    units: `Градусы`,
    mark: `°`,
    control: true,
    defaultValue: 22,
  },
  {
    label: `угол отклонения от оси`,
    units: `Градусы`,
    mark: `°`,
    control: true,
    defaultValue: 55,
  },
  {
    label: `ном.диаметр паза`,
    units: `ММ`,
    mark: `D`,
    control: true,
    defaultValue: 30,
  },
];
