import { cargarMonedas } from "./componentes/cargarMonedas.js";
import { formatearPrecioEnPesos } from "./componentes/formatearPrice.js";
import { fetchCreateTransaction, fetchGetCryptosPrice, fetchMonedas } from "./fetchs.js";

const $$ = el => document.getElementById(el);

// generar una transacción de compra o venta
async function generarUnaTransaccion() {
    const monedas = await fetchMonedas();

    const calcularMontoCompra = async () => {
        const moneda = $$('criptomoneda').value;
        const cantidad = parseFloat($$('cantidad-compra').value);

        if (!moneda || isNaN(cantidad)) {
            $$('monto-compra').textContent = '0.00000000';
            return;
        }

        $$('modal-estimacion').classList.remove('hidden');

        const monedaData = monedas.find(m => m.id == moneda);
        if (!monedaData) return;

        const priceMonedaSelected = await fetchGetCryptosPrice(monedaData.abreviatura);
        const monto = cantidad * priceMonedaSelected;

        $$('monto-compra').textContent = formatearPrecioEnPesos(monto);
    };

    $$('criptomoneda').addEventListener('change', calcularMontoCompra);
    $$('cantidad-compra').addEventListener('change', calcularMontoCompra);

    $$('btn-transaccion-compra').addEventListener('click', async (event) => {
        event.preventDefault();
        const fechaActual = new Date()
        const fechaLocal = new Date(fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000)
            .toISOString()
            .replace('Z', '');


        const cantidad = parseFloat($$('cantidad-compra').value);
        const moneda = $$('criptomoneda').value;

        if (isNaN(cantidad) || cantidad <= 0) {
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
            const res = await fetchCreateTransaction({ cantidad, moneda, fecha: fechaLocal, userId: 1 });

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
