//validacion nombre

function validarNombre() {
  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
  const nombre = document.getElementById("nombre");
  let span = document.getElementById("info_nombre");
  if (nombre.value.length < 2) {
    span.innerHTML = `Debe tener dos letras`;
        return false;
  } else if (!soloLetras.test(nombre.value)) {
    span.innerHTML = `Solo se permiten letras `;
        return false;
  } else {
    span.innerHTML = "Nombre correcto";
    return true
  }
}

function validarDnia() {
  const dni = document.getElementById("dni").value;
  const info_dni = document.getElementById("info_dni");
  const pattern = /^[0-9]{8}[A-Za-z]$/;
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

  const numero = Number.parseInt(dni.substring(0, 8)); // los 8 primeros caracteres
  const letra = dni.charAt(8).toUpperCase(); // el noveno carácter
  const letraCorrecta = letras.charAt(numero % 23);

  if (!pattern.test(dni)) {
    info_dni.innerHTML = "Formato incorrecto";
        return false;
  } else if (letra !== letraCorrecta) {
    info_dni.innerHTML = "Letra incorrecta";
        return false;
  } else {
    info_dni.innerHTML = "DNI correcto";
        return true
  }
}

function validarSexo() {
  const sexo = document.getElementById("sexo");
  const info_sexo = document.getElementById("info_sexo");

  if (sexo.value == "") {
    info_sexo.innerHTML = "Se debe elegir";
        return false;

  } else {
    info_sexo.innerHTML = "Sexo correcto";
        return true
  }
}

function  validarSugerencia() {
  const sugerencia = document.getElementById("sugerencia");
  const info_sugerencia = document.getElementById("info_sugerencia");

  if (sugerencia.value == "") {
    info_sugerencia.innerHTML = "Sugerencia obligatoria";
    return false;
  } else {
    info_sugerencia.innerHTML = "sugerencia correcta";
        return true
  }
}

function validaFormulario1(){
    return validarNombre() && validarDni() && validarSexo() && validarSugerencia();
}
function validaFormulario0(event) {
  if (!validaFormulario()) {
    event.preventDefault();
  }
}