import express from 'express'
import cors from 'cors'
import cursosRouter from './routes/cursos.routes'
import capacitacionesRouter from './routes/capacitaciones.routes'

const app = express()
app.use(express.json())
const PORT = 3000

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3001',
}));


app.use('/api', cursosRouter)
app.use('/api', capacitacionesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
