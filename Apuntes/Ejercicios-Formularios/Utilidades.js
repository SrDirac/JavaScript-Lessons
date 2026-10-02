// Variables de control para el control de formularios 
let nombreCorrecto = false;
let apellidosCorrectos = false;
let dniCorrecto = false;
let sexoCorrecto = false;
let sexoCorrecto0 = false;
let sugerenciaCorrecta = false;
let fechaCorrecta = false;
let estaturaCorrecta = false;
let estadoCivilCorrecto = false;
let numeroBebidasCorrecto = false;
let validarCCCCorrecto = false;

// Selecciona los valores 
// @param nombre @param info_nombre
// Dentro de la función utilizamos una función para validar que 
// el nombre cumple con el patron requerido @param patron
// y modifica el valor de span respectivamente según los valores insertados 
function validarNombre() {
    let nombre = document.getElementById("nombre").value;
    let patron = /^[A-Za-zÁeéÍíÓóÚúÑñ\s]{2,}$/; 

    if (!patron.test(nombre)) {
        document.getElementById("info_nombre").innerHTML = "Nombre no válido";
        nombreCorrecto = false;
    } else {
        document.getElementById("info_nombre").innerHTML = "Nombre correcto";
        nombreCorrecto = true;
    }
}

// Selecciona los valores 
// @param apellidos @param info_apellidos 
// Dentro de la función utilizamos una función para validar que 
// el nombre cumple con el patron requerido @param patron
// y modifica el valor de span respectivamente según los valores insertados
function validarApellidos() {
    let apellidos = document.getElementById("apellidos").value;
    let patron = /^[A-Za-zÁeéÍíÓóÚúÑñ\s]{4,}$/;

    if (!patron.test(apellidos)) {
        document.getElementById("info_apellidos").innerHTML = "Apellidos incorrectos, mínimo 4 letras";
        apellidosCorrectos = false;
    } else {
        document.getElementById("info_apellidos").innerHTML = "Apellidos correctos";
        apellidosCorrectos = true;
    }
}

// Selecciona los valores 
// @param dni @param info_dni 
// Dentro de la función utilizamos una función para validar que 
// el nombre cumple con el patron requerido @param patron
// y modifica el valor de span respectivamente según los valores insertados
function validardDni() {
    let info_dni = document.getElementById("info_dni");
    let dni = document.getElementById("dni").value.trim();
    let patron = /^\d{8}[A-Za-z]$/;

    if (patron.test(dni)) {
        let letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
        let resto = parseInt(dni.substring(0, 8), 10) % 23;
        let letraIntroducida = dni.substring(8).toUpperCase();

        if (letraIntroducida === letrasValidas[resto]) {
            info_dni.innerHTML = "DNI correcto";
            dniCorrecto = true;
        } else {
            info_dni.innerHTML = "DNI incorrecto, la letra no coincide";
            dniCorrecto = false;
        }
    } else {
        info_dni.innerHTML = "DNI incorrecto (Ej: 12345678A)";
        dniCorrecto = false;
    }
}
// Selecciona los inputs de las fechas f_dia , f_mes , f_ano
// Contruimos un objeto Date a = new Date (f_dia, f_mes , f_ano)
// Accedemos a las funciones de date para veríficar que la fecha  es correcta
// modificamos los valores de info_fecha según los valores insertados
function validarFecha() {
    let f_dia = document.getElementById("f_dia").value;
    let f_mes = document.getElementById("f_mes").value;
    let f_ano = document.getElementById("f_ano").value;
    let info_fecha = document.getElementById("info_fecha");

    if (f_dia !== "" && f_mes !== "" && f_ano !== "") {
        let dia = parseInt(f_dia, 10);
        let mes = parseInt(f_mes, 10);
        let ano = parseInt(f_ano, 10);

        let fecha = new Date(ano, mes - 1, dia);

        if (fecha.getFullYear() === ano && fecha.getMonth() === (mes - 1) && fecha.getDate() === dia) {
            info_fecha.innerHTML = "Fecha correcta";
            fechaCorrecta = true;
        } else {
            info_fecha.innerHTML = "Fecha incorrecta";
            fechaCorrecta = false;
        }
    } else {
        info_fecha.innerHTML = "Faltan valores";
        fechaCorrecta = false;
    }
}
// Funcion que valida el sexo de los select radio 
// Utilizamos un for para recorrer todos los elementos sexo
// Si alguno esta validado (.checked) @return true  
// modifica el span según los valores insertados 
function validarSexo() {
    let inputsSexos = document.getElementsByName("sexo");
    for (let inputsSexo of inputsSexos) {
        if (inputsSexo.checked) {
            document.getElementById("info_sexo").innerHTML = ""; // Limpiamos error previo
            sexoCorrecto = true;
            return true;
        }
    }
    document.getElementById("info_sexo").innerHTML = "Debe seleccionar algún sexo";
    sexoCorrecto = false;
    return false;
}
// Comprueba que la estatura insertada cumpla con los requísitos del form
// No se permiten valores nulos 
// Utilizamos el parseFloat para normalizar los valores obtenidos utilizando a su vez un patrón 
function validarEstatura() {
    let inputEstatura = document.getElementById("estatura");
    let valor = inputEstatura.value.trim();
    let error = document.getElementById("info_estatura");

    if (valor === "") {
        error.innerHTML = "Estatura Obligatoria.";
        estaturaCorrecta = false;
        return false;
    }

    let valorNormalizado = valor.replace(",", ".");
    let numero = parseFloat(valorNormalizado);

    let patronEstatura = /^[0-9]+([.,][0-9]+)?$/;
    if (!patronEstatura.test(valor) || isNaN(numero) || numero < 0.50 || numero > 2.50) {
        error.innerHTML = "Debe ser un número decimal entre 0,50 y 2,50 metros.";
        estaturaCorrecta = false;
        return false;
    }

    error.innerHTML = "";
    estaturaCorrecta = true;
    return true;
}
// Selecciona el html del documento @param estado_civil
// si marca -1  devuelve falso, obligando al usuario a cambiar de valor
function validarEstadoCivil() {
    let selectEstado = document.getElementById("estado_civil");

    if (selectEstado.value === "-1") {
        document.getElementById("info_estado_civil").innerHTML = "No puede quedar en «Selecciona una opción».";
        estadoCivilCorrecto = false;
        return false;
    }

    document.getElementById("info_estado_civil").innerHTML = "";
    estadoCivilCorrecto = true;
    return true;
}
// Valida la selección de las bebidas 
// Selecciona todos los elementos de bebidas y 
// con un bucle for revisa continuamente cuantas bebidas se han marcado
// obligando al usuario a que marque 3 obligatoriamente 
function validarBebidas() {
    let checkboxes = document.getElementsByName("bebidas");
    let marcadas = 0;

    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            marcadas++;
        }
    }

    document.getElementById("info_bebidas").innerHTML = "Llevas marcadas " + marcadas + " opciones.";

    if (marcadas < 3) {
        document.getElementById("info_bebidas").innerHTML += " Hay que marcar al menos 3 casillas.";
        numeroBebidasCorrecto = false;
        return false;
    }
    numeroBebidasCorrecto = true;
    return true;
}
// Valida la cuenta bancaria obligando a cumplir el patrón declarado 
// en la función , si no lo cumple --> return false 
function validarCCC() {
    let inputCCC = document.getElementById("ccc");
    let valor = inputCCC.value;
    let patronCCC = /^\d{20}$/;

    if (!patronCCC.test(valor)) {
        document.getElementById("info_ccc").innerHTML = "Obligatoria. Exactamente 20 dígitos, sin espacios ni letras.";
        validarCCCCorrecto = false;
        return false;
    }

    document.getElementById("info_ccc").innerHTML = "";
    validarCCCCorrecto = true;
    return true;
}
// Validador de que sugerencia cumple el formato establecido , no puede estar 
// en blanco 
function validarSugerencia() {
    let txtSugerencia = document.getElementById("sugerencia");

    if (txtSugerencia.value.trim() === "") {
        document.getElementById("info_sugerencia").innerHTML = "Sugerencia Obligatoria.";
        sugerenciaCorrecta = false; // Corregido: antes no cambiaba la variable global
        return false;
    }

    document.getElementById("info_sugerencia").innerHTML = "";
    sugerenciaCorrecta = true; // Corregido: ahora cambia a true si pasa el filtro
    return true;
}
// Validador de sexo (primer html de formmulario), si es "" es incorrecto
// el usuario deberá elegir un valor que no sea la opción por defecto
function validarSexo0() {
    let info_sexo = document.getElementById("info_sexo");
    let select = document.getElementById("sexo").value;
    if (select === "") {
        info_sexo.innerHTML = "Opción incorrecta";
        sexoCorrecto0 = false;
    } else {
        info_sexo.innerHTML = "Opción correcta";
        sexoCorrecto0 = true;
    }
}

// FORMULARIO PRINCIPAL (html 2)
// Pasamos las variables de control necesarias para la validación 
function validaFormulario(event) {
    validarNombre();
    validarApellidos();
    validardDni();
    validarSexo();
    validarSugerencia();
    validarFecha();
    validarBebidas();
    validarCCC();
    validarEstadoCivil();

    if (nombreCorrecto && apellidosCorrectos && dniCorrecto && sexoCorrecto && sugerenciaCorrecta && fechaCorrecta && numeroBebidasCorrecto && validarCCCCorrecto && estadoCivilCorrecto) {
        alert("El formulario ha sido enviado correctamente.");
        return true;
    } else {
        alert("El formulario contiene errores en algunos de los campos.");
        event.preventDefault();
        return false;
    }
}

// FORMULARIO 0 (primer html)
// Pasamos las variables de control necesarias para la validación 
function validaFormulario0(event) { // Corregido: añadido parámetro (event)
    validarNombre();
    validardDni();
    validarSexo0();
    validarSugerencia();

    if (nombreCorrecto && dniCorrecto && sexoCorrecto0 && sugerenciaCorrecta) {
        alert("El formulario ha sido enviado correctamente.");
        return true;
    } else {
        alert("El formulario contiene errores en algunos de los campos.");
        event.preventDefault();
        return false;
    }
}

// FORMULARIO 1(segundo html)
// Pasamos las variables de control necesarias para la validación 
function validaFormulario1(event) {
    validarNombre();
    validarApellidos();
    validardDni();
    validarSexo0();
    validarSugerencia();
    validarFecha();

    if (nombreCorrecto && apellidosCorrectos && dniCorrecto && sexoCorrecto0 && sugerenciaCorrecta && fechaCorrecta) {
        alert("El formulario ha sido enviado correctamente.");
        return true;
    } else {
        alert("El formulario contiene errores en algunos de los campos.");
        event.preventDefault(); 
        return false;
    }
}
