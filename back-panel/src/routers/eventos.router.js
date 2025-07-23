import { Router } from "express";
import EventosService from "../services/eventos.service.js";
import GruposService from "../services/grupos.service.js";


const router = Router()

const eventosService = new EventosService()
const grupoService = new GruposService()

router.post("/", async (req, res)=>{
    try {
        let {nombre, nombreGrupo, categoria, color, jugadores, entrada, premio, puntos, comicion, descripcion} = req.body
        if(nombreGrupo !== "todos"){
            let grupo = await grupoService.getGrupoNombre(nombreGrupo)
            grupo = grupo[0]._id
            let evento = await eventosService.postEvento(nombre,grupo,categoria,color,jugadores,entrada,premio,puntos,comicion,descripcion)
            res.send({evento})
        }
        else if(!nombre || !categoria|| !color|| !jugadores|| !entrada|| !premio|| !puntos|| !comicion) {
            res.status(400).send({status: "error", message: "El campo nombre existe"})}
        else{
            let evento = await eventosService.postEvento(nombre,nombreGrupo,categoria,color,jugadores,entrada,premio,puntos,comicion,descripcion)
            res.send({evento})
        }
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al crear eventos: ${error}`});
    }
})

router.delete('/', async (req, res) => {
    try {
      const { nombre } = req.body;
      const deletedEvento = await eventosService.deleteEvento(nombre);
      res.send({deletedEvento});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'No se pudo eliminar el evento' });
    }
  });
  

    router.get("/", async (req, res)=>{
        try {
            let eventos = await eventosService.getEventos()
            res.send(eventos)
        } catch (error) {
            console.log("Error al pedir las eventos: "+error);
            return res.status(400).send({status: "error", message: `Error al pedir eventos: ${error}`});
        }
    })

    router.get("/:grupo", async (req, res)=>{
        try {
            let {grupo} = req.params
            let grupoid = await grupoService.getGrupoNombre(grupo)
            grupoid = grupoid[0]._id
            let eventos = await eventosService.getEventogrupo(grupoid)
            res.send(eventos)
        } catch (error) {
            console.log("Error al pedir las eventos: "+error);
            return res.status(400).send({status: "error", message: `Error al pedir eventos: ${error}`});
        }
    })




// router.get("/", async (req, res)=>{
//     try {
//         let eventos = await eventosService.getEventos()
//         res.send(eventos)
//     } catch (error) {
//         console.log("Error al pedir las eventos: "+error);
//         return res.status(400).send({status: "error", message: `Error al pedir eventos: ${error}`});
//     }
// })

// router.delete("/", async (req, res)=>{
//     try {
//         let {nombre, categoria} = req.body
//         let mesa = await eventosService.deleteEvento(nombre,categoria);
//         res.send({mesa})
//     } catch (error) {
//         return res.status(400).send({status: "error", message: `Error al eliminar eventos: ${error}`});
//     }
// })

export default router