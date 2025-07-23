import React from 'react'
import Cookies from 'universal-cookie'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import './navBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import BtnGenEvent from '../bntGenerarEvento/btnGenEven';


const cookies = new Cookies()


const NavegationBar = () => {

  let user = cookies.get("user");

  const cerrarSesion = () =>{
      cookies.remove("user", {path:"/"})

      window.location.href="/"
  }

  const navLinks = () =>{
      if(user.rol=== "admin" && user.grupo.length > 0){
        return(
          <Nav className="me-auto">
            <Nav.Link href="/jugadores">Jugadores</Nav.Link>
            <Nav.Link href="/eventos">Eventos</Nav.Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mesas"
              menuVariant="dark"
            >
             <NavDropdown.Item href="#action/3.1">
                <Nav.Link href="/mesas">Mesas en Juego</Nav.Link>    
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Nav.Link href="/mesasfinalizadas">Mesas Finalizadas</Nav.Link>    
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                <Nav.Link href="/filtrarmesas">Filtar Mesas</Nav.Link>    
                </NavDropdown.Item>
            </NavDropdown>   
          </Nav>
        )
      }
      if(user.rol=== "representante"){
        return(
          <Nav className="me-auto">
            <Nav.Link href="/grupos">Grupos</Nav.Link>   
            <Nav.Link href="/usuarios">Usuarios</Nav.Link>
            <Nav.Link href="/jugadores">Jugadores</Nav.Link>
            <Nav.Link href="/eventos">Eventos</Nav.Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mesas"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">
                <Nav.Link href="/mesas">Mesas en Juego</Nav.Link>    
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Nav.Link href="/mesasfinalizadas">Mesas Finalizadas</Nav.Link>    
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                <Nav.Link href="/filtrarmesas">Filtar Mesas</Nav.Link>    
                </NavDropdown.Item>
            </NavDropdown>     
          </Nav>
        )
      }
      else if(user.rol=== "agente"){
        return(
          <Nav className="me-auto">
            <Nav.Link href="/grupos">Grupos</Nav.Link>   
            <Nav.Link href="/usuarios">Usuarios</Nav.Link>
            <Nav.Link href="/jugadores">Jugadores</Nav.Link>
            <Nav.Link href="/eventos">Eventos</Nav.Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mesas"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">
                <Nav.Link href="/mesas">Mesas en Juego</Nav.Link>    
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Nav.Link href="/mesasfinalizadas">Mesas Finalizadas</Nav.Link>    
                </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Nav.Link href="/filtrarmesas">Filtar Mesas</Nav.Link>    
                </NavDropdown.Item>
            </NavDropdown>   
            <Nav.Link href="/balance">Balance</Nav.Link>
          </Nav>
        )
      }else{
        null
      }
  }

  if(!user){
    return(
      <></>
    )
  }
  else{
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Panel TGDM</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {navLinks()}
            <Nav>
              <Container className='d-flex'>
                <Nav.Link className='px-0'><span className="material-symbols-outlined">person</span></Nav.Link>
                <Nav.Link className='px-1'>{user.name.toUpperCase()} - {user.rol.toUpperCase()}</Nav.Link>
                <Nav.Link className='px-3 ms-auto'onClick={()=>{cerrarSesion()}}><span className="material-symbols-outlined">logout</span></Nav.Link>  
              </Container>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )}
}

export default NavegationBar