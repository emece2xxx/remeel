class Medico{
    
    constructor(MP,Apellido,Nombre,Especialidad,Correo,Firma){
        this.MP=MP;
        this.Apellido=Apellido;
        this.Nombre=Nombre;
        this.Especialidad=Especialidad;
        this.Correo=Correo;
        this.Firma=Firma;
    }
    getMP(){
        return this.MP;
    }
    getApellido(){
        return this.Apellido;
    }
    getNombre(){
        return this.Nombre;
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
    setApellido(Apellido){
        this.Apellido=Apellido;
    }
    setNombre(Nombre){
        this.Nombre=Nombre;
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