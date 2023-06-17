import { Prisma, PrismaClient } from '@prisma/client'
import { CapacitacionesEntry } from '../types'
const prisma = new PrismaClient()


export const getCapacitaciones = async () => {
    const capacitaciones = await prisma.capacitacion.findMany({
        include: {
            cursos: true
        }
    })
    return capacitaciones

}
export const getCapacitacionById = async (id: number) => {
    const capacitacion = await prisma.capacitacion.findUnique({
        where: {
            id: id
        },
        include: {
            cursos: true
        }
    })
    return capacitacion
}
export const addCapacitaciones = async (inputData: CapacitacionesEntry) => {
    const { name, description, contents, duration } = inputData;

    try {
        const addCapacitacion = await prisma.capacitacion.create({
            data: {
                name: name,
                description: description,
                contents: contents,
                duration: duration,
            },
        });
        return addCapacitacion
    } catch (e) {
        if (e instanceof Prisma.PrismaClientValidationError) {
            return " No se pudo crear la capacitacion debido a que faltan datos requeridos."
        }
    }
};

export const deleteCapacitaciones = async (id: number) => {
    const deleteCapacitacion = await prisma.capacitacion.delete(
        {
            where: {
                id: id
            }
        }
    )

    return deleteCapacitacion

}
export const updateCapacitacionById = async (inputData: CapacitacionesEntry) => {
    const { id, ...updateData } = inputData;

    const updateCapacitacion = await prisma.capacitacion.update({
        where: {
            id: id,
        },
        data: updateData,
    });

    return updateCapacitacion;
};

export const addCursoToCapacitacion = async (capacitacionId: number, cursoId: number) => {
    const capacitacion = await prisma.capacitacion.findUnique({
        where: {
            id: capacitacionId
        }
    })
    const curso = await prisma.capacitacion.findUnique({
        where: {
            id: cursoId
        }
    })
    if (capacitacion && curso) {
        const updatedCapacitacion = await prisma.capacitacion.update({
            where: {
                id: capacitacionId
            },
            data: {
                cursos: {
                    connect: {
                        id: cursoId
                    }
                }
            }
        })
        return updatedCapacitacion
    }
    return null
}