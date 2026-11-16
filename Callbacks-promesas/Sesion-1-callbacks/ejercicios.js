// =====================================================================
// SESIÓN 1 · CALLBACKS · Ejercicios 1.1, 1.2 y 1.3
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: node ejercicios.js
// (El ejercicio 1.4 está en semaforo.js)
// =====================================================================


// ---------------------------------------------------------------------
// EJERCICIO 1.1 · De función clásica a flecha
// Reescribe cada función como función flecha, en la forma más corta
// posible. Cambia los nombres para que no se repitan (cuadrado2, etc.)
// y comprueba con console.log que dan el mismo resultado.
// ---------------------------------------------------------------------

function cuadrado(x) { return x * x; }
function saludo(nombre, hora) { return 'Buenas ' + hora + ', ' + nombre; }
function crearPunto(x, y) { return { x: x, y: y }; }
function aleatorio() { return Math.random(); }

// Tu código aquí:
// Forma más corta: sin paréntesis si hay un solo parámetro, sin llaves ni
// return si el cuerpo es una sola expresión. Para devolver un objeto se
// envuelve en ( ) para que { } no se confunda con el cuerpo de la función.
const cuadrado1 = x => x ** 2;
const saludo1 = (nombre, hora) => `Buenas ${hora}, ${nombre}`;
const crearPunto1 = (x, y) => ({ x, y });
const aleatorio1 = () => Math.random();

// Comprobaciones: todas deben imprimir true

console.log(cuadrado(5) === cuadrado1(5));
console.log(saludo('Ana', 'tardes') === saludo1('Ana', 'tardes'));
console.log(JSON.stringify(crearPunto(1, 2)) === JSON.stringify(crearPunto1(1, 2)));
console.log(aleatorio1() >= 0 && aleatorio1() < 1);



// ---------------------------------------------------------------------
// EJERCICIO 1.2 · Mi propio forEach y mi propio filter
// Vas a escribir tus propias versiones de forEach y filter.
// Recuerda la función repetir que hemos visto en clase:
//
//   const repetir = (veces, fn) => {
//     for (let i = 0; i < veces; i++) {
//       fn(i);
//     }
//   };
//
// Usaremos estos dos arrays:
const frutas = ['manzana', 'pera', 'uva'];
const numeros = [3, 8, 1, 12];

// repetir recibe una función (callback) y la llama "veces" veces.
// Es la base de miForEach: la lógica del bucle es fija y lo que se hace
// en cada vuelta lo decide quien llama.
const repetir = (veces, fn) => {
  for (let index = 0; index < veces; index++) {
    fn(index);
  }
};
repetir(frutas.length, i => console.log(i + ' , ' + frutas[i]));
console.log('\n');
repetir(numeros.length, i => console.log(i + ' , ' + numeros[i]));



// ----- a) miForEach(array, callback) -----
// Debe hacer lo mismo que frutas.forEach(...): recorrer el array y,
// en cada vuelta, llamar al callback pasándole el elemento y su posición.
//
//   Paso 1. Dentro, escribe un for que recorra el array
//           (i desde 0 hasta array.length - 1).
//   Paso 2. En cada vuelta, llama al callback con DOS argumentos:
//           el elemento (array[i]) y su posición (i).
//
// Pista: es como repetir, pero con array.length en lugar de veces,
// y callback(array[i], i) en lugar de fn(i).
// No hace falta return: el callback ya hace el trabajo (imprimir).

// Recorre el array y pasa (elemento, posición) al callback, igual que forEach.
// No devuelve nada: el trabajo lo hace el callback.
const miForEach = (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    callback(array[index], index);
  }
};

miForEach(frutas, (fruta, pos) => console.log(pos + ': ' + fruta));
console.log('\n');
miForEach(numeros, (numero, pos) => console.log(pos + ': ' + numero));


// Prueba (quita las // de la línea de abajo cuando tengas la función):
// miForEach(frutas, (fruta, i) => console.log(i + ': ' + fruta));
//
// Salida esperada:
//   0: manzana
//   1: pera
//   2: uva


// ----- b) miFilter(array, condicion) -----
// Debe hacer lo mismo que numeros.filter(...): DEVOLVER un array nuevo
// solo con los elementos que cumplen la condición.
// condicion es un callback que recibe un elemento y DEVUELVE true o false.
//
//   Paso 1. Crea un array vacío: const resultado = [];
//   Paso 2. Recorre el array (con un for o con tu miForEach).
//   Paso 3. Para cada elemento, llama a condicion(elemento).
//           Si devuelve true, añádelo con resultado.push(elemento).
//   Paso 4. Al final, devuelve resultado con return.
//
// Aquí SÍ hace falta return: quien llama a miFilter quiere el array.

// Crea un array NUEVO (no modifica el original) con los elementos para los
// que el callback "condicion" devuelve true. Aquí sí hay return porque
// quien llama necesita el resultado.
const miFilter = (array, condicion) => {
  const resultado = [];
  for (const elemento of array) {
    if (condicion(elemento)) {
      resultado.push(elemento);
    }
  }
  return resultado;
};

// Pruebas (quita las // cuando tengas la función):
console.log(miFilter(numeros, n => n > 5));         // [ 8, 12 ]
console.log(miFilter(frutas, f => f.length > 4));   // [ 'manzana' ]



// ---------------------------------------------------------------------
// EJERCICIO 1.3 · Predice el orden
// ANTES de ejecutar, escribe en el comentario de abajo en qué orden
// crees que saldrán los números. Luego quita el /* y el */ y ejecuta.
// Explica con tus palabras por qué forEach no espera y
// setTimeout(..., 0) sí.
// ---------------------------------------------------------------------

// Mi predicción: 1, 4, 5, 6, 3, 2
// Mi explicación:
/*
  1, 4, 5 y 6 son código síncrono: van directos a la pila de llamadas y se
  ejecutan en orden. forEach NO espera porque es síncrono: llama al callback
  en el momento, en cada vuelta del bucle.
  setTimeout, en cambio, no ejecuta su función: la deja programada y, cuando
  vence el tiempo, la mete en la cola de tareas. El bucle de eventos solo
  saca tareas de esa cola cuando la pila está vacía, por eso incluso con
  0 ms el 3 sale después del código síncrono. El 2 sale el último porque
  su temporizador (100 ms) vence más tarde que el de 0 ms.
*/

console.log('1');
setTimeout(() => console.log('2'), 100);
setTimeout(() => console.log('3'), 0);
console.log('4');
[5, 6].forEach(n => console.log(n));

