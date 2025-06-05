import { cargarMonedas } from "./componentes/cargarMonedas.js";
import { fetchCreateTransaction } from "./fetchs.js";

const $$ = el => document.getElementById(el);

// generar una transacción de compra o venta
function generarUnaTransaccion() {
    const fechaActual = new Date();

    $$('btn-transaccion-compra').addEventListener('click', async (event) => {
        event.preventDefault();

        const cantidad = parseFloat($$('cantidad').value);
        const moneda = $$('criptomoneda').value;

        if (isNaN(cantidad)) {
            Toastify({
                text: "Por favor, ingresa una cantidad válida.",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#FF0000",
                }
            }).showToast();
            return;
        }

        if (!moneda) {
            Toastify({
                text: "Por favor, selecciona una criptomoneda.",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#FF0000",
                }
            }).showToast();
            return;
        }

        try {
            const res = await fetchCreateTransaction({ cantidad, moneda, fecha: fechaActual, userId: 1 });

            Toastify({
                text: "Transacción de compra realizada con éxito",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#4CAF50",
                }
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.message,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#FF0000",
                }
            }).showToast();
        }
    });
}

cargarMonedas();
generarUnaTransaccion();
