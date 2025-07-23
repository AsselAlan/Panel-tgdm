import React, { useEffect, useState } from 'react'

import Cookies from 'universal-cookie'
import { Container, Spinner } from 'react-bootstrap'

import api from '../../routes/api.js'
import JugadoresTabla from './_jugadoresTabla.jsx'

import './jugadores.css'
import NewJugador from './_newJugador.jsx'
import NewCarga from './_newCarga.jsx'
import NewRetiro from './_newRetiro.jsx'

const cookies = new Cookies()


const Jugadores = () => {
  
  let user = cookies.get("user");

  const [dataJugadores,setDataJugadores]=useState([])
  const [dataGrupos,setDataGrupos]=useState([])
  const [usuario,setUsuario]=useState()
  const [pending,setPending]=useState(true)

  useEffect(() => {
    setPending(true);
  
    Promise.all([
      api.get("/api/users").then((response) => response.data),
      api.get("/api/jugadores/tabla").then((response) => response.data),
      api.get("/api/grupos").then((response) => response.data)
    ])
      .then(([users, jugadores, grupos]) => {
        const foundUser = users.find((elem) => elem.name === user.name);
        if (foundUser) {
          setUsuario(foundUser);
        }
        let jugadoresTabla = [];
        if (user.rol === "admin") {
          jugadoresTabla = jugadores.filter(
            (juga) => juga.grupo[0].nombre === user.grupo[0].nombre
          );
        } else if (user.rol === "representante") {
          user.grupo.forEach((grupo) => {
            jugadoresTabla = jugadores.filter(
              (juga) => juga.grupo[0].nombre === grupo.nombre
            );
          });
        } else {
          jugadoresTabla = jugadores;
        }
        setDataJugadores(jugadoresTabla);
        setDataGrupos(grupos);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);
  

    if(pending){
      return(<Container className='min-vh-100 w-100 d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
    }else{
      return (
        <>
          <div className='Container m-3'>
              <nav className="navvertical mt-4">
                <ul>
                  <li>
                      <NewJugador jugadores={dataJugadores} user={usuario} grupos={dataGrupos} />
                      <hr />
                  </li>
                  <li>
                      <NewCarga jugadores={dataJugadores} user={usuario} grupos={dataGrupos}/>                   
                      <hr />
                  </li>
                  <li>
                      <NewRetiro jugadores={dataJugadores} user={usuario} grupos={dataGrupos}/>                     
                      {/* <hr /> */}
                  </li>
                  {/* <li>
                      <a href=""></a>
                      <hr />
                  </li>
                  <li>
                      <a href=""></a>
                  </li> */}
                </ul>
              </nav>
              <div className='w-100 pt-5'>
                <JugadoresTabla jugadores={dataJugadores} user={usuario} grupos={dataGrupos} />
              </div>
          </div>
        </>
  )}
}

export default Jugadores