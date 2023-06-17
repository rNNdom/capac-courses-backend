import { PrismaClient } from '@prisma/client'
import { CursosEntry } from '../types'


const prisma = new PrismaClient()

export const getCursos = async () => { 
    const cursos = await prisma.curso.findMany()
    return cursos

}
export const getCursoById = async (id : number ) => {
    const curso = await prisma.curso.findUnique({
        where: {
            id: id
        },
    
    })
    return curso
}
export const addCurso = async (inputData: CursosEntry) => {
    const { name, contents, duration } = inputData;
  
    const curso = await prisma.curso.create({
      data: {
        name: name,
        contents: contents,
        duration: duration,
      },
    });
    return curso;
  };

export const deleteCurso = async (id:number) => { 
    const curso = await prisma.curso.delete(
        {
            where: {
                id: id
            }
        }
    )
    return curso

 }
 export const updateCursoById = async (inputData: CursosEntry) => {
    const { id, ...updateData } = inputData;
  
    const curso = await prisma.capacitacion.update({
      where: {
        id: id,
      },
      data: updateData,
    });
  
    return curso;
  };