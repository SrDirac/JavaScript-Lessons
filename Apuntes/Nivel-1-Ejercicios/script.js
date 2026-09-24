//Ejercicio 1  : Dibuja una tabla con dos filas y una columna.

//Almacenamos el body en una variable, para posteriormente añadir la tabla
let body = document.querySelector("body");
let btdt = document.getElementById("btdt");
let table = document.createElement("table");
let flagej3 =false;
/**
 * Función que crea la tabla
 */
function drawTable(body) {
  //Creamos la columna
  let fila = table.insertRow();

  //Insertamos en la misma fila dos celdas, cambiamos
  //el contenido de cada una para identificarlas facilmente
  fila.insertCell().textContent = "Primera fila";
  fila.insertCell().textContent = "Segunda fila";

  //Modificación de estilos para mejorar la claridad
  table.style.border = "2px solid black";
  body.appendChild(table);
}
//Llamamos a la funcion
drawTable(body);

//Ejercicio 2: Modificar el estilo de la tabla.

//Añadimos las variables de los inputs
let styleTable = document.getElementById("styleTable");
let nonStyleTable = document.getElementById("nonStyleTable");

/**
 * Primera función , si pulsamos el primer boton de añadir estilo,
 * la tabla se añadira a la clase completada
 */
styleTable.addEventListener("click", function () {
  if (styleTable.checked) {
    table.classList.add("tablaModificada");
  }
});
/**
 * Lo contrario que la anterior función
 */

nonStyleTable.addEventListener("change", function () {
  if (nonStyleTable.checked) {
    table.classList.remove("tablaModificada");
  }
});

//Ejercicio 3 :
/**
 * Suma de ambos digitos y mostrarlos en pantalla a traves de
 * alert
 * @param firstNumber , @param secondNumber , @param btej3
 */
let firstNumber = document.getElementById("firstNumber");
let secondNumber = document.getElementById("secondNumber");
let btej3 = document.getElementById("btej3");

btej3.addEventListener("click", function () {
  if (firstNumber.value != "") {
    if (secondNumber.value != "") {
      alert(Number.parseInt(firstNumber.value) +Number.parseInt(secondNumber.value));
      flagej3=true;
    } else {
      alert("Falta el segundo numero ");
    } 
  }else{
    alert("Falta el primer numero");
  }
});

  //Ejercicio 4:
  /**
   * Realizar suma de ambos digitos pero en esta ocasión
   * mostrarlos a traves de una tabla con iiner.html
   * @param firstNumberej4 , @param secondNumberej4 , @param suma , @param contenedor
   */
document.getElementById('btej4').addEventListener('click', function () {
  let firstNumberej4 = Number(document.getElementById('firstNumberej4').value) || 0;
  let secondNumberej4 = Number(document.getElementById('secondNumberej4').value) || 0;
  let suma = firstNumberej4 + secondNumberej4;

//Div del html donde se va a guardar la tabla
  let contenedor = document.getElementById('resultadoTabla');
  contenedor.innerHTML =
    '<table>' +
      '<tr><th>Cuadro</th><th>Valor</th></tr>' +
      '<tr><td>Primer cuadro</td><td>' + firstNumberej4 + '</td></tr>' +
      '<tr><td>Segundo cuadro</td><td>' + secondNumberej4 + '</td></tr>' +
      '<tr><td><strong>Suma</strong></td><td><strong>' + suma + '</strong></td></tr>' +
    '</table>';
});

//Ejercicio 5:
/**
 * Al pulsar el boton , se cambiará el tamaño de la imagen con un predefinido
 * en este caso he usado un classList.toggle , para que si pulsas de nuevo el boton
 * cambie de clase , el cambio de tamaño esta regularizado por el mismo.
 * @param btej5 , @param imgNaruto 
 */
let btej5= document.getElementById("btej5")
let imgNaruto=document.getElementById("imgNaruto");
btej5.addEventListener("click", function(){
  imgNaruto.classList.toggle("tamañoPredifinido");
})

//Ejercicio 6:
/**
 * Mismo caso que el anterior , sin embargo sin classList.togle,
 * ya que el usuario podrá cambiar las dimensiones de la imagén cuando quiera
 * Gestionamos los nulos con el if .
 * @param width, @param height, @param btej6
 */
let btej6= document.getElementById("btej6")

btej6.addEventListener("click", function(){
  let width = Number(document.getElementById('width').value) || 0;
  let height = Number(document.getElementById('height').value) || 0;

  imgNaruto.style.width = width + "px";
  imgNaruto.style.height = height + "px";
})



