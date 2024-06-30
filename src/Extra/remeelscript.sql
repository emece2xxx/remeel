DROP DATABASE IF EXISTS remeeldb;
CREATE DATABASE remeeldb;
USE remeeldb;

CREATE TABLE usuario(
	id_usuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    tipo ENUM('Paciente', 'Medico', 'Farmaceutico'),
    pwd CHAR(64) NOT NULL,
    PRIMARY KEY(id_usuario));

CREATE TABLE medico(
	matricula INT NOT NULL,
    apellido_nombre VARCHAR(50) NOT NULL,
    especialidad VARCHAR(30) NOT NULL,
    email VARCHAR(30),
    id_usuario INT,
    PRIMARY KEY(matricula),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario));

CREATE TABLE firma_medico(
	id_firma INT NOT NULL AUTO_INCREMENT,
	firma BLOB,
    matricula_med INT,
    PRIMARY KEY(id_firma),
    FOREIGN KEY(matricula_med) REFERENCES medico(matricula));

CREATE TABLE paciente(
	dni INT NOT NULL,
    apellido_nombre VARCHAR(50) NOT NULL,
    obra_social VARCHAR(20),
    nro_afiliado INT,
    id_usuario INT,
    PRIMARY KEY(dni),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario));

CREATE TABLE farmaceutico(
	matricula INT NOT NULL,
    apellido_nombre VARCHAR(50) NOT NULL,
    farmacia VARCHAR(30) NOT NULL,
    id_usuario INT,
    PRIMARY KEY(matricula),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario));

CREATE TABLE medicamento(
	cod_medicamento INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30),
    dosis VARCHAR(30),
    laboratorio VARCHAR(20),
    PRIMARY KEY(cod_medicamento));


CREATE TABLE receta(
	nro_receta INT NOT NULL AUTO_INCREMENT,
    codigo_barras BIGINT NOT NULL,
    fecha_emision DATE NOT NULL,
    estado ENUM('Activa', 'Usada', 'Vencida', 'Anulada'),
    matricula_med INT,
    dni_paciente INT,
    PRIMARY KEY(nro_receta),
    FOREIGN KEY(matricula_med) REFERENCES medico(matricula),
    FOREIGN KEY(dni_paciente) REFERENCES paciente(dni));

CREATE INDEX idx_codigo_barras ON receta(codigo_barras);

CREATE TABLE receta_medicamento(
	nro_receta INT NOT NULL,
    cod_medicamento INT NOT NULL,
    cantidad INT,
    PRIMARY KEY(nro_receta, cod_medicamento),
    FOREIGN KEY(nro_receta) REFERENCES receta(nro_receta),
    FOREIGN KEY(cod_medicamento) REFERENCES medicamento(cod_medicamento));

CREATE VIEW receta_completa AS
SELECT receta.nro_receta,codigo_barras,fecha_emision,estado,matricula,medico.apellido_nombre AS nom_medico,
	especialidad,dni,paciente.apellido_nombre AS nom_paciente,obra_social,nro_afiliado,
	medicamento.cod_medicamento,nombre,laboratorio,dosis,cantidad
FROM receta
JOIN medico ON matricula_med = matricula
JOIN paciente ON dni_paciente = dni
JOIN receta_medicamento ON receta.nro_receta = receta_medicamento.nro_receta
JOIN medicamento ON receta_medicamento.cod_medicamento = medicamento.cod_medicamento;

-- Inserción de valores
INSERT INTO usuario(nombre, tipo, pwd)
VALUES
	('morris', 'Medico', SHA2('123123123', 256)),
    ('sonia456', 'Medico', SHA2('sonia456', 256)),
    ('fj_haydn', 'Paciente', SHA2('fj_haydn', 256)),
    ('mastropiero', 'Paciente', SHA2('45454545', 256)),
    ('maria_db', 'Paciente', SHA2('maria', 256)),
    ('juanperez', 'Farmaceutico', SHA2('123456', 256));

-- Postergamos inserción de firma
INSERT INTO medico
VALUES
	(999666, 'Morris Quincey', 'Psiquiatra', 'quincey_m@outlook.com', 1),
    (345607, 'Taylor Sonia', 'Oftalmóloga', 'soniataylor456@gmail.com', 2);

INSERT INTO paciente
VALUES
	(11222333, 'Haydn Joseph', NULL, NULL, 3),
    (98765432, 'Mastropiero Johann Sebastian', 'ObSoc', 1234, 4),
    (44555666,'Debé María de los Ángeles', NULL, NULL, 5);

INSERT INTO farmaceutico
VALUES (246642, 'Pérez Juan', 'La Mal Llevada', 6);

INSERT INTO medicamento(nombre, dosis, laboratorio)
VALUES
	('Amoxidal', '500 mg', 'Roemmers'),
    ('Actinerval', '200 ml', 'Bagó'),
    ('Rivotril', '2 mg', 'Roche'),
    ('Rivotril', '0,5 mg', 'Roche'),
    ('Dexopral', '60 mg', 'Roemmers'),
    ('Amoclav Duo', '1 g', 'Casasco'),
    ('Ibupirac', '800 mg', 'Pfizer'),
    ('Ibupirac', '600 mg', 'Pfizer'),
    ('Ibupirac', '400 mg', 'Pfizer'),
    ('Meplar', '10 mg', 'Baliarda');
    
INSERT INTO receta (codigo_barras, fecha_emision, estado, matricula_med, dni_paciente)
VALUES
	(9966805046395,'2024-02-17',1,999666,11222333),
    (9536080165335,'2024-02-17',1,999666,11222333),
    (9779985718224,'2024-04-25',1,345607,11222333),
    (9291688125852,'2024-02-22',1,345607,98765432),
    (9118483505323,'2024-02-27',2,345607,98765432),
    (9717353179789,'2024-03-01',1,999666,98765432),
    (9231315413709,'2024-05-12',2,999666,98765432),
    (9004517559892,'2023-01-01',1,345607,44555666),
    (9328641589106,'2023-12-25',2,345607,44555666),
    (9629655296562,'2024-06-21',1,345607,44555666);

INSERT INTO receta_medicamento
VALUES
	 (1,1,1),
    (1,2,1),
    (2,3,1),
    (3,4,1),
    (4,5,1),
    (5,6,1),
    (5,7,3),
    (5,8,4),
    (6,9,1),
    (7,10,2),
    (7,1,1),
    (8,2,1),
    (8,3,1),
    (9,4,1),
    (9,5,1),
    (9,6,5),
    (10,7,8),
    (10,8,1);

-- Inserción de las firmas:
-- Suponiendo que contamos con los archivos "firma_morris.png" y "firma_sonia.png"
-- INSERT INTO firma_medico(firma, matricula_med)
-- VALUES
-- (LOAD_FILE('/home/mc/Downloads/firma_morris.png'), 999666),
-- (LOAD_FILE('/home/mc/Downloads/firma_sonia.png'), 345607);
-- ¡SIN EMBARGO, ESTO EN MYSQL/WINDOWS FUNCA PERO EN MARIADB/LINUX NO!
