// =====================================================================
// SESIÓN 3 · COMBINAR PROMESAS · Ejercicios 3.1, 3.2 y 3.4
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: node ejercicios.js
// (El ejercicio 3.3, la tienda, está en la carpeta tienda/)
//
// OJO: cuando acabes un ejercicio, coméntalo (Ctrl + /) antes de pasar
// al siguiente, para que los mensajes no se mezclen.
// =====================================================================


// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------
// esperar(ms): promesa que se cumple pasados ms milisegundos
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));

// tarea(nombre, ms, falla): promesa que tarda ms milisegundos.
// Si falla es true, se rechaza; si no, se cumple con el nombre.
const tarea = (nombre, ms, falla = false) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (falla) reject(new Error(nombre + ' ha fallado'));
    else resolve(nombre);
  }, ms);
});
// ------------------------------------------------------------------------


// ---------------------------------------------------------------------
// EJERCICIO 3.1 · ¿En serie o en paralelo?
// Lanza tres tareas de 1000 ms:
//   a) primero encadenadas con then (una detrás de otra)
//   b) después todas a la vez con Promise.all
// Mide el tiempo de cada versión con console.time('nombre') al empezar
// y console.timeEnd('nombre') al terminar.
// ¿Cuánto tarda cada una y por qué?
// ---------------------------------------------------------------------

// Tu código aquí:
// Las dos funciones devuelven su promesa para poder ejecutarlas una
// detrás de otra y que los tiempos no se mezclen.

// a) EN SERIE: cada then devuelve la siguiente tarea, que no empieza
//    hasta que acaba la anterior.
function enSerie() {
  console.time('serie');
  return tarea('A', 1000)
    .then(() => tarea('B', 1000))
    .then(() => tarea('C', 1000))
    .then(() => console.timeEnd('serie'));
}

// b) EN PARALELO: las tres tareas se crean (y arrancan) a la vez dentro
//    del array; Promise.all espera a que terminen todas.
function enParalelo() {
  console.time('paralelo');
  return Promise.all([
    tarea('A', 1000),
    tarea('B', 1000),
    tarea('C', 1000)
  ])
    .then(resultados => {
      console.log(resultados);
      console.timeEnd('paralelo');
    });
}

// Primero la serie, luego el paralelo y al final las pruebas del 3.4
enSerie().then(enParalelo).then(probarTimeout);

// Cuánto tarda cada una y por qué:
//
// a) En serie tarda unos 3 segundos, porque cada tarea espera a que
//    acabe la anterior, así que los tiempos se suman (1+1+1).
//
// b) Con Promise.all tarda 1 segundo, porque las tres empiezan a la vez
//    y solo hay que esperar a la más lenta.
//
// En serie si una tarea necesita el resultado de otra,
// en paralelo si no dependen entre ellas.

// ---------------------------------------------------------------------
// EJERCICIO 3.2 · Elige el combinador
// Para cada situación, escribe qué método usarías
// (Promise.all, Promise.allSettled, Promise.race o Promise.any) y por qué.
// No hace falta programar nada: responde en los comentarios.
// ---------------------------------------------------------------------

// a) Necesito el usuario, sus pedidos y su carrito para pintar la página.
//    Método: Promise.all
//    Por qué: necesito las tres cosas, y si falla una no puedo pintar
//    la página, así que me interesa que falle todo.
//
// b) Quiero cancelar si el servidor tarda más de 3 segundos.
//    Método: Promise.race
//    Por qué: hago una carrera entre la petición y una promesa que
//    falla a los 3 segundos. La que acabe primero gana.
//
// c) Envío 5 correos y quiero saber cuáles han fallado.
//    Método: Promise.allSettled
//    Por qué: espera a todos aunque alguno falle, y me dice
//    cuáles salieron bien y cuáles mal.
//
// d) Tengo tres servidores con los mismos datos y me vale el primero
//    que responda bien.
//    Método: Promise.any
//    Por qué: se queda con el primero que salga bien e ignora los
//    que fallen. Solo falla si fallan los tres.

// ---------------------------------------------------------------------
// EJERCICIO 3.4 · Timeout (ampliación, para quien termine la tienda)
// Escribe conTimeout(promesa, ms), que devuelva una promesa que se
// rechace con new Error('Tiempo agotado') si promesa no termina en ms
// milisegundos. Pista: combina Promise.race con esperar.
// Pruébala con:
//   conTimeout(tarea('Rápida', 500), 1000)  → debe cumplirse con 'Rápida'
//   conTimeout(tarea('Lenta', 2000), 1000)  → debe fallar: Tiempo agotado
//
// Después, úsala en la tienda (lo explica el final de tienda.js).
// ---------------------------------------------------------------------

// Tu código aquí:
// (esperar ya está definida arriba: declararla otra vez daba SyntaxError)

// Carrera entre la promesa real y un "límite" que se rechaza a los ms.
// Promise.race se queda con la que termine primero: si gana el límite,
// la promesa resultante falla con 'Tiempo agotado'.
function conTimeout(promesa, ms) {
  const limite = esperar(ms).then(() => {
    throw new Error('Tiempo agotado');
  });
  return Promise.race([promesa, limite]);
}

function probarTimeout() {
  return conTimeout(tarea('Rápida', 500), 1000)
    .then(r => console.log('Cumplida:', r))                 // Cumplida: Rápida
    .then(() => conTimeout(tarea('Lenta', 2000), 1000))
    .then(r => console.log('Cumplida:', r))
    .catch(err => console.log('Falla:', err.message));     // Falla: Tiempo agotado
}
