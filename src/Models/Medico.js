class Medico{

    constructor(MP,ApellidoNombre,Especialidad,Correo,Firma){
        this.MP=MP;
        this.ApellidoNombre=ApellidoNombre;
        this.Especialidad=Especialidad;
        this.Correo=Correo;
        this.Firma=Firma;
    }
    getMP(){
        return this.MP;
    }
    getApellidoNombre(){
        return this.ApellidoNombre;
    }
    getEspecialidad(){
        return this.Especialidad;
    }
    getCorreo(){
        return this.Correo;
    }
    getFirma(){
        return this.Firma;
    }
    setMP(MP){
        this.MP=MP;
    }
    setApellido(ApellidoNombre){
        this.ApellidoNombre=ApellidoNombre;
    }
    setEspecialidad(Especialidad){
        this.Especialidad=Especialidad;
    }
    setCorreo(Correo){
        this.Correo=Correo;
    }
    setFirma(Firma){
        this.Firma=Firma;
    }
}

export default Medico;
