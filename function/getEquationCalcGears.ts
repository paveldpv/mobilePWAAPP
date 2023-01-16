export const getCornerProfile = (
  cornerRef: Number,
  cornerInitialRef: Number
): string => {
  return `atan(tan(${cornerInitialRef}/180*pi)/cos(${cornerRef}/180*pi))/pi*180`;
  //=ATAN(TAN(D7/180*PI())/COS(D5/180*PI()))/PI()*180
};

export const getAmountTeeth = (
  // moduleRef: Number, //D3
  amountTeethRef: Number, //D4
  cornerRef: Number, //D5
  // KGearsRef: Number, //D6
  cornerInitialRef: Number //D7
): string => {
  let t = getCornerProfile(cornerRef, cornerInitialRef);
  return `${amountTeethRef}*(tan(${t}/180*pi)-${t}/180*pi)/(tan(${cornerInitialRef}/180*pi)-${cornerInitialRef}/180*pi)`;
  //=D4*(TAN(D9/180*PI())-D9/180*PI())/(TAN(D7/180*PI())-D7/180*PI())
};

export const getCommonNormal = (
  // moduleRef: Number,
  amountTeethRef: Number,
  cornerRef: Number,
  KGearsRef: Number,
  cornerInitialRef: Number
): string => {
  let t = getAmountTeeth(amountTeethRef, cornerRef, cornerInitialRef);
  return `0.5+${t}*acos(${t}*cos(${cornerInitialRef}/180*pi)/(${t}+2*${KGearsRef}))/pi`;
  //=ROUND(0,5+D10*ACOS(D10*COS(D7/180*PI())/(D10+2*D6))/PI();0)
};

// moduleRef: Number, //D3
//   amountTeethRef: Number, //D4
//   cornerRef: Number, //D5
//   KGearsRef: Number, //D6
//   cornerInitialRef: Number //D7

export const getLengthCommonNormal = (
  moduleRef: Number,
  amountTeethRef: Number,
  cornerRef: Number,
  KGearsRef: Number,
  cornerInitialRef: Number
): string => {
  let zk = getCommonNormal(
    amountTeethRef,
    cornerRef,
    KGearsRef,
    cornerInitialRef
  );
  let zn = getAmountTeeth(amountTeethRef, cornerRef, cornerInitialRef);
 return `${moduleRef}*((pi*(${zn})-pi/2+(tag())))`
  // return `(${moduleRef})*((pi*(${d})-pi/2+(tan((${cornerInitialRef})/180*pi))-(${cornerInitialRef})/180*pi))*floor(${t})*cos((${cornerInitialRef})/180*pi)+0.014*(((${t})-floor(${t}))+0.684*(${KGearsRef}))`;
  //!W=m*((π*zn-π/2+(tg (a) -a)*zk’)*cos (a)+0.014*(zk-zk’)+0.684*x)
  //=D3*((PI()*D11-PI()/2+(TAN(D7/180*PI())-D7/180*PI())*FLOOR(D10;1;1))*COS(D7/180*PI())+0,014*(D10-FLOOR(D10;1;1))+0,684*D6)
};
