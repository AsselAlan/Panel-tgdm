import React, { useState } from 'react'

import {Button, Container, Modal, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './jugadores.css'

import api from '../../routes/api.js'


const NewRetiro = ({jugadores,user,grupos}) => {

const notify = () => toast.success(`Retiro de ${data.monto} realizada!`, {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,  
  theme: "colored",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [showNewRetiro, setShowNewRetiro] = useState(false);
  const handleCloseShowNewRetiro = () => setShowNewRetiro(false);
  const handleShowNewRetiro = () =>{
        let idExiste = false
        let saldoInsu = false
        jugadores.map((elem)=>{
            if(elem.id === Number(data.id)){
                idExiste = true
                if(elem.saldo < data.monto){
                    saldoInsu  = true 
                }
            }
        })   
        if(data.id === "" || data.monto === "" || data.nombreGrupo === ""){
            setMessage("Inserte todos los campos!")
        }
        else if(!idExiste){
            setMessage("Jugador no encontrado")
        }
        else if(saldoInsu){
            setMessage(`Saldo insuficiente para realizar un reetiro de $${data.monto}`)
        }
        else{ 
            setShowNewRetiro(true)  
        }
    }

    const [showMensajeSaldo, setShowMensajeSaldo] = useState(false);
    const handleCloseMensajeSaldo = () =>{setPending(true),setShowMensajeSaldo(false),window.location.href="/jugadores"};
    const handleShowMensajeSaldo = () => setShowMensajeSaldo(true);
    
  const [data, setData] = useState({
      id: "",
      monto: "",
      nombreGrupo: ""
  }) 
  
  const [message, setMessage] = useState();

  const [pending, setPending] = useState(false);

  function handleChange(evt) {
    setMessage("");
    const { name, value } = evt.target;
    let updatedData = { ...data, [name]: value };
  
    if (user.rol === "admin") {
      updatedData = { ...updatedData, nombreGrupo: user.grupo[0].nombre };
    }
  
    setData(updatedData);
  }

  const putRetirar = async () =>{
    await api.put("/api/jugadores/retirar", data)
      .then((response) => {
            notify()
            handleCloseShowNewRetiro()
            handleClose()
            handleShowMensajeSaldo()
      })
  }
    if(pending){
        return(<Container className='d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
    }else{
        return (
            <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />

                <a onClick={()=>{handleShow()}}>Retirar saldo</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Nuevo Retiro de saldo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className="mt-3 d-flex flex-column">
                            <h6>Id:</h6>
                            <input type="number" name="id" autocomplete="off" placeholder='Ingrese nombre del usuario' value={data.id}  onChange={handleChange}/>
                            <h6>Monto:</h6>
                            <input type="number" name="monto" autocomplete="off" placeholder='Ingrese una contraseña' value={data.monto}  onChange={handleChange}/>
                            <h6>Grupo:</h6>
                            {user.rol === "agente" ? (
                                <select name="nombreGrupo" id="cars" onClick={handleChange}>
                                <option value=""></option>
                                {grupos.map((elem, i) => {
                                    return <option value={elem.nombre} key={i}>{elem.nombre}</option>
                                })}
                                </select>) : user.rol === "admin" ? (
                                    <input type="text" name="nombreGrupo" value={user.grupo[0].nombre} readOnly onChange={handleChange}/>
                                ):
                                ( 
                                    <select name="nombreGrupo" id="cars" onClick={handleChange}>
                                    <option value=""></option>
                                    {user.grupo.map((elem, i) => {
                                        return <option value={elem.nombre} key={i}>{elem.nombre}</option>
                                    })}
                                    </select>
                                )}
                            <h5 className='text-center m-3'>{message}</h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" onClick={()=>{handleShowNewRetiro()}}>Retirar</Button>    
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={showNewRetiro} onHide={handleCloseShowNewRetiro} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea Retirar ${data.monto} al jugador {
                        jugadores.map((elem)=>{if(elem.id === Number(data.id) && elem.grupo[0].nombre === data.nombreGrupo){return elem.nombre}})} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>putRetirar()}>
                            SI
                            </Button>
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowNewRetiro}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal centered show={showMensajeSaldo} onHide={handleCloseMensajeSaldo} scrollable={true}>
                    <Modal.Header closeButton> 
                            {jugadores.map((jugador)=>{
                                 if(jugador.id === Number(data.id) && jugador.grupo[0].nombre === data.nombreGrupo){
                                    return (
                                        <>
                                            <p>
                                            📤Retiro de saldo
                                            <br/>
                                            <br/>
                                            💵Monto: ${data.monto}
                                            <br/>
                                            <br/>
                                            💰Tu saldo actual es: ${jugador.saldo - Number(data.monto)}
                                            </p>
                                        </>
                                    )
                                }
                            })}
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3'>
                            COPIAR
                            </Button>
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseMensajeSaldo}>
                            CERRAR
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
  )}
}

export default NewRetiro