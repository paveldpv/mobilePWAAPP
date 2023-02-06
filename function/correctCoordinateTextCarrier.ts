export const correctCoordinateTextCarrier = (carrier:number,radius:number):number=>{
   switch (true) {
      case carrier>35:
         return -radius*4-18
      case carrier<35:
      return (-radius*4-18)-Math.atan(carrier*Math.PI/180)*50
   
      default:
         return -radius*4-18
         break;
   }

}