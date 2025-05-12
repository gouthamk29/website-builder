import { prisma } from "./prismaClient";


export async function fetchComponents(){
     const data = await prisma.component.findMany();
     return data;
}

// export async function UpdateComponents(component){
//      try{
//           const data = await prisma.component.insert(component);
//           return data;
//      }
//      catch(error){
//           console.log(error)
     
// }