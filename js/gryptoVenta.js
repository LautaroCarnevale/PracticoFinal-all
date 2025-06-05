import { cargarMonedas } from "./componentes/cargarMonedas.js";
import { fetchCreateTransaction } from "./fetchs.js";

const $$ = el => document.getElementById(el);


// generar una transacción de venta
function generarUnaTransaccion() {
    const fechaActual = new Date();

    $$('btn-transaccion-venta').addEventListener('click', async (event) => {
        event.preventDefault();

        const cantidadVenta = parseFloat($$('cantidad-venta').value);
        const moneda = $$('criptomoneda').value;

        if (isNaN(cantidadVenta)) {
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
            const res = await fetchCreateTransaction({ cantidad: -cantidadVenta, moneda, fecha: fechaActual, userId: 1 });
            Toastify({
                text: "Transacción de venta realizada con éxito",
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