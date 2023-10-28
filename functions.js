document.addEventListener("DOMContentLoaded", function () {
    const numeroInput = document.getElementById("numeroInput");
    const agregarNumeroButton = document.getElementById("agregarNumero");
    const resultsList = document.getElementById("resultsList");

    const numeros = [];
    let operacionesHabilitadas = false; // Variable para rastrear si se pueden realizar operaciones.

    agregarNumeroButton.addEventListener("click", function () {
        const valor = parseFloat(numeroInput.value);

        if (isNaN(valor)) {
            alert("Ingrese un número válido.");
            return;
        }

        numeros.push(valor);
        numeroInput.value = "";

        const li = document.createElement("li");
        li.textContent = `Número ingresado: ${valor}`;
        resultsList.appendChild(li);

        // Habilitar las operaciones cuando se ingresen al menos dos valores.
        if (numeros.length >= 2) {
            operacionesHabilitadas = true;
        }
    });

    const operaciones = ["Sumar", "Restar", "Multiplicar", "Dividir"];
    
    operaciones.forEach((operacion) => {
        const button = document.createElement("button");
        button.textContent = operacion;
        button.addEventListener("click", function () {
            if (!operacionesHabilitadas) {
                alert("Ingrese al menos dos números antes de realizar operaciones.");
                return;
            }

            let resultado;
            switch (operacion) {
                case "Sumar":
                    resultado = numeros.reduce((a, b) => a + b);
                    break;
                case "Restar":
                    resultado = numeros.reduce((a, b) => a - b);
                    break;
                case "Multiplicar":
                    resultado = numeros.reduce((a, b) => a * b);
                    break;
                case "Dividir":
                    resultado = numeros.reduce((a, b) => a / b);
                    break;
            }

            const li = document.createElement("li");
            li.textContent = `${operacion}: ${resultado}`;
            resultsList.appendChild(li);
        });

        document.querySelector(".operations").appendChild(button);
    });
});