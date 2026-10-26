// =====================================================================
// EJERCICIO 1.4 · Semáforo con callbacks
// Abre semaforo.html en el navegador para ver el resultado.
//
// 1. Crea cambiarColor(color, ms, callback), que:
//      - pinte el fondo del círculo con ese color
//        (semaforo.style.background = color)
//      - y llame a callback pasados ms milisegundos (usa setTimeout)
//
// 2. Úsala para que el semáforo pase de:
//      verde ('green') 3 s  →  ámbar ('orange') 1 s  →  rojo ('red') 3 s
//    y vuelva a empezar.
//
// 3. Fíjate en la forma que toma tu código.
//    ¿Cómo quedaría con diez colores?
/*
    Cada cambiarColor va dentro del callback del anterior, el codigo se 
    va metiendo cada vez más a la derecha en forma de piramide, si quisieramos 
    hacer un semaforo por ejemplo de diez colores , tendriamos que hacer diez funciones
    anidadas , esto se llama callback hell, el resultado es un codigo dificil 
    de leer y facil de equivocarse ,ademas de dificil modificación 
*/
// =====================================================================

const semaforo = document.getElementById('semaforo');

// Tu código aquí:
function cicloColor(){
    cambiarColor('green',3000,()=>{
        cambiarColor('orange',1000,()=>{
             cambiarColor('red',3000,cicloColor)
        });
    });
}
function cambiarColor(color, ms, callback) {
  semaforo.style.background = color;
  setTimeout(callback, ms);
}

cicloColor();

