import { Router } from "express";
import JugadoresService from "../services/jugadores.service.js";
import GruposService from "../services/grupos.service.js";


const router = Router()


const grupoService = new GruposService() 
const jugadoresService = new JugadoresService()

router.post('/', async (req, res) => {
    try {
      const {nombre, usuario, password, telefono, nombreGrupo } = req.body;
      let grupo = await grupoService.getGrupoNombre(nombreGrupo)
      if(!grupo){
        res.status(400).send({status: "error", message: `El grupo no existe: ${error}`});
      }
      else if(!nombre ||  !password || !telefono || !usuario){
        res.send({ mensaje: 'No se pudo crear el jugador, inserte todos los campos' });
      }else{
        let grupoId = grupo[0]._id
        const jugador = await jugadoresService.crearJugador(nombre, usuario, password, telefono, grupoId);
        const addNewjugador = await grupoService.putAñadirJugador(jugador._id, grupo)
        res.send(jugador)
      }
    } catch (error) {
      console.error(error);
      res.send({ mensaje: 'No se pudo crear el jugador' });
    }
  });

router.put('/cargar',async(req,res)=>{  
      try {
        let {id, monto, nombreGrupo} = req.body
        let grupo = await grupoService.getGrupoNombre(nombreGrupo)
        id = Number(id)
        monto = Number(monto)
          if(!grupo){
            res.status(400).send({status: "error", message: `El grupo no existe: ${error}`});
          }
          if (isNaN(id) || isNaN(monto)) {
            throw new Error("Id y monto deben ser números válidos");
          }
          grupo = grupo[0]._id
          let cargar = await jugadoresService.putCargar(id,monto,grupo);
          if (!(cargar instanceof Error)) {
            res.send({ message: `Carga realizada a jugador ${id}` });
          } else {
            res.status(500).send({
              error: cargar.message,
              message: "No se pudo cargar saldo, vuelva a intentar.",
            });
          }
      } catch (Error) {
          console.error(Error);
          res.status(500).send({error: Error, message: "No se pudo cargar saldo vuelva a intentar."});
      }
})

router.put('/retirar',async(req,res)=>{  
    try {
      let {id, monto, nombreGrupo} = req.body
      let grupo = await grupoService.getGrupoNombre(nombreGrupo)
        if (isNaN(id) || isNaN(monto)) {
          throw new Error("Id y monto deben ser números válidos");
        }
        let retirar = await jugadoresService.putRetirar(id,monto,grupo);
        if (!(retirar instanceof Error)) {
          res.send({ message: `Retiro realizado a jugador ${id}` });
        } else {
          res.status(500).send({
            error: retirar.message,
            message: "No se pudo retirar saldo, vuelva a intentar.",
          });
        }
    } catch (Error) {
        console.error(Error);
        res.status(500).send({error: Error, message: "No se pudo cargar saldo vuelva a intentar."});
    }
})

router.get('/saldo/:id/:grupo',async(req,res)=>{
    try {
    let {id,grupo} = req.params
        let grupoid = await grupoService.getGrupoNombre(grupo)
        grupoid = grupoid[0]._id
        if (isNaN(id)) {
          throw new Error("Id debe ser número válido");
        }
        let result = await jugadoresService.getSaldo(id,grupoid)

        if(!(result instanceof Error)){
            res.send({result});
        }else{
            res.send({message:`El jugador ${id} no existe`})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se encontro el jugador."});
    }
})

router.get("/tabla", async (req, res)=>{
    try {
        let jugadores = await jugadoresService.getJugadoresTabla()
        res.send(jugadores)
    } catch (error) {
        console.log("No se pudo encontrar jugadores, error: "+error);
    }
})

router.put("/deletegrupo", async (req, res)=>{
  try {
      let {nombre} = req.body

      let deleteGrupo = await userService.putEliminarGrupo(nombre)
      res.send({deleteGrupo})
  } catch (error) {
      return res.status(400).send({status: "error", message: `Error al añadir grupo: ${error}`});
  }
})


export default router