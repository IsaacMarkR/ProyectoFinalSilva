// Capturamos los elementos del HTML.
const numeroInput = document.getElementById("numeroInput");
const agregarNumeroButton = document.getElementById("agregarNumero");
const valoresIngresadosElement = document.getElementById("valoresIngresados");
const sumaElement = document.getElementById("suma");
const restaElement = document.getElementById("resta");
const multiplicacionElement = document.getElementById("multiplicacion");
const divisionElement = document.getElementById("division");

// Arrays para almacenar los números ingresados y resultados.
let numeros = [];
let resultados = {
    suma: [],
    resta: [],
    multiplicacion: [],
    division: []
};

// Función para actualizar el localStorage con los datos actuales.
function actualizarLocalStorage() {
    localStorage.setItem("numeros", JSON.stringify(numeros));
    localStorage.setItem("resultados", JSON.stringify(resultados));
}

// Cargar datos almacenados en el localStorage al cargar la página.
if (localStorage.getItem("numeros")) {
    numeros = JSON.parse(localStorage.getItem("numeros"));
}

if (localStorage.getItem("resultados")) {
    resultados = JSON.parse(localStorage.getItem("resultados"));
}

// Función para mostrar los resultados en el HTML.
function mostrarResultados() {
    valoresIngresadosElement.textContent = `Valores ingresados: ${numeros.join(', ')}`;
    sumaElement.textContent = `Suma: ${resultados.suma.join(', ')}`;
    restaElement.textContent = `Resta: ${resultados.resta.join(', ')}`;
    multiplicacionElement.textContent = `Multiplicación: ${resultados.multiplicacion.join(', ')}`;
    divisionElement.textContent = `División: ${resultados.division.join(', ')}`;
}

// Evento al hacer clic en el botón "Agregar".
agregarNumeroButton.addEventListener("click", function () {
    // Obtenemos el valor del input.
    const valor = parseFloat(numeroInput.value);

    // Verificamos si la entrada es un número válido.
    if (isNaN(valor)) {
        alert("Ingrese un número válido.");
        return;
    }

    // Agregamos el número al array.
    numeros.push(valor);

    // Actualizamos el localStorage.
    actualizarLocalStorage();

    // Mostramos los valores ingresados en el HTML.
    mostrarResultados();

    // Limpiamos el input.
    numeroInput.value = "";
});

// Evento al hacer clic en los botones de operación.
document.getElementById("sumar").addEventListener("click", function () {
    if (numeros.length < 2) {
        alert("Debe ingresar al menos dos números para sumar.");
        return;
    }

    // Realizamos la suma y almacenamos el resultado.
    const suma = numeros.reduce((a, b) => a + b);
    resultados.suma.push(suma);

    // Actualizamos el localStorage.
    actualizarLocalStorage();

    // Mostramos el resultado de la suma en el HTML.
    mostrarResultados();
});

document.getElementById("restar").addEventListener("click", function () {
    if (numeros.length < 2) {
        alert("Debe ingresar al menos dos números para restar.");
        return;
    }

    // Realizamos la resta y almacenamos el resultado.
    const resta = numeros.reduce((a, b) => a - b);
    resultados.resta.push(resta);

    // Actualizamos el localStorage.
    actualizarLocalStorage();

    // Mostramos el resultado de la resta en el HTML.
    mostrarResultados();
});

document.getElementById("multiplicar").addEventListener("click", function () {
    if (numeros.length < 2) {
        alert("Debe ingresar al menos dos números para multiplicar.");
        return;
    }

    // Realizamos la multiplicación y almacenamos el resultado.
    const multiplicacion = numeros.reduce((a, b) => a * b);
    resultados.multiplicacion.push(multiplicacion);

    // Actualizamos el localStorage.
    actualizarLocalStorage();

    // Mostramos el resultado de la multiplicación en el HTML.
    mostrarResultados();
});

document.getElementById("dividir").addEventListener("click", function () {
    if (numeros.length < 2) {
        alert("Debe ingresar al menos dos números para dividir.");
        return;
    }

    // Realizamos la división y almacenamos el resultado.
    const division = numeros.reduce((a, b) => a / b);
    resultados.division.push(division);

    // Actualizamos el localStorage.
    actualizarLocalStorage();

    // Mostramos el resultado de la división en el HTML.
    mostrarResultados();
});

// Mostramos los datos almacenados al cargar la página.
mostrarResultados();