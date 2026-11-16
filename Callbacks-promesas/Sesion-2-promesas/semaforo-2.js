// =====================================================================
// EJERCICIO 2.6 · Adiós, pirámide: el semáforo con promesas
// Abre semaforo.html en el navegador para ver el resultado.
//
// Rehaz el semáforo del ejercicio 1.4 (verde 3 s → ámbar 1 s → rojo 3 s,
// y vuelta a empezar), pero ahora con promesas:
//
// 1. Copia aquí tu función esperar(ms) del ejercicio 2.5.
// 2. Crea color(c, ms), que pinte el círculo con el color c
//    y DEVUELVA esperar(ms).
// 3. Encadena los tres colores con then, sin meter un then dentro de otro.
//
// Compara la forma del código con la de tu versión del ejercicio 1.4.
// =====================================================================

const semaforo = document.getElementById('semaforo');

// Tu código aquí:

// Promesa que se cumple pasados ms. Sustituye al callback de la versión 1.4.
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Pinta el color y DEVUELVE la promesa de esperar: así el siguiente then
// no empieza hasta que pasa el tiempo de este color.
function color(c, ms) {
  semaforo.style.background = c;
  return esperar(ms);
}

// Verde 3 s → ámbar 1 s → rojo 3 s. Al acabar, ciclo se vuelve a llamar.
// Cada then devuelve la promesa de color(), por eso espera a la anterior.
function ciclo() {
  color('green', 3000)
    .then(() => color('orange', 1000))
    .then(() => color('red', 3000))
    .then(ciclo);
}

ciclo();

// Comparación con el 1.4:
// Con callbacks cada color va DENTRO del anterior (pirámide / callback hell).
// Con promesas los pasos van uno DEBAJO de otro, en plano: con diez colores
// serían diez then seguidos, fácil de leer y de cambiar, y un solo catch
// bastaría para todos los errores.
