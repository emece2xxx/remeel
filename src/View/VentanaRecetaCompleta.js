import { React, useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import logoRemeel from '../Assets/logoRemeel.svg';
import firma from '../Assets/firma.png';
const JsBarcode = require('jsbarcode');

const VentanaRecetaCompleta = (props) => {
	const [datosReceta, setDatosReceta] = useState({});
	const [datosPrescripcion, setDatosPrescripcion] = useState('');
	
	const handleClose = () => props.onCloseModal();

	const handleImprimir = () => {
		const divContent = document.getElementById('docReceta').innerHTML; 
        let a = window.open('', '', 'height=500, width=500'); 
        a.document.write('<html><body>');
        a.document.write(divContent); 
        a.document.write('</body></html>'); 
        a.document.close(); 
        a.print();
        a.close();
	}

	useEffect(() => {
		fetch(`/receta/${props.codBarras}`)
		.then(response => response.json())
		.then(data => {
			data[0].fecha_emision = new Date(data[0].fecha_emision).toLocaleDateString('es-AR');
			setDatosReceta(data[0]);
			setDatosPrescripcion(data.map(item =>
				<tr>
					<td style={{ paddingRight: '50px'}}>{item.nombre} {item.dosis} </td>
					<td>Cantidad: {item.cantidad}</td>
				</tr>));
			//nuevo
			JsBarcode(".codigoBarras").init();
		})
		.catch(err => console.log(err));
	});

	return (
		<Dialog open={props.abierta.current} onClose={handleClose}>
        	<DialogTitle>
        		RECETA NRO. {datosReceta.nro_receta} {props.creada ? 'CREADA' : ''}
        	</DialogTitle>
        	<DialogContent>
        		<div id='docReceta' style={{fontFamily: 'Gill Sans', fontSize: '1.5em'}}>
        			<div style={{textAlign: 'center'}}>
    					<img src={logoRemeel} alt='logo' width='200' />
  					</div>
					<div style={{paddingTop: '40px'}}>
						<b>Fecha receta: </b>{datosReceta.fecha_emision}
					</div>
					<div style={{paddingTop: '20px'}}>
						<b>Paciente: </b>{datosReceta.nom_paciente}<br />
						<b>DNI: </b>{datosReceta.dni}<br />
						<b>Obra social: </b>{datosReceta.obra_social}<br />
						<b>Nro. de afiliado: </b>{datosReceta.nro_afiliado}
					</div>
					<div style={{paddingTop: '20px'}}>
						<b>Rp/</b>
						<table>
							{datosPrescripcion}
						</table>
					</div>
					<div style={{paddingTop: '20px', textAlign: 'center'}}>
						<img src={firma} alt='firma' width='200' /><br />
						Dr. {datosReceta.nom_medico}<br />
						{datosReceta.especialidad}<br />
						M. N. {datosReceta.matricula}
					</div>
					<div style={{paddingTop: '20px', textAlign: 'center'}}>
						<svg
							className="codigoBarras"
							jsbarcode-format="ean13"
							jsbarcode-value={datosReceta.codigo_barras}
							jsbarcode-fontoptions="bold">
						</svg>
					</div>
        		</div>
        	</DialogContent>
        	<DialogActions>
        		<Button onClick={handleImprimir}>Imprimir</Button>
          		<Button onClick={handleClose} autoFocus>Cerrar</Button>
        	</DialogActions>
      	</Dialog>
	)
}

export default VentanaRecetaCompleta;
