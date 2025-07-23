import { gruposModel } from '../models/grupos.model.js'
import moment from 'moment'

export default class GruposService {
    
    constructor(){}

    getGrupos = async () => {
        try {
            let grupos = await gruposModel.find().populate("representante").populate("admins").populate("jugadores")
            return grupos    
        } catch (error) {
            return res.status(400).send({status: "error", message: `oH a ocurrido un error: ${error}`});
        }
    }

    getGrupoNombre = async (nombre) => {
        try {
            let grupo = await gruposModel.find({nombre: nombre})
            return grupo
        } catch (error) {
            return res.status(400).send({status: "error", message: `oH a ocurrido un error: ${error}`});
        }
    }

    postNewGrupo = async (nombre) => {
        let fechaCreacion = moment().locale("es-mx").format("D-MM-YYYY")

        if(!nombre) return res.status(400).send({status: "error", message: "El campo nombre existe"})
        
        let grupo = await gruposModel.create({nombre,fechaCreacion});
        return grupo
    }

    deleteGrupo = async (nombre) =>{
        try {
            let grupo = await gruposModel.deleteOne({nombre: nombre});
            return ({grupo})
        } catch (error) {
            return {status: "error", message: `oH a ocurrido un error: ${error}`}
        }
    }

    putAñadirAdmin = async (adminId ,grupo) =>{
        let admins = grupo[0].admins
        admins.push(adminId)
        let nombre = grupo[0].nombre

        await gruposModel.updateOne({nombre: nombre}, {$set:{admins: admins}})
    }

    
    putEliminarAdmin = async (adminId ,grupo) =>{
        let admins = grupo[0].admins      
        
        const index = admins.findIndex(objeto => objeto === adminId);
        admins.splice(index, 1);
        let nombre = grupo[0].nombre
        
        await gruposModel.updateOne({nombre: nombre}, {$set:{admins: admins}})
    }

    putAñadirJugador = async (jugadorId ,grupo) =>{
        let jugadores = grupo[0].jugadores
        jugadores.push(jugadorId)
        let nombre = grupo[0].nombre

        await gruposModel.updateOne({nombre: nombre}, {$set:{jugadores: jugadores}})
    }

    
    putEliminarJugador = async (jugadorId ,grupo) =>{
        let jugadores = grupo[0].jugadores
        
        const index = jugadores.findIndex(objeto => objeto === jugadorId);
        admins.splice(index, 1);
        let nombre = grupo[0].nombre
        
        await gruposModel.updateOne({nombre: nombre}, {$set:{jugadores: jugadores}})
    }

    putAñadirRepre = async (repreId ,grupo) =>{
        let repres = grupo[0].representante
        repres.push(repreId)
        let nombre = grupo[0].nombre

        await gruposModel.updateOne({nombre: nombre}, {$set:{representante: repres}})
    }

    putEliminarRepre = async (repreId ,grupo) =>{
        let repres = grupo[0].representante     
        
        const index = repres.findIndex(objeto => objeto === repreId);
        repres.splice(index, 1);
        let nombre = grupo[0].nombre
        
        await gruposModel.updateOne({nombre: nombre}, {$set:{representante: repres}})
    }

}