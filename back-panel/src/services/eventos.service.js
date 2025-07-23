import { eventosModel } from "../models/eventos.model.js";
import moment from 'moment'


export default class eventosService {

    postEvento = async (nombre, grupo, categoria, color, jugadores, entrada, premio, puntos, comicion, descripcion) => {
        try {
            if(grupo !== "todos"){
                const nuevoEvento = await eventosModel.create({nombre, grupo, categoria, color, jugadores, entrada, premio, puntos, comicion, descripcion});
                return nuevoEvento;
            }
            else {const nuevoEvento = await eventosModel.create({nombre, categoria, color, jugadores, entrada, premio, puntos, comicion, descripcion});
                return nuevoEvento
            }
          
        } catch (error) {
          console.error(error);
          throw new Error("No se pudo crear el evento");
        }
    };

    deleteEvento = async (nombre) => {
        try {  
          const deletedEvento = await eventosModel.findOneAndDelete({ nombre });
          return deletedEvento;
        } catch (error) {
          console.error(error);
          throw new Error("No se pudo eliminar el evento");
        }
      };

      getEventos = async () => {
        try {
            let eventos = await eventosModel.find().populate("grupo")
            return eventos    
        } catch (error) {
            return res.status(400).send({status: "error", message: `oH a ocurrido un error: ${error}`});
        }
    }

      getEvento = async (nombre,grupo) => {
        try {
            let eventos = await eventosModel.find({nombre: nombre, grupo: grupo})
            return eventos    
        } catch (error) {
            return res.status(400).send({status: "error", message: `oH a ocurrido un error: ${error}`});
        }
    }

      getEventogrupo = async (grupo) => {
        try {
            let evento = await eventosModel.find({grupo: grupo}).populate("grupo")
            return evento  
        } catch (error) {
            return res.status(400).send({status: "error", message: `oH a ocurrido un error: ${error}`});
        }
    }

    
}