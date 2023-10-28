document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '10f3b5da601139864e28d0c0'; // Tu clave de API de ExchangeRate-API
    const numeroInput = document.getElementById("numeroInput");
    const agregarNumeroButton = document.getElementById("agregarNumero");
    const resultsList = document.getElementById("resultsList");
    const mathButton = document.getElementById("calcularMath");

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

    mathButton.addEventListener("click", function () {
        const expresion = prompt("Ingrese una expresión matemática (por ejemplo, '2 * (3 + 4)'):");

        try {
            const resultado = math.evaluate(expresion);
            const li = document.createElement("li");
            li.textContent = `Resultado de la expresión: ${expresion} = ${resultado}`;
            resultsList.appendChild(li);
        } catch (error) {
            alert("La expresión ingresada es inválida.");
        }
    });

    function obtenerTasasDeCambio() {
        return new Promise((resolve, reject) => {
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Error en la solicitud de tasas de cambio.");
                    }
                })
                .then(data => {
                    if (data && data.conversion_rates) {
                        resolve(data.conversion_rates);
                    } else {
                        throw new Error("Datos de tasas de cambio no válidos.");
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    function convertirMoneda(monto, monedaOrigen, monedaDestino) {
        return obtenerTasasDeCambio()
            .then(rates => {
                const tasaOrigen = rates[monedaOrigen];
                const tasaDestino = rates[monedaDestino];

                if (tasaOrigen && tasaDestino) {
                    const resultado = (monto / tasaOrigen) * tasaDestino;
                    return resultado;
                } else {
                    throw new Error("Moneda no encontrada en las tasas de cambio.");
                }
            });
    }

    // Ejemplo de uso:
    convertirMoneda(100, 'USD', 'EUR')
        .then(resultado => {
            const li = document.createElement("li");
            li.textContent = `100 USD = ${resultado.toFixed(2)} EUR`;
            resultsList.appendChild(li);
        })
        .catch(error => {
            console.error("Error en la conversión de moneda:", error);
        });
});