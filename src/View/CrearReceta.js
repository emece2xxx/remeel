import { React, useState, useEffect, useRef } from 'react';
import './CrearReceta.css';
import { Grid, Box, Select, FormControl, InputLabel, MenuItem, TextField, Button, Divider, Chip, Collapse, Alert } from '@mui/material';
import VentanaModal from './VentanaModal';
import VentanaRecetaCompleta from './VentanaRecetaCompleta';
import Paciente from '../Models/Paciente'
import { useUser } from '../Controller/UserContext';

const CrearReceta = () => {
	const { userReg } = useUser();
    const [datosPaciente, setDatosPaciente] = useState({});
    const [listaMedicamentos, setListaMedicamentos] = useState('');
    const [dataFound, setDataFound] = useState(false);
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [medicamento1, setMedicamento1] = useState('');
    const [medicamento2, setMedicamento2] = useState('');
    const [medicamento3, setMedicamento3] = useState('');
    const [recetaCreada, setRecetaCreada] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    let modalExito = useRef(false);
    let modalMensaje = useRef('');
    const modalRecCompOpen = useRef(false);
    
    // genera un código de barras EAN-13 aleatorio válido
    const barcodeGen = () => {
    	const n = (900000000000 + Math.floor(Math.random() * 100000000000)).toString();
    	let s1 = 0;
    	for(let i = 1; i < 12; i += 2) s1 += Number.parseInt(n[i]);
    	s1 *= 3;
    	let s2 = 0;
    	for(let i = 0; i < 12; i += 2) s2 += Number.parseInt(n[i]);
    	const s3 = (s1 + s2) % 10;
    	const chk = s3 > 0 ? 10 - s3 : s3;
    	return n * 10 + chk;
	}

    useEffect(() => {
        fetch('/medicam')
        .then(response1 => response1.json())
        .then(data => setListaMedicamentos(data.map(item => <MenuItem value={item.cod_medicamento}>{`${item.nombre} ${item.dosis}`}</MenuItem>)))
        .catch(err => alert(err));
    },[]);

    const handleSearch = () => {
		fetch(`/paciente/${document.getElementById('botonBuscarPaciente').value}`)
		.then(response => response.json())
		.then(data => {
			let os = data[0].obra_social ? data[0].obra_social : 'NO';
			let na = data[0].nro_afiliado ? data[0].nro_afiliado : 'NO';
			setDatosPaciente(new Paciente(data[0].dni,data[0].apellido_nombre,os,na));
			setDataFound(true);
            setErrorMessage('')
            setChecked(true);
		})
		.catch(err => {
			setDataFound(false);
			setErrorMessage(<Alert severity="error" variant='filled' sx={{margin: '10px', width: 'fit-content'}}>No se encontraron datos</Alert>);;
		});
    }
    
    // creación de la receta a partir del formulario en pantalla
    const handleCrear = () => {
    	// preparación del objeto a enviar a la BD
    	const f = new Date();
    	const strFecha = `${f.getFullYear()}-${f.getMonth()+1}-${f.getDate()}`;
    	const codBarras = barcodeGen();

    	let objReceta = {
    		codigo_barras: codBarras,
    	  	fecha_emision: strFecha,
          	matricula_med: userReg.matricula,
          	dni_paciente: datosPaciente.DNI,
          	detalle: []
        }
        
    	// validación del detalle de la receta
		if(medicamento1) objReceta.detalle.push({codigo: medicamento1, cantidad: document.getElementById('cant1').value});
		if(medicamento2) objReceta.detalle.push({codigo: medicamento2, cantidad: document.getElementById('cant2').value});
		if(medicamento3) objReceta.detalle.push({codigo: medicamento3, cantidad: document.getElementById('cant3').value});
		
		// si pasa la validación, se hace la actualización de la BD
    	if(objReceta.detalle.length > 0) {
    		let cantidadValida = true;
    		for(let i = 0; i < objReceta.detalle.length; i++) {
    			if(!objReceta.detalle[i].cantidad || parseInt(objReceta.detalle[i].cantidad) < 1) cantidadValida = false;
    		}
    		if(cantidadValida) {
    			// receta pasó validación
    			fetch("/receta-nueva", {
        			method: "POST",
        			headers: {"Content-Type":"application/json"},
        			body: JSON.stringify(objReceta)
      			})
      			.then(response => response.json())
      			.then(data => {
            	modalRecCompOpen.current = true;
            	setRecetaCreada(<VentanaRecetaCompleta codBarras={objReceta.codigo_barras} creada={true} abierta={modalRecCompOpen} onCloseModal={handleCerrarModalRecComp} />);
        		// oculta el formulario de receta
    			setChecked(false);
    			// limpieza del formulario
    			setMedicamento1();
    			setMedicamento2();
    			setMedicamento3();
    			document.getElementById('cant1').value = '';
    			document.getElementById('cant2').value = '';
    			document.getElementById('cant3').value = '';
      			})
      			.catch(err => alert("Error de conexión con la BD"));
    		}
    		else {
    			modalExito.current = false;
        		modalMensaje.current = 'Debe especificar una cantidad mayor que cero';
        		setModalOpen(true);
    		}
    	}
    	else {
    		modalExito.current = false;
        	modalMensaje.current = 'La receta debe contener al menos un medicamento';
        	setModalOpen(true);
    	}
    }
    
    const handleChange1 = (e) => setMedicamento1(e.target.value);
    const handleChange2 = (e) => setMedicamento2(e.target.value);
    const handleChange3 = (e) => setMedicamento3(e.target.value);
    const handleCerrarModal = () => setModalOpen(false);
    const handleCerrarModalRecComp = () => modalRecCompOpen.current = false;

    return (
        <div className='contentCrearReceta'>
            <h1>Crear Receta</h1>
            <div className='title'>
                <div className='PanelSuperior'>
                    <h6>DNI del Paciente</h6>
                    <input id="botonBuscarPaciente" style={{'marginLeft': '10px'}} placeholder='Ingrese el DNI...'></input>
                    <Button id='buscarPaciente' variant="contained" onClick={handleSearch}>Buscar</Button>
                </div>
            </div>
            {errorMessage}
			<Collapse in={checked}>
			<div className='formularioReceta'>
                <Grid container>
                	<Grid item xs={2}>
                	</Grid>
                	<Grid item xs={4}>
						<p style={{fontWeight: 'bold', textAlign: 'center', fontSize: '1.2em', paddingTop: '10px'}}>DATOS DEL PACIENTE</p>
                    </Grid>
                    <Grid item xs={4}>
						<p style={{fontWeight: 'bold', textAlign: 'center', fontSize: '1.2em', paddingTop: '10px'}}>DETALLE DE LA RECETA</p>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={2}>
                	</Grid>
                	<Grid item xs={8}>
                		<Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, bgcolor: '#e0f2f1', padding: 5}}>
                			<Box>
                				<Divider textAlign='center'><Chip label='Apellido y Nombre' color='info'/></Divider>
                    			<p style={{paddingTop: 10, textAlign: 'center'}}>{datosPaciente.ApellidoNombre}</p>
                    			<Divider textAlign='center'><Chip label='Obra social' color='info'/></Divider>
                    			<p style={{paddingTop: 10, textAlign: 'center'}}>{datosPaciente.ObraSocial}</p>
                    			<Divider textAlign='center'><Chip label='Número de afiliado' color='info'/></Divider>
                    			<p style={{paddingTop: 10, textAlign: 'center'}}>{datosPaciente.NumeroSocio}</p>   	
                    		</Box>
                    		<Grid container spacing={2}>
                    			<Grid item xs={8} >
                    				<FormControl sx={{ width: 1 }}>
                    					<InputLabel id='labelSel1'>Medicamento 1</InputLabel>
										<Select labelId='labelSel1' id='sel1' value={medicamento1} label='Medicamento 1' onChange={handleChange1}>
        									<MenuItem value={0}><em>Ninguno</em></MenuItem>
                        					{listaMedicamentos}
                    					</Select>
                    				</FormControl>
                				</Grid>
                				<Grid item xs={4} >
                    				<TextField id='cant1' label='Cantidad' type='number' defaultValue='' />
                				</Grid>
                				<Grid item xs={8} >
                					<FormControl sx={{ width: 1 }}>
                    					<InputLabel id='labelSel2'>Medicamento 2</InputLabel>
        								<Select labelId='labelSel2' id='sel2' value={medicamento2} label='Medicamento 2' onChange={handleChange2}>
        									<MenuItem value={0}><em>Ninguno</em></MenuItem>
                        					{listaMedicamentos}
                    					</Select>
                    				</FormControl>
                				</Grid>
                				<Grid item xs={4} >
                    				<TextField id='cant2' label='Cantidad' type='number' defaultValue='' />
                				</Grid>
                				<Grid item xs={8} >
                					<FormControl sx={{ width: 1 }}>
                    					<InputLabel id='labelSel3'>Medicamento 3</InputLabel>
        								<Select labelId='labelSel3' id='sel3' value={medicamento3} label='Medicamento 3' onChange={handleChange3}>
        									<MenuItem value={0}><em>Ninguno</em></MenuItem>
                        					{listaMedicamentos}
                    					</Select>
                    				</FormControl>
                				</Grid>
                				<Grid item xs={4} >
                    				<TextField id='cant3' label='Cantidad' type='number' defaultValue='' />
                				</Grid>
                    		</Grid>
                		</Box>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px'}}>
            	<Button id='crearRecetaButton' variant='contained' color='success' onClick={handleCrear}>Crear</Button>
            </div>
			</Collapse>
			<VentanaModal abierta={modalOpen} exito={modalExito.current} mensaje={modalMensaje.current} onCloseModal={handleCerrarModal} />
			{recetaCreada}
        </div>
    );
};

export default CrearReceta;
