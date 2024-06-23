import './VerRecetaCompleta.css';
import { React, useState, useEffect } from 'react';

const RecetaCompleta = (props) => {
  const [datosReceta, setDatosReceta] = useState({});
  const [datosPrescripcion, setDatosPrescripcion] = useState('');

  useEffect(() => {
    fetch(`/receta/${props.codBarras}`)
    .then(response => response.json())
    .then(data => {
      data[0].fecha_emision = new Date(data[0].fecha_emision).toLocaleDateString('es-AR');
      setDatosReceta(data[0]);
      setDatosPrescripcion(data.map(item => <tr><td>{item.nombre}</td><td>{item.laboratorio}</td><td>{item.dosis}</td><td>{item.cantidad}</td></tr>));
    })
    .catch(err => alert(err));
  });

  return (
    <div className='recetaContainer'>
      <h4>RECETA</h4>
      <p>Nro. {datosReceta.nro_receta}<br />
        Fecha de emisión: {datosReceta.fecha_emision}<br />
        Estado: {datosReceta.estado}
      </p>
      <h4>PACIENTE</h4>
      <p>{datosReceta.nom_paciente}<br />
        Dni nro. {datosReceta.dni}<br />
        Obra social: {datosReceta.obra_social}<br />
        Afiliado nro. {datosReceta.nro_afiliado}
      </p>
      <h4>MÉDICO</h4>
      <p>{datosReceta.nom_medico}<br />
        Matrícula nro. {datosReceta.matricula}<br />
        Especialidad: {datosReceta.especialidad}
      </p>
      <h4>PRESCRIPCIÓN</h4>
      <table>
        <tr>
          <th>Medicamento</th>
          <th>Laboratorio</th>
          <th>Dosis</th>
          <th>Cantidad</th>
        </tr>
        {datosPrescripcion}
      </table>
    </div>
  );
}

export default RecetaCompleta;
