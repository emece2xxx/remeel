class Paciente{
    
    constructor(DNI,Apellido,Nombre,ObraSocial,NumeroSocio){
        this.DNI=DNI;
        this.Apellido=Apellido;
        this.Nombre=Nombre;
        this.ObraSocial=ObraSocial;
        this.NumeroSocio=NumeroSocio;
    }
    getDNI(){
        return this.DNI;
    }
    getApellido(){
        return this.Apellido;
    }
    getNombre(){
        return this.Nombre;
    }
    getObraSocial(){
        return this.ObraSocial;
    }
    setDNI(DNI){
        this.DNI=DNI;
    }
    setApellido(Apellido){
        this.Apellido=Apellido;
    }
    setNombre(Nombre){
        this.Nombre=Nombre;
    }
    setObraSocial(ObraSocial){
        this.ObraSocial=ObraSocial;
    }
    setNumeroSocio(NumeroSocio){
        this.NumeroSocio=NumeroSocio;
    }
}
export default Paciente;