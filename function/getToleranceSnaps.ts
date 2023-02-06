export const getToleranceSnaps =(quality:number,id:number):number[]=>{
   let result:number[]=[]
   for (let i = 0; i < 360; i+=quality) {
      result.push(i)
   }
  
   
   return result
}

