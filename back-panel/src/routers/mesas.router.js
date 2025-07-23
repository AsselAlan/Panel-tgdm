import { Router } from "express";
import MesasServices from '../services/mesas.service.js'
import JugadoresService from "../services/jugadores.service.js";
import EventosService from "../services/eventos.service.js";
import UsersService from "../services/user.service.js";
import GruposService from "../services/grupos.service.js";
import { ObjectId } from 'mongodb'


const router = Router()
const mesasService = new MesasServices()
const jugadoresService = new JugadoresService()
const eventosService = new EventosService()
const usersService = new UsersService()
const grupoService = new GruposService() 

router.post('/', async (req, res) => {
    try {
      let {grupo, evento, jugadores, estado, creador} = req.body;

      let grupoId = await grupoService.getGrupoNombre(grupo)
      grupoId = grupoId[0]._id

      let jugadoresId = await Promise.all(
        jugadores.map(async (jugador) => {
          let id = await jugadoresService.getPlayerId(Number(jugador), grupoId);
          return id[0]._id;
        })
      );

      let creadorId = await usersService.getUser(creador)
      creadorId = creadorId[0]._id
      evento = await eventosService.getEvento(evento,grupoId)
      let eventoId = evento[0]._id
      
      if(jugadoresId.length < 2 || !eventoId || !creadorId){
        res.status(400).send({status: "error", message: `Faltan datos: ${error}`});
      }else{
        const mesa = await mesasService.crearMesa(grupoId, eventoId, jugadoresId, estado, creadorId);
        let mesaId = mesa._id

        let jugadoresInscriptos = await Promise.all(
            jugadoresId.map(async (juga) => {
                let jugador = await jugadoresService.putInscripcion(juga,evento[0].entrada,evento[0].puntos,mesaId);
                return jugador;
            })
        );
        res.send(jugadoresInscriptos)
      }
    } catch (error) {
      console.error(error);
      res.send({ mensaje: 'No se pudo crear la mesa' });
    }
  });

router.get("/on/:grupo", async (req, res)=>{
  try {
      let {grupo} = req.params
      let grupoid = await grupoService.getGrupoNombre(grupo)
      grupoid = grupoid[0]._id
      let mesas = await mesasService.getMesasEnJuego(grupoid)
      res.send(mesas)
  } catch (error) {
      return res.status(400).send({status: "error", message: `Error al consultar mesa: ${error}`});
  }
})

router.get("/off/:grupo", async (req, res)=>{
  try {
      let {grupo} = req.params
      let grupoid = await grupoService.getGrupoNombre(grupo)
      grupoid = grupoid[0]._id          
      let mesas = await mesasService.getMesasTerminadasDia(grupoid)
      res.send(mesas)
  } catch (error) {
      return res.status(400).send({status: "error", message: `Error al consultar mesa: ${error}`});
  }
})

router.get("/totales/off/:grupo", async (req, res)=>{
  try {
      let {grupo} = req.params
      let grupoid = await grupoService.getGrupoNombre(grupo)
      grupoid = grupoid[0]._id          
      let mesas = await mesasService.getMesasTerminadas(grupoid)
      res.send(mesas)
  } catch (error) {
      return res.status(400).send({status: "error", message: `Error al consultar mesa: ${error}`});
  }
})

router.put('/finalizarmesa', async (req, res) => {
  try {
    let { idJugador, premio, idMesa } = req.body;

    idMesa = new ObjectId(idMesa);
    idJugador = new ObjectId(idJugador);

    if (!idJugador || !premio || !idMesa) {
      return res.status(400).send({ status: "error", message: `Faltan datos: ${error}` });
    } else {
      let mesa = await mesasService.finalizarMesa(idMesa, idJugador);
      let saldo = await jugadoresService.putGanador(idJugador, premio);
      res.send({ saldo, mesa });
    }
  } catch (error) {
    return res.status(400).send({ status: "error", message: `Error al finalizar mesa: ${error}` });
  }
});



export default router