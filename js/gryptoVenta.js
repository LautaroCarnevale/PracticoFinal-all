import { cargarMonedas } from "./componentes/cargarMonedas.js";
import { fetchCreateTransaction } from "./fetchs.js";

const $$ = el => document.getElementById(el);


// generar una transacción de venta
function generarUnaTransaccion() {
    const fechaActual = new Date();

    $$('btn-transaccion-venta').addEventListener('click', (event) => {
        event.preventDefault();

        const cantidadVenta = parseFloat($$('cantidad-venta').value);
        const moneda = $$('criptomoneda').value;

        if (isNaN(cantidadVenta)) {
            alert("Por favor, ingresa una cantidad válida.");
            return;
        }

        if (!moneda) {
            alert("Por favor, selecciona una criptomoneda.");
            return;
        }

        try {
           fetchCreateTransaction({ cantidad: -cantidadVenta, moneda, fecha: fechaActual, userId: 1 });            
        } catch (error) {
            alert(error.message);
        }
    });

}

cargarMonedas();
generarUnaTransaccion();