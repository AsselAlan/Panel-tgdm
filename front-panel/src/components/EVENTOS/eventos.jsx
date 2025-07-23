import React, { useEffect, useState } from 'react'
import api from '../../routes/api.js'

import Cookies from 'universal-cookie'

import { Container, Spinner } from 'react-bootstrap'

import EventosTabla from './_tablaEventos.jsx'
import NewEvento from './_newEvento.jsx'
import './eventos.css'

const cookies = new Cookies()

const Eventos = () => {

     
  let user = cookies.get("user");

  const [dataEventos,setDataJugadores]=useState([])
  const [dataGrupos,setDataGrupos]=useState([])
  const [usuario,setUsuario]=useState()
  const [pending,setPending]=useState(true)

  useEffect(() => {
    setPending(true);
  
    Promise.all([
      api.get("/api/users").then((response) => response.data),
      api.get("/api/eventos").then((response) => response.data),
      api.get("/api/grupos").then((response) => response.data)
    ])
      .then(([users, eventos , grupos]) => {
        const foundUser = users.find((elem) => elem.name === user.name);
        if (foundUser) {
          setUsuario(foundUser);
        }
        if (eventos) {
            setDataJugadores(eventos);
        }
        if (grupos) {
          setDataGrupos(grupos);
        }
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
            <nav className="navvertical mt-4 p-2">
              <ul>
                <li>
                </li>
                    <NewEvento  eventos={dataEventos} user={usuario} grupos={dataGrupos} />
              </ul>
            </nav>
            <div className='w-100 pt-5'>
              <EventosTabla eventos={dataEventos} user={usuario} grupos={dataGrupos} />
            </div>
        </div>
      </>
)}
}

export default Eventos