import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'


import NavegationBar from '../components/NAVBAR/navBar'
import  {Login}  from '../components/LOGIN/login'
import  {Home}  from '../components/HOME/home'
import  Grupo  from '../components/GRUPOS/grupo'
import  Usuarios  from '../components/USUARIOS/usuarios'
import Jugadores from '../components/JUGADORES/jugadores'
import Eventos from '../components/EVENTOS/eventos'
import { MesasEnJuego } from '../components/MESAS/mesasEnJuego'
import { Mesasfinalizadas } from '../components/MESAS/mesasTerminadas'
import MesasTotalesTerminadas from '../components/MESAS/_mesasTotalesTerminadas'
import { balance } from '../components/BALANCE/balance'



function RoutesApp() {

  return (
    <div>
        <NavegationBar />
        <Login />
        <BrowserRouter>
          <Routes>
              <Route path='/home' Component={Home} />
              <Route path='/grupos' Component={Grupo} />
              <Route path='/usuarios' Component={Usuarios} />
              <Route path='/jugadores' Component={Jugadores} />
              <Route path='/eventos' Component={Eventos} />
              <Route path='/mesas' Component={MesasEnJuego} />
              <Route path='/mesasfinalizadas' Component={Mesasfinalizadas} />
              <Route path='/filtrarmesas' Component={MesasTotalesTerminadas} />
              <Route path='/balance' Component={balance} />
          </Routes>       
        </BrowserRouter>
      </div>
    )
}

export default RoutesApp
