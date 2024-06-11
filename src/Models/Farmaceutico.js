class Farmaceutico{
    
    constructor(MP,Apellido,Nombre,Farmacia){
        this.MP=MP;
        this.Apellido=Apellido;
        this.Nombre=Nombre;
        this.Farmacia=Farmacia;
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
    getFarmacia(){
        return this.Farmacia;
    }
    setMP(MP)
    {
        this.MP=MP;
    }
    setApellido(Apellido){
        this.Apellido=Apellido;
    }
    setNombre(Nombre){
        this.Nombre=Nombre;
    }
    setFarmacia(Farmacia){
        this.Farmacia=Farmacia;
    }
    
}
export default Farmaceutico;