import { Router } from "express";
import * as cursosServices from "../services/cursosServices";
import { CursosEntry } from "../types";
const router = Router();

router.get("/cursos", async (req, res) => {
  try {
    const cursos = await cursosServices.getCursos();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cursos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const curso = await cursosServices.getCursoById(id);
    if (!curso) {
      return res.status(404).json({ error: "Curso not found" });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/cursos", async (req, res) => {
  try {
    const { name, contents, duration }: CursosEntry = req.body;
    const curso = await cursosServices.addCurso({ name, contents, duration });
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/cursos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const curso = await cursosServices.deleteCurso(id);
    if (!curso) {
      return res.status(404).json("Capacitacion not found");
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
