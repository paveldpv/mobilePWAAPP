 export const variantLeftOpacity = {
   visible: (i: Number) => ({
     x: 0,
     transition: {
       delay: Number(i)*0.1+0.5 ,
     },
   }),
   hidden: {
     x: -1000,
   },
 };