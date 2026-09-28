const enlaces= document.querySelectorAll("a");
const numEnlaces= Array.from(enlaces);
console.log(numEnlaces.length);
console.log(numEnlaces[5].getAttribute("href"));
let suma =0;
for(let numEnlace of numEnlaces){
    if (numEnlace.getAttribute("href")=="http://prueba"){
        suma++;
    }
}
console.log(suma);

let body= document.querySelector("body");

let numEnlaces3=body.querySelectorAll("a");
const parrafo= document.querySelector("p");
const contadorEnlaces=parrafo.querySelectorAll("a")
const numEnlacesPrimer=Array.from(contadorEnlaces);
console.log(numEnlacesPrimer.length);