import { cargarMonedas } from "./componentes/cargarMonedas.js";
import { fetchCreateTransaction, fetchMonedas } from "./fetchs.js";

const $$ = el => document.getElementById(el);

// generar una transacción de compra o venta
function generarUnaTransaccion() {
    const fechaActual = new Date();

    $$('btn-transaccion-compra').addEventListener('click', (event) => {
        event.preventDefault();

        const cantidad = parseFloat($$('cantidad').value);
        const moneda = $$('criptomoneda').value;

        if (isNaN(cantidad)) {
            alert("Por favor, ingresa una cantidad válida.");
            return;
        }

        if (!moneda) {
            alert("Por favor, selecciona una criptomoneda.");
            return;
        }

        try {
            fetchCreateTransaction({ cantidad, moneda, fecha: fechaActual, userId: 1 });
        } catch (error) {
            alert(error.message);
        }
    });
}
cargarMonedas();
generarUnaTransaccion();
