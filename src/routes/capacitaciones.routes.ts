import { Router } from "express";
import * as capacitacionesService from "../services/capacitacionServices";
import { CapacitacionesEntry } from "../types";
const router = Router();

router.get("/capacitaciones", async (req, res) => {
  try {
    const capacitaciones = await capacitacionesService.getCapacitaciones();
    res.status(200).json(capacitaciones);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/capacitaciones/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const capacitacion = await capacitacionesService.getCapacitacionById(id);
    if (!capacitacion) {
      return res.status(404).json({ error: "Capacitacion not found" });
    }
    res.status(200).json(capacitacion);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/capacitaciones", async (req, res) => {
  try {
    const { name, description, contents, duration }: CapacitacionesEntry = req.body;
    const capacitacion = await capacitacionesService.addCapacitaciones({ name, description, contents, duration });
    res.status(200).json(capacitacion);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/capacitaciones/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, contents, duration }: CapacitacionesEntry = req.body;
    const capacitacion = await capacitacionesService.updateCapacitacionById({ id, name, description, contents, duration });
    if (!capacitacion) {
      return res.status(404).json({ error: "Capacitacion not found" });
    }
    res.status(200).json(capacitacion);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/capacitaciones/:capacitacionId/:cursoId", async (req, res) => {
  try {
    const capacitacionId = parseInt(req.params.capacitacionId);
    const cursoId = parseInt(req.params.cursoId);
    const capacitacion = await capacitacionesService.addCursoToCapacitacion(capacitacionId, cursoId);
    if (!capacitacion) {
      return res.status(404).json({ error: "Capacitacion not found" });
    }
    res.status(200).json(capacitacion);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/capacitaciones/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const capacitacion = await capacitacionesService.deleteCapacitaciones(id);
    if (!capacitacion) {
      return res.status(404).json("Capacitacion not found");
    }
    res.status(200).json(capacitacion);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
