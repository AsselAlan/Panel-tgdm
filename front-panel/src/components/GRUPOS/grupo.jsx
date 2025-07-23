import React, { useEffect, useState } from 'react'
import NewGrupo from './_newGrupo'
import TablaGrupo from './_grupoTabla'
import AddRepre from './_addRepresentante'
import AddAdmin from './_addAdmin'
import DeleteAdmin from './_deleteAdmin'
import DeleteRepre from './_deleteRepre'
import Cookies from 'universal-cookie'
import { Container, Spinner } from 'react-bootstrap'

import api from '../../routes/api.js'

import './grupo.css'

const cookies = new Cookies()

const Grupo = () => {

  let user = cookies.get("user");


  const [data,setData]=useState([])
  const [dataUsers,setDataUsers]=useState([])
  const [pending,setPending]=useState(true)
  const [usuario,setUsuario]=useState(user)


  useEffect(()=>{
    api.get("/api/grupos")
     .then(async (response) => {
         return await response.data;
     })
     .then(async(res)=>{
        setData(res)
       })
     .catch((error)=>{
         console.error(error)
     })

    api.get("/api/users")
      .then(async (response) => {
          return await response.data;
      })
      .then(async(res)=>{
        setDataUsers(res)
        res.map((elem)=>{
          if(elem.name === user.name){
            setUsuario(elem)
          }
        })
      })
      .catch((error)=>{
          console.error(error)
      })
      setPending(false)
    },[])


    if(pending){
      return(<Container className='min-vh-100 w-100 d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
    }else if(user.rol === "admin"){
      {window.location.href = "/home"}
    }else{
      return (
        <>
          <div className='Container m-3'>
              <nav className="navvertical">
                <ul>
                  {user.rol === "agente" ? <li><NewGrupo grupos={data}/><hr /></li> : <></> }
                  {user.rol === "agente" ? <li><AddRepre grupo={data} users={dataUsers} /><hr /></li> : <></> }
                  {user.rol === "agente" ? <li><DeleteRepre grupo={data} users={dataUsers} /><hr /></li> : <></> }
                  <li>
                      <AddAdmin grupo={data} users={dataUsers}  usuario={usuario} />
                      <hr />
                  </li>
                  <li>
                      <DeleteAdmin grupo={data} users={dataUsers}  usuario={usuario}/>
                  </li>
                </ul>
              </nav>
              <div className='w-100 pt-5'>
                <TablaGrupo grupos={data} usuario={usuario} />
              </div>
          </div>
        </>
  )}
}

export default Grupo