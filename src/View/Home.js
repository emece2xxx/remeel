/* eslint-disable jsx-a11y/anchor-is-valid */
// Home.js
import React from 'react';
import { Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom';
import { footer, Navbar, Nav, Button } from 'react-bootstrap';
import AceptarReceta from './AceptarReceta';
import LandingFarmaceutico from './LandingFarmaceutico';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div id="root" className="home-container">
      <div className="header">
            <Navbar bg="dark" variant="dark">
        <Navbar.Brand>REMEEL</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home/LandingFarmaceutico">Pagina Principal</Nav.Link>
          <Nav.Link as={Link} to="/home/AceptarReceta">Aceptar Receta</Nav.Link>
        </Nav>
        <div className="ms-auto">
          <Button variant="outline-light" onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
          </Navbar>
      </div>
      <div className="content">
        <Routes>
          <Route path="LandingFarmaceutico" element={<LandingFarmaceutico />} />
          <Route path="AceptarReceta" element={<AceptarReceta />} />
        </Routes>
      </div>
      <footer className='bg-dark text-light'>
      <div class="row">
      <div class="col-6 col-md-2 mb-3">
        <h5>Navegación</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">Pagina Principal</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">Aceptar Receta</a></li>
        </ul>
      </div>

      
    </div>
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© Creado para la asignatura Ingenieria Web de la Carrera Licenciatura en Sistemas de Información del año 2024</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <a className="link-body-emphasis" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#twitter" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="link-body-emphasis" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#instagram" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="link-body-emphasis" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#facebook" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
      </footer>
    </div>
  );
};

export default Home;
