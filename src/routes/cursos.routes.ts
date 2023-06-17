import { Router } from "express"

const router = Router();
router.get('/cursos', (_req, res) => {
    res.send('Hello World! from cursos')
})

export default router;