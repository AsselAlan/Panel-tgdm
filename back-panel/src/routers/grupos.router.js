import { Router } from "express";
import GruposService from "../services/grupos.service.js";
import UserService from "../services/user.service.js";

const router = Router()

const gruposService = new GruposService()
const userService = new UserService()

router.get("/", async (req, res)=>{
    try {
        let grupos = await gruposService.getGrupos()
        res.send(grupos)
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al consultar grupos: ${error}`});
    }
})

router.post("/", async (req, res)=>{
    try {
        let {nombre} = req.body
        let grupo = await gruposService.postNewGrupo(nombre)
        res.send(grupo)
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al crear grupo: ${error}`});
    }
})

router.delete("/", async (req, res)=>{
    try {
        let {nombre} = req.body
        let grupo = await gruposService.deleteGrupo(nombre);
        res.send({grupo})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al borrar grupo: ${error}`});
    }
})

router.put("/nuevoadmin", async (req, res)=>{
    try {
        let {nombreAdmin, nombreGrupo} = req.body

        let grupo = await gruposService.getGrupoNombre(nombreGrupo)
        let adminId = await userService.getUser(nombreAdmin)
        adminId = adminId[0]._id


        let newAdmin = await gruposService.putAñadirAdmin(adminId, grupo)
        res.send({newAdmin})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al añadir admin: ${error}`});
    }
})

router.put("/eliminaradmin", async (req, res)=>{
    try {
        let {nombreAdmin, nombreGrupo} = req.body

        let grupo = await gruposService.getGrupoNombre(nombreGrupo)
        let adminId = await userService.getUser(nombreAdmin)
        adminId = adminId[0]._id


        let newAdmin = await gruposService.putEliminarAdmin(adminId, grupo)
        res.send({newAdmin})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al eliminar admin: ${error}`});
    }
})

router.put("/nuevorepre", async (req, res)=>{
    try {
        let {nombreRepre, nombreGrupo} = req.body

        let grupo = await gruposService.getGrupoNombre(nombreGrupo)
        let repreId = await userService.getUser(nombreRepre)
        repreId = repreId[0]._id


        let newRepre = await gruposService.putAñadirRepre(repreId, grupo)
        res.send({newRepre})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al añadir reprecentante: ${error}`});
    }
})

router.put("/eliminarrepre", async (req, res)=>{
    try {
        let {nombreRepre, nombreGrupo} = req.body

        let grupo = await gruposService.getGrupoNombre(nombreGrupo)
        let repreId = await userService.getUser(nombreRepre)
        repreId = repreId[0]._id


        let newRepre = await gruposService.putEliminarRepre(repreId, grupo)
        res.send({newRepre})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al eliminar admin: ${error}`});
    }
})

export default router