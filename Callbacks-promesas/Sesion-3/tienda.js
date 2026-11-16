// =====================================================
// EJERCICIO 3.3 · TIENDA SIMULADA
// Tienes disponibles (en api.js):
//   obtenerProductos()  → Promise<[{ id, nombre, precio }, ...]>
//   obtenerStock(id)    → Promise<{ id, unidades }>
// Ambas fallan a veces. Completa los TODO.
// =====================================================

const cargando = document.getElementById('cargando');
const error = document.getElementById('error');
const mensajeError = document.getElementById('mensajeError');
const lista = document.getElementById('listaProductos');
const btnReintentar = document.getElementById('btnReintentar');

const mostrar = elemento => elemento.classList.remove('oculto');
const ocultar = elemento => elemento.classList.add('oculto');

// Pinta un producto en la lista. Ya está hecho: úsalo.
function pintarProducto(producto, unidades) {
  const li = document.createElement('li');
  const nombre = document.createElement('span');
  nombre.textContent = `${producto.nombre} · ${producto.precio.toFixed(2)} €`;
  const stock = document.createElement('span');
  stock.textContent = unidades > 0 ? `${unidades} uds.` : 'Agotado';
  if (unidades === 0) stock.classList.add('agotado');
  li.append(nombre, stock);
  lista.append(li);
}

// Ejercicio 3.4: esperar y conTimeout van aquí arriba para que existan
// antes de llamar a cargarTienda(). Ver explicación en ejercicios-3.js.
const LIMITE_MS = 2000;

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function conTimeout(promesa, ms) {
  const limite = esperar(ms).then(() => {
    throw new Error('Tiempo agotado');
  });
  return Promise.race([promesa, limite]);
}

// Flujo: Cargando… → productos → stock de todos en paralelo → pintar.
// Un único catch recoge el fallo de cualquier paso y finally quita
// «Cargando…» tanto si sale bien como si sale mal.
function cargarTienda() {
  // TODO 1: vaciar la lista, ocultar el error y mostrar «Cargando…»
  lista.innerHTML = '';
  ocultar(error);
  mostrar(cargando);

  let productos; // aquí guardamos los productos para usarlos más adelante

  // TODO 2: obtener los productos
  conTimeout(obtenerProductos(), LIMITE_MS)
    // TODO 3: pedir el stock de todos a la vez
    // Promise.all porque los stocks no dependen entre sí (más rápido que en
    // serie) y si falla uno no se puede pintar la tienda completa.
    // (El parámetro se llama "recibidos" para no tapar la variable lista del <ul>.)
    .then(recibidos => {
      productos = recibidos;
      const peticiones = productos.map(p => obtenerStock(p.id));
      return conTimeout(Promise.all(peticiones), LIMITE_MS);
    })
    // TODO 4: pintar cada producto con su stock
    // Promise.all mantiene el orden, así que stocks[i] es el de productos[i].
    .then(stocks => {
      productos.forEach((producto, i) => {
        pintarProducto(producto, stocks[i].unidades);
      });
    })
    // TODO 5: si algo falla, mostrar el error
    .catch(err => {
      mensajeError.textContent = err.message;
      mostrar(error);
    })
    // TODO 6: ocultar «Cargando…»
    .finally(() => ocultar(cargando));
}

// TODO 7: el botón «Reintentar» vuelve a cargar
// Se pasa la función sin paréntesis: se ejecutará al hacer clic.
btnReintentar.addEventListener('click', cargarTienda);

cargarTienda();




// =====================================================
// AMPLIACIÓN (ejercicio 3.4): cuando tengas conTimeout, cópiala junto
// con esperar AL PRINCIPIO de este archivo (antes de la línea
// cargarTienda(), o dará error porque aún no existe) y envuelve con
// ella las dos peticiones de cargarTienda:
//   obtenerProductos()      →  conTimeout(obtenerProductos(), ms)
//   Promise.all(peticiones) →  conTimeout(Promise.all(peticiones), ms)
//
// 1. Pruébala con ms = 500. Esta API tarda entre 0,2 y 1 segundo en
//    cada petición, así que casi siempre saltará el error
//    «Tiempo agotado». Así compruebas que funciona.
// 2. Después déjala en 2000. Con esta API ya no saltará nunca, pero
//    con un servidor real (en AJAX) sí puede tardar más, y entonces
//    la tienda mostrará el error en lugar de quedarse «Cargando…».
// =====================================================
