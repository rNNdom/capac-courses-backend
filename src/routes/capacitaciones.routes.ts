import { Router } from "express"
import * as capacitacionesService from '../services/capacitacionServices'
const router = Router();

router.get('/capacitaciones', async (req, res) => {
    const capacitaciones = await capacitacionesService.getCapacitaciones()
    res.send(capacitaciones)
})

router.get('/capacitaciones/:id',async (req, res) => {
    const id = parseInt(req.params.id)
    const capacitacion = await capacitacionesService.getCapacitacionById(id)
    res.send(capacitacion)
})



router.post('/capacitaciones', async (req, res) => {
    const { name, description, contents, duration } = req.body
    const capacitacion = await capacitacionesService.addCapacitaciones({ name, description, contents, duration })
    res.send(capacitacion)
})

router.delete('/capacitaciones/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const capacitacion = await capacitacionesService.deleteCapacitaciones(id)
    if (!capacitacion) res.status(404).send('Capacitacion not found')
    res.send(capacitacion)
})




export default router;