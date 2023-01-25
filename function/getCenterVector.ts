export const getCenterVector = (relativeCoordinate:number,globalCoordinate:number,correct:number):number=>{

   return (Math.sqrt((relativeCoordinate-0+globalCoordinate)**2))/2+correct
}