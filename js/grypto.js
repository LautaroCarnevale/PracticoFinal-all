import { fetchCreateTransaction, fetchMonedas } from "./fetchs.js";
const $$ = el => document.getElementById(el);

//  Función para cargar las monedas en el select de compra y venta
async function cargarMonedas() {
    const data = await fetchMonedas();
    if (data === null) return;
    for (const moneda of data) {
        const option = document.createElement('option');
        option.value = moneda.id;
        option.textContent = moneda.nombre + " (" + moneda.abreviatura + ")";
        $$('criptomoneda').appendChild(option);
    }
}


function generarUnaTransaccion() {
    const fechaActual = new Date();


    $$('btn-transaccion').addEventListener('click', async (event) => {
        event.preventDefault();

        const cantidad = parseFloat($$('cantidad').value);
        const moneda = $$('criptomoneda').value;

        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, ingresa una cantidad válida.");
            return;
        }

        if (!moneda) {
            alert("Por favor, selecciona una criptomoneda.");
            return;
        }

        try {
            const data = await fetchCreateTransaction({ cantidad, moneda, fecha: fechaActual, userId: 1 });
            alert("Transacción creada exitosamente: " + data.id);
        } catch (error) {
            alert(error.message);
        }
    });

}

generarUnaTransaccion();
cargarMonedas();