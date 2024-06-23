import React,{ useState, useEffect, useRef } from 'react';
import './VerRecetas.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, TextField } from '@mui/material';
import Receta from '../Models/Receta';
import RecetaCompleta from './VerRecetaCompleta';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { useUser } from '../Controller/UserContext';

const VerRecetas = () => {
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [datosReceta, setDatosReceta] = useState([]);
    const [recetaCompleta, setRecetaCompleta] = useState('');
    const { userReg } = useUser();
    const datosRecetaTodas = useRef([]);
    const fechaBuscar = useRef(new Date().toLocaleDateString('es-AR'));
    const vReceta = document.querySelector("#ventanaReceta");

    useEffect(() => {
        fetch(`/receta-paciente/${userReg.dni}`)
        .then(response => response.json())
        .then(data => {
            datosRecetaTodas.current = data.map(item => new Receta(item.nro_receta,new Date(item.fecha_emision).toLocaleDateString('es-AR'),item.codigo_barras,userReg.dni,item.apellido_nombre,item.estado))
            handleTraerTodas();
        })
        .catch(err => alert(err));
    },[]);

    const handleTraerTodas = () => {
        setDatosReceta(datosRecetaTodas.current);
    }

    const handleSoloValidas = () => {
        setDatosReceta(datosRecetaTodas.current.filter(item => item.Estado === 'Activa'));
    }

    const handleSoloInvalidas = () => {
        setDatosReceta(datosRecetaTodas.current.filter(item => item.Estado !== 'Activa'));
    }

    const handleBuscarPorFecha = () => {
        setDatosReceta(datosRecetaTodas.current.filter(item => item.Fecha === fechaBuscar.current));
    }

    const handleVerReceta = (e) => {
        e.preventDefault();
        if(filaSeleccionada) {
            setRecetaCompleta(<RecetaCompleta codBarras={filaSeleccionada.CodigoBarra} />);
            vReceta.showModal();
        }
        else alert('Debe seleccionar una receta');
    }

    const handleDateChange = (date) => {
        fechaBuscar.current = date.toLocaleDateString('es-AR');
        setSelectedDate(date);
    };
    const handleClick = (row) => {
        setFilaSeleccionada(row);
    };

    return (

        <div className='contentVerRecetas' >
        <Typography variant="h3" align="center" className="MuiTypography-h1">Ver Recetas</Typography>

            <div className='botonesSuperiores'>
            <h6>Búsqueda de Recetas</h6>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Seleccione la fecha"
            value={selectedDate}
            onChange={handleDateChange}
            format="dd/MM/yyyy"
            inputFormat="dd/MM/yyyy"
            locale="es-ES"
            renderInput={(params) => <TextField {...params} style={{ marginLeft: '10px' }} />}
          />
            </LocalizationProvider>
                <Button onClick={handleBuscarPorFecha} variant="contained" style={{ marginLeft: '10px' }}>Buscar</Button>
                <Button onClick={handleTraerTodas} variant="contained" style={{ marginLeft: '10px' }}>Traer Todas las Recetas</Button>
                <Button onClick={handleSoloValidas} variant="contained" style={{ marginLeft: '10px' }}>Solo las validas</Button>
                <Button onClick={handleSoloInvalidas} variant="contained" style={{ marginLeft: '10px' }}>Solo invalidas</Button>
                <Button onClick={handleVerReceta} variant="contained" color="success" style={{marginLeft: 'auto'}}>Ver Receta</Button>
            </div>
            <div className='listadoRecetasTable'>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={5} variant='head' >Receta</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Número de Receta</TableCell>
                                <TableCell>Fecha de emisión</TableCell>
                                <TableCell>Código de Barras</TableCell>
                                <TableCell>Médico</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {datosReceta.map((row) => (
                            <TableRow
                                key={row.NumeroReceta}
                                onClick={() => handleClick(row)}
                                selected={filaSeleccionada === row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >{row.NumeroReceta}</TableCell>
                                <TableCell >{row.Fecha}</TableCell>
                                <TableCell>{row.CodigoBarra}</TableCell>
                                <TableCell>{row.MPMedico}</TableCell>
                                <TableCell>{row.Estado}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>

            <dialog id="ventanaReceta">
              {recetaCompleta}
              <button onClick={() => vReceta.close()}>Cerrar</button>
            </dialog>

        </div>

    );
};

export default VerRecetas;
