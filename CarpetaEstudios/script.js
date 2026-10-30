

class Rectangulo{
    constructor(base , altura){
        this.base=base;
        this.altura=altura;
    }
    calcularArea(){return Math.abs(this.base* this.altura)}
    calcularPerimetro(){return Math.abs(2*(this.base+ this.altura))}
}
let rectangulo1= new Rectangulo(15,15);
console.log(rectangulo1.calcularArea());
console.log(rectangulo1.calcularPerimetro());

class Producto{
    constructor(nombre="Sin nombre", precio=0, stock=0){
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
    }
    mostrarInfo(){console.log(this.nombre +','+ this.precio, ',' + this.stock)}

}
let producto1= new Producto();
producto1.mostrarInfo();
let producto2= new Producto("Lapiz", 1.5);
producto2.mostrarInfo();
let producto3= new Producto("Lapiz", 1.5,100);
producto3.mostrarInfo();

class Alumno{
    constructor(nombre="Sin nombre", nota=0){
        this.nombre=nombre;
        this.nota=nota;
    }
    getNombre(){return this.nombre}
    setNota(nota){this.nota=nota}
    estaAprobado(){return this.nota>=5 && this.nota <=10}
}
let alumno1= new Alumno("Juan", 4)
let alumno2= new Alumno("Maria", 5)
let alumno3= new Alumno("Jose", 11);
console.log(alumno1.estaAprobado());
console.log(alumno2.estaAprobado());
console.log(alumno3.estaAprobado());
alumno1.setNota(5);
console.log(alumno1.estaAprobado());

class CuentaBancaria{
    #saldo
    constructor(titular){
        this.titular=titular
        this.#saldo=0
    }
    getSaldo(){return this.#saldo}
    ingresar(cantidad){if(cantidad >0) this.#saldo += cantidad}
    retirar(cantidad){if(this.#saldo >=cantidad) this.#saldo-=cantidad}
}
let cuenta1= new CuentaBancaria("Miguel");
cuenta1.ingresar(200);
console.log(cuenta1.getSaldo());
cuenta1.retirar(200);
console.log(cuenta1.getSaldo())
cuenta1.retirar(200);
console.log(cuenta1.getSaldo())
console.log(cuenta1.saldo)

class Coche{
    static contador=0;
    constructor (marca, modelo){
        this.marca=marca;
        this.modelo=modelo
    }
    static anadirCoche(marca, modelo){
        this.contador++
        return new Coche(marca,modelo);
    }

}
Coche.anadirCoche('Opel', 'Zafira');
Coche.anadirCoche('Renault', 'Clyo');
console.log(Coche.contador)

class Direccion{
    constructor(calle, numero, ciudad){
        this.calle=calle;
        this.numero=numero;
        this.ciudad=ciudad
    }
}
class Cliente {
    constructor(nombre,dni,direccion){
        this.nombre=nombre;
        this.dni=dni;
        this.direccion=direccion;
    }
    mostrarCliente(){
        console.log(`${this.nombre} , ${this.dni}, ${this.direccion.calle} ,${this.direccion.numero} , ${this.direccion.ciudad}`)
    }
}
let direccion= new Direccion("Calle Manuel del Valle","4","Sevilla")
let cliente=new Cliente("Juan", "1", direccion)

cliente.mostrarCliente();

class Persona{
    constructor(nombre, edad){
        this.nombre=nombre;
        this.edad=edad;
    }
    
    saludar(){return `Hola me llamo ${this.nombre} y ${this.edad}`}
    clonar(){return new Persona(this.nombre, this.edad)}
    
}
const p1= new Persona("Juan",25);
const p2=p1;
const p3=p1.clonar();
p3.edad=29;
p2.edad=18
console.log(p1.edad==p2.edad)
console.log(p1.edad==p3.edad)

//Si solo hereda un atributo las clases hijas , o los heredan todos 
// y no tienen atribitos propios , no hace falta constructor 
class Animal{
    constructor(nombre){
        this.nombre=nombre;
    }
    hablar(){return `${this.nombre} hace un sonido `}
}

class Perro extends Animal{
    hablar(){return `${this.nombre} ladra`}
}

class Gato extends Animal{
    hablar(){return `${this.nombre} maulla`}
}

const animal= new Animal("Gustavo")
const gato= new Gato("Emilio")
const perro= new Perro("Ismael")

console.log(animal.hablar())
console.log(perro.hablar())
console.log(gato.hablar())