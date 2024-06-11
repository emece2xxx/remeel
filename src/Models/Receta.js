class Receta{
    
    constructor(NumeroReceta,Fecha,CodigoBarra,DNI,MPMedico,Estado){
        this.NumeroReceta=NumeroReceta;
        this.Fecha=Fecha;
        this.CodigoBarra=CodigoBarra;        
        this.DNI=DNI;
        this.MPMedico=MPMedico;
        this.Estado=Estado;
    }
    getNumeroReceta(){
        return this.NumeroReceta;
    }
    getFecha(){
        return this.Fecha;
    }
    getCodigoBarra(){
        return this.CodigoBarra;
    }
    getMPMedico(){
        return this.MPMedico;
    }
    getDNI(){
        return this.DNI;
    }    
    getEstado(){
        return this.Estado;
    }
    SetNumeroReceta(NumeroReceta){
        this.NumeroReceta=NumeroReceta;
    }
    SetFecha(Fecha){
        this.Fecha=Fecha;
    }
    setCodigoBarra(CodigoBarra){
        this.CodigoBarra=CodigoBarra;
    }
    setMPMedico(MPMedico){
        this.MPMedico=MPMedico;
    }
    setDNI(DNI){
        this.DNI=DNI;        
    }    
    setEstado(Estado){
        this.Estado=Estado;
    }
    
}
export default Receta;