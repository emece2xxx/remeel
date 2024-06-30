import { React, useState, useRef } from 'react';
import './AceptarReceta.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Alert } from '@mui/material';
import VentanaModal from './VentanaModal';
import Medicamento from '../Models/Medicamento';
import Paciente from '../Models/Paciente';
import Medico from '../Models/Medico';
import Receta from '../Models/Receta';

const AceptarReceta =() => {
    const [datosMedico, setDatosMedico] = useState({});
    const [datosPaciente, setDatosPaciente] = useState({});
    const [datosReceta, setDatosReceta] = useState({});
    const [datosMedicamento, setDatosMedicamento] = useState([]);
    const [dataFound, setDataFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    let modalExito = useRef(false);
    let modalMensaje = useRef('');

    // busca la receta por el código de barras
    const handleSearch = () => {
        fetch(`/receta/${document.getElementById('botonBuscar').value}`)
        .then(response => response.json())
        .then(data => {
            setDatosMedico(new Medico(data[0].matricula,data[0].nom_medico,data[0].especialidad,'',''));
            setDatosPaciente(new Paciente(data[0].dni,data[0].nom_paciente,data[0].obra_social,data[0].nro_afiliado));
            setDatosReceta(new Receta(data[0].nro_receta,data[0].fecha_emision,data[0].codigo_barras,data[0].dni,data[0].matricula,data[0].estado));
            setDatosMedicamento(data.map(item => new Medicamento(item.cod_medicamento,item.nombre,item.laboratorio,item.dosis,item.cantidad)));
            setDataFound(true);
            setErrorMessage('');
        })
        .catch(err => {
           setDataFound(false);
           setErrorMessage(<Alert severity="error" variant='filled' sx={{margin: '10px', width: 'fit-content'}}>No se encontraron datos</Alert>);
        });
    };

    // actualiza la base de datos cambiando el estado de la receta a usada
    const handleAceptar = () => {
        if(datosReceta.Estado === 'Activa') {
            fetch(`/receta-usar/${datosReceta.NumeroReceta}`)
            .then(response => {
            	modalExito.current = true;
            	modalMensaje.current = `Receta Nro. ${datosReceta.NumeroReceta} - Código ${datosReceta.CodigoBarra} ACEPTADA`;
            	setModalOpen(true);
                // limpia las tablas
                setDatosPaciente({});
                setDatosMedico({});
                setDatosReceta({});
                setDatosMedicamento([]);
            })
            .catch(err => alert('Error de conexión con la BD'));
        }
        else {
        	modalExito.current = false;
        	modalMensaje.current = 'Sólo se pueden aceptar recetas activas';
        	setModalOpen(true);
        }
    }
    
    const handleCerrarModal = () => setModalOpen(false);

    return (
    <div className='contentAceptarReceta'>
        <h1>Aceptar Receta</h1>
        <div className='title'>
        	<div className='PanelSuperior'>
                <h6>Código de Barras</h6>
                <input id="botonBuscar" style={{'marginLeft': '10px'}} placeholder='Código de Barras'></input>
                <Button id='buscarReceta' variant="contained" onClick={handleSearch}>Buscar</Button>
        	</div>
        </div>
        {errorMessage}
        <div className={`table ${!dataFound ? 'disabled' : ''}`}>
            <div className='pacienteMedicoTables' style={{flexDirection: 'row'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} variant='head'>Medico</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Nombre y Apellido</TableCell>
                                <TableCell>Número de Matrícula Profesional</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow
                                key={datosMedico.MP}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center'>{datosMedico.ApellidoNombre}</TableCell>
                                <TableCell align='center'>{datosMedico.MP}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4} variant='head'>Paciente</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Nombre y Apellido</TableCell>
                                <TableCell>DNI</TableCell>
                                <TableCell>Obra Social</TableCell>
                                <TableCell>Número Afiliado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            <TableRow
                                key={datosPaciente.DNI}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >{datosPaciente.ApellidoNombre}</TableCell>
                                <TableCell >{datosPaciente.DNI}</TableCell>
                                <TableCell >{datosPaciente.ObraSocial}</TableCell>
                                <TableCell >{datosPaciente.NumeroSocio}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <TableContainer className='medicamentoTable' component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                    <TableRow>
                        <TableCell colSpan={4} variant='head'>Medicamento</TableCell>
                    </TableRow>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Laboratorio</TableCell>
                            <TableCell>Dosis</TableCell>
                            <TableCell>Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                    {datosMedicamento.map((row) => (
                            <TableRow
                                key={row.CodigoMedicamento}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center'>{row.Nombre}</TableCell>
                                <TableCell align='center'>{row.Laboratorio}</TableCell>
                                <TableCell align='center'>{row.Dosis}</TableCell>
                                <TableCell align='center'>{row.Cantidad}</TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px'}}>
            <Button id='aceptarRecetaButton' variant='contained' color='success' onClick={handleAceptar} >Aceptar receta</Button>
        </div>
        	<VentanaModal abierta={modalOpen} exito={modalExito.current} mensaje={modalMensaje.current} onCloseModal={handleCerrarModal} />
    </div>
    );
};

export default AceptarReceta;
