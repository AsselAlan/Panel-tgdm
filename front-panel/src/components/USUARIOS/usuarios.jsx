import React, { useEffect, useState } from 'react'
import TablaUsuarios from './_usuariosTabla'

import { Container, Spinner } from 'react-bootstrap'

import api from '../../routes/api.js'
import Cookies from 'universal-cookie'

import './usuarios.css'
import NewUsuario from './_newUsuario'

const cookies = new Cookies()

const Grupo = () => {

  let user = cookies.get("user");

  const [dataUsers,setDataUsers]=useState([])
  const [pending,setPending]=useState(true)
  const [usuario,setUsuario]=useState()


  useEffect(() => {
    setPending(true);
  
    api.get("/api/users")
      .then((response) => response.data)
      .then((res) => {
        setDataUsers(res);
  
        const foundUser = res.find((elem) => elem.name === user.name);
        if (foundUser) {
          setUsuario(foundUser);
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
              <nav className="navvertical mt-4">
                <ul>
                 {usuario.rol === "agente" ? <li><NewUsuario users={dataUsers} nombre={"User root"} tipo={"agente"} /><hr /></li> : <></> }
                 {usuario.rol === "agente" ? <li><NewUsuario users={dataUsers} nombre={"Agente"} tipo={"representante"} /><hr /></li> : <></> }
                  <li>
                      <NewUsuario users={dataUsers} tipo={"admin"} nombre={"Admin"}/>
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
                <TablaUsuarios users={dataUsers} usuario={usuario} />
              </div>
          </div>
        </>
  )}
}

export default Grupo