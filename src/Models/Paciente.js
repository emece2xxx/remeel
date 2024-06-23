class Paciente{
    
    constructor(DNI,ApellidoNombre,ObraSocial,NumeroSocio){
        this.DNI=DNI;
        this.ApellidoNombre=ApellidoNombre;
        this.ObraSocial=ObraSocial;
        this.NumeroSocio=NumeroSocio;
    }
    getDNI(){
        return this.DNI;
    }
    getApellidoNombre(){
        return this.ApellidoNombre;
    }
    getObraSocial(){
        return this.ObraSocial;
    }
    setDNI(DNI){
        this.DNI=DNI;
    }
    setApellido(ApellidoNombre){
        this.ApellidoNombre=ApellidoNombre;
    }
    setObraSocial(ObraSocial){
        this.ObraSocial=ObraSocial;
    }
    setNumeroSocio(NumeroSocio){
        this.NumeroSocio=NumeroSocio;
    }
}
export default Paciente;
