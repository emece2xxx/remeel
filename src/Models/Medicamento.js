class Medicamento{
    
    constructor(CodigoMedicamento,Nombre,Laboratorio,Dosis){
        this.CodigoMedicamento=CodigoMedicamento;
        this.Nombre=Nombre;        
        this.Laboratorio=Laboratorio;
        this.Dosis=Dosis;
    }
    getCodigoMedicamento(){
        return this.CodigoMedicamento;
    }    
    getNombre(){
        return this.Nombre;
    }
    getLaboratorio(){
        return this.Laboratorio;
    }
    getDosis(){
        return this.Dosis;
    }
    setCodigoMedicamento(CodigoMedicamento)
    {
        this.CodigoMedicamento=CodigoMedicamento;
    }
    setNombre(Nombre){
        this.Nombre=Nombre;
    }
    setLaboratorio(Laboratorio){
        this.Laboratorio=Laboratorio;
    }
    setDosis(Dosis){
        this.Dosis=Dosis;
    }
    
}
export default Medicamento;