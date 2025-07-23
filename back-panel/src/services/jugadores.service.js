import { jugadoresModel } from "../models/jugadores.models.js";
import moment from 'moment'
import { ObjectId } from "mongoose";


export default class JugadoresService {


  crearJugador = async (nombre, usuario, password, telefono, grupo) => {
      try {
          let ingreso = moment().locale("es-mx").format("D-MM-YYYY")
          const ultJugador = await jugadoresModel.findOne({grupo}).sort({ $natural: -1 });
          let id 
          if (ultJugador) {               
            id = ultJugador.id + 1 
          }else{
              id = 1
          }
  
        const nuevoJugador = await jugadoresModel.create({id,nombre,usuario,password,telefono,ingreso,grupo});
        return nuevoJugador;
        
      } catch (error) {
        console.error(error);
        throw new Error("No se pudo crear el jugador");
      }
  };
    
  putCargar = async (id, monto, grupo) => {
    try {
      let fecha = moment().locale("es-mx").format("D-MM-YYYY")
      let jugador = await jugadoresModel.findOne({ id: id, grupo: grupo });
      if (!jugador) {
        return new Error("Jugador no encontrado");
      }

      let cargas = jugador.movimientos.cargas;
      let saldo = jugador.saldo;
      let newCarga = {
        monto: monto,
        fecha: fecha
      }
      cargas.push(newCarga);
      saldo = saldo + monto
      const result = await jugadoresModel.findOneAndUpdate(
        { id: id, grupo: grupo },
        { $set: { saldo: saldo },
          $push: { "movimientos.cargas": { monto, fecha } }
        },
        );
      if (!result) {
        return new Error("Jugador no encontrado");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error al cargar monto");
    }
  }

  putRetirar = async (id, monto, grupo) => {
    try {
      let fecha = moment().locale("es-mx").format("D-MM-YYYY")
      let jugador = await jugadoresModel.findOne({ id: id, grupo: grupo });
      let retiros = jugador.movimientos.retiros;
      let saldo = jugador.saldo;
      if (!jugador) {
        return new Error("Jugador no encontrado");
      }
      let newRetiros = {
        monto: monto,
        fecha: fecha
      }
      saldo = saldo - monto
      retiros.push(newRetiros);
      const result = await jugadoresModel.findOneAndUpdate(
        { id: id, grupo: grupo },
        { $set: { saldo: saldo },
          $push: { "movimientos.retiros": { monto, fecha } } 
        },
      );
      if (!result) {
        return new Error("Jugador no encontrado");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error al retirar monto");
    }

  }

  getSaldo = async (id,grupo) => {
    const jugador = await jugadoresModel.findOne({ id: id, grupo: grupo });
    let saldo = jugador.saldo 
    let nombre = jugador.nombre
  
    return {saldo,nombre};
  }

  getPuntos = async (id,grupo) =>{
    let puntos = await jugadoresModel.find({ id: id, grupo: grupo })
    puntos = puntos.puntos 
    return puntos
  }

  getJugadoresTabla = async () => {
    const jugadores = await jugadoresModel.find().populate("grupo");
    
    return jugadores;
  }

  getPlayerId = async (id,grupo) => {
      let jugador = await jugadoresModel.find({ id: id, grupo: grupo })
      return jugador
  }

  putInscripcion = async (id, entrada, newPuntos, mesaId) => {
    try {
      // Verificar si el jugador existe
      const jugador = await jugadoresModel.findOne({ _id: id });
  
      if (!jugador) {
        throw new Error('El jugador no existe en la base de datos');
      }
  
      const puntos = jugador.puntos;
      const saldo = jugador.saldo - entrada;
  
      const partidas = jugador.partidas;
      partidas.push(mesaId);
  
      if (saldo >= 0) {
        // Actualizar todos los campos en un solo objeto
        const result = await jugadoresModel.updateOne(
          { _id: id },
          {
            $set: {
              puntos: puntos + newPuntos,
              saldo: saldo,
              partidas: partidas,
            },
          }
        );
        return result;
      } else {
        throw new Error('El jugador no tiene suficiente saldo para la inscripción');
      }
    } catch (error) {
      // Manejar los errores y devolver mensajes claros
      console.error(error);
      throw new Error('No se pudo realizar la inscripción en la mesa');
    }
  }

  putGanador = async (id, premio) => {
    try {
      // Verificar si el jugador existe
      const jugador = await jugadoresModel.findOne({ _id: id });
  
      if (!jugador) {
        throw new Error('El jugador no existe en la base de datos');
      }
  
      const saldo = jugador.saldo + premio;
  
        // Actualizar todos los campos en un solo objeto
        const result = await jugadoresModel.updateOne(
          { _id: id },
          {
            $set: {
              saldo: saldo,
            },
          }
        );
        return saldo;
      
    } catch (error) {
      // Manejar los errores y devolver mensajes claros
      console.error(error);
      throw new Error('No se pudo realizar la inscripción en la mesa');
    }
  }
    
  putEliminarGrupo = async (nombre) =>{
      await jugadoresModel.updateOne({name: nombre}, {$set:{grupo: []}})
  }

}