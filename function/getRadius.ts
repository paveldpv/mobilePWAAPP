
export const getRadius =(scale:number,width:number,corrector:number):number=>{
   if( scale > 0 && scale != 0){
      return width/corrector
   }else{
     return width / corrector - Math.abs(0.707*width/corrector*scale/ 1.5);
   }
}