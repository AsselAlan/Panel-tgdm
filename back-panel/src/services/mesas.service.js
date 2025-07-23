import { mesasModel } from "../models/mesas.model.js";
import moment from 'moment'
import { ObjectId } from "mongoose";


export default class JugadoresService {
    
    constructor(){}


    getMesasTerminadasDia = async (grupo) =>{
        let day = moment().locale("es-mx").format("D-MM-YYYY")
        let mesas = await mesasModel.find({estado: false, day: day, grupo: grupo}).populate("evento").populate("jugadores").populate("ganador").populate("creador")
        return mesas
    };

    getMesasTerminadas = async (grupo) =>{
        let mesas = await mesasModel.find({estado: false, grupo: grupo}).populate("evento").populate("jugadores").populate("ganador").populate("creador")
        return mesas
    };

    getMesasEnJuego = async (grupo) =>{
        let mesas = await mesasModel.find({estado: true, grupo: grupo}).populate("evento").populate("jugadores").populate("creador")
        return mesas
    };

    crearMesa = async (grupo, evento, jugadores, estado, creador) => {
        try {
            let day = moment().locale("es-mx").format("D-MM-YYYY")
            let time = moment().locale("es-mx").format('LTS')

          const nuevaMesa = await mesasModel.create({grupo, evento, jugadores, estado, creador, day, time});
          return nuevaMesa;
          
        } catch (error) {
          console.error(error);
          throw new Error("No se pudo crear el jugador");
        }
    };
    
    finalizarMesa = async (idMesa, jugadorId) => {
        try {
        const mesa = await mesasModel.findOne({ _id: idMesa });
        
        if (!mesa) {
            throw new Error('La mesa no existe en la base de datos');
        }
        else{
            const result = await mesasModel.updateOne(
                { _id: idMesa },
                {
                    $set: {
                        ganador: jugadorId
                    },
                    $set: {
                        estado: false
                    },
                }
            );
            return result;
        }
        } catch (error) {
            throw new Error('No se pudo finalizar la mesa');
        }
    };

}