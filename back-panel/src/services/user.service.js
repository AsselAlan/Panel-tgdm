import { userModel } from '../models/users.model.js'
import moment from 'moment'

export default class UserService {
    
    constructor(){}

    getUsers = async () => {
        try {
            let users = await userModel.find().populate("grupo")
            return users    
        } catch (error) {
            return {status: "error", message: `oH a ocurrido un error: ${error}`}
        }
    }

    getUserLogin = async (nombre,password) => {
        try {
            let user = await userModel.find({name: nombre, password: password}).populate("grupo")
            return user
        } catch (error) {
            return {status: "error", message: `oH a ocurrido un error: ${error}`}
        }
    }

    getUser = async (nombre) => {
        try {
            let user = await userModel.find({name: nombre}).populate("grupo")
            return user
        } catch (error) {
            return {status: "error", message: `oH a ocurrido un error: ${error}`}
        }
    }

    postNewUser = async (name,password,telefono,rol,email,grupo) => {
        let fechaCreacion = moment().locale("es-mx").format("D-MM-YYYY")        
        
        let user = await userModel.create({name,password,telefono,rol,fechaCreacion,email,grupo});
        return user
    }

    postDeleteUser = async (rol,user) =>{
        let users;
        if(rol === "agente" && user[0].rol !== "agente"){
            users = await userModel.deleteOne({name: user[0].name})
            return users
        }
        else if(rol === "representante" && user[0].rol === "admin"){
            users = await userModel.deleteOne({name: user[0].name})
            return users
        }else{
            return {status: "error", message: `oH a ocurrido un error, usted no tiene permisos para para eliminar este usuario`}
        }

    }

    putAñadirGrupo = async (grupoId ,nombre) =>{
        let user = await userModel.find({name: nombre})
        if(user[0].rol === "representante"){
            let grupo = user[0].grupo
            grupo.push(grupoId)
            await userModel.updateOne({name: nombre}, {$set:{grupo}})
        }else{
            await userModel.updateOne({name: nombre}, {$set:{grupo: grupoId}})
        }
    }

    putEliminarGrupo = async (nombre, grupoId) =>{
        let user = await userModel.find({name: nombre})
        if(user[0].rol === "representante"){
            let grupo = user[0].grupo
            for (let i = 0; i < grupo.length; i++) {
                if (grupo[i].equals(grupoId)) {
                    grupo.splice(i, 1)
                    await userModel.updateOne({name: nombre}, {$set:{grupo}})
                    return
                }
              }
        }else{
            await userModel.updateOne({name: nombre}, {$set:{grupo: []}})
        }
    }
}