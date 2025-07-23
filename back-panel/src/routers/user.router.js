import { Router } from "express";
import UserService from "../services/user.service.js";
import GruposService from "../services/grupos.service.js";

const router = Router()

const userService = new UserService() 
const grupoService = new GruposService() 

router.get("/", async (req, res)=>{
    try {
        let users = await userService.getUsers()
        res.send(users)
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al consultar users: ${error}`});
    }
})

router.get("/user", async (req, res)=>{
    try {
        let name = req.query.name;

        let user = await userService.getUser(name)
        res.send(user)
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al consultar user: ${error}`});
    }
})

router.get("/userlogin", async (req, res)=>{
    try {
        let name = req.query.name;
        let password = req.query.password;

        let user = await userService.getUserLogin(name,password)
        res.send(user)
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al consultar user: ${error}`});
    }
})

router.post("/", async (req, res)=>{
    try {
        let {name,password,telefono,rol,email} = req.body
        if(!name||!password||!telefono||!rol || !email) res.send({status: "error", message: "El campo existe"})
        let user
        user = await userService.postNewUser(name,password,telefono,rol,email);
        res.send({user})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al crear user: ${error}`});
    }
})

router.delete("/", async (req, res)=>{
    try {
        let {rol,nombreUser} = req.body
        let user = await userService.getUser(nombreUser);
        
        let users = await userService.postDeleteUser(rol,user)
        res.send({users})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al eliminar user: ${error}`});
    }
})

router.put("/addgrupo", async (req, res)=>{
    try {
        let {nombre, nombreGrupo} = req.body

        let grupoId = await grupoService.getGrupoNombre(nombreGrupo)

        grupoId = grupoId[0]._id

        let addGrupo = await userService.putAñadirGrupo(grupoId, nombre)
        res.send({addGrupo})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al añadir grupo: ${error}`});
    }
})

router.put("/deletegrupo", async (req, res)=>{
    try {
        let {nombre, nombreGrupo} = req.body
        let grupoId = await grupoService.getGrupoNombre(nombreGrupo)
        grupoId = grupoId[0]._id
        let deleteGrupo = await userService.putEliminarGrupo(nombre, grupoId)
        res.send({deleteGrupo})
    } catch (error) {
        return res.status(400).send({status: "error", message: `Error al añadir grupo: ${error}`});
    }
})

export default router