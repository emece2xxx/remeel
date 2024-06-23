class Medicamento{

    constructor(CodigoMedicamento,Nombre,Laboratorio,Dosis,Cantidad){
        this.CodigoMedicamento=CodigoMedicamento;
        this.Nombre=Nombre;
        this.Laboratorio=Laboratorio;
        this.Dosis=Dosis;
        this.Cantidad=Cantidad;
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
    getCantidad(){
        return this.Cantidad;
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
    setCantidad(Cantidad){
        this.Cantidad=Cantidad;
    }
}
export default Medicamento;
