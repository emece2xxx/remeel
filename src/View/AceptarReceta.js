import React, {useState} from 'react';
import './AceptarReceta.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import Medicamento from '../Models/Medicamento'
import Paciente from '../Models/Paciente'
import Medico from '../Models/Medico'

const datosMedico =[
   new Medico(22357,'Nuñez','Carlos','Pediatra','example@example.com','firma'),
];
const datosPaciente =[
    new Paciente(11222333,'Mastropiero','Johann Sebastian','Sancor',111222)
];
const datosMedicamento =[
    new Medicamento(233,'reliveran','Rembrandt','100mg'),
    new Medicamento(234,'reliveran','Rembrandt','100mg'),
    new Medicamento(235,'reliveran','Rembrandt','100mg')
];

const AceptarReceta =() => {
    const [dataFound, setDataFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = () => {

        const data = fetchData();

        if (data.length > 0) {
            setDataFound(true);
            setErrorMessage('');
        } else {
            setDataFound(false);
            setErrorMessage('No se encontraron datos');
        }
    };
    const fetchData = () => {

        return [];
    };
    return (
    <div className='contentAceptarReceta'>
        <h1>Aceptar Receta</h1>
        <div className='title'>
        <div className='PanelSuperior'>
                <h6>Codigo de Barras</h6>
                
                <input style={{'marginLeft': '10px'}} placeholder='Codigo de Barras'></input>
                <Button id='buscarReceta' variant="contained">Buscar</Button>
                
        </div>
        </div>
        {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
            )}
            
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
                                <TableCell>Numero de Matricula Profesional</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {datosMedico.map((row) => (
                            <TableRow
                                key={row.MP}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center'>{row.Apellido +' ' + row.Nombre}</TableCell>
                                <TableCell align='center'>{row.MP}</TableCell>                                                                
                            </TableRow> 
                            ))}
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
                                <TableCell>Numero Afiliado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {datosPaciente.map((row) => (
                            <TableRow
                                key={row.DNI}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                                
                                <TableCell >{row.Apellido +' ' + row.Nombre}</TableCell>
                                <TableCell >{row.DNI}</TableCell>                                
                                <TableCell >{row.ObraSocial}</TableCell>
                                <TableCell >{row.NumeroSocio}</TableCell>
                            </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        
            <TableContainer className='medicamentoTable' component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} variant='head'>Medicamento</TableCell>
                    </TableRow>
                        <TableRow>                            
                            <TableCell>Nombre</TableCell>
                            <TableCell>Laboratorio</TableCell>
                            <TableCell>Dosis</TableCell>
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
                            </TableRow> 
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button 
            id='aceptarRecetaButton' 
            variant='contained' 
            color='success'>
             Aceptar 
            </Button>


        </div>                       
        
    </div>
    );
};
export default AceptarReceta;