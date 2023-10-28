document.addEventListener("DOMContentLoaded", function () {
    const numeroInput = document.getElementById("numeroInput");
    const agregarNumeroButton = document.getElementById("agregarNumero");
    const resultsList = document.getElementById("resultsList");

    const numeros = [];

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
    });

    const operaciones = ["Sumar", "Restar", "Multiplicar", "Dividir"];
    
    operaciones.forEach((operacion) => {
        const button = document.createElement("button");
        button.textContent = operacion;
        button.addEventListener("click", function () {
            if (numeros.length < 2) {
                alert(`Debe ingresar al menos dos números para ${operacion.toLowerCase()}.`);
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