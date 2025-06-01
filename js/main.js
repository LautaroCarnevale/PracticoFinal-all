import { fetchTransactions, fetchMonedas } from './fetchs.js';
import { crearFila } from './transacciones.js';

const $$ = el => document.getElementById(el);

async function cargarTransacciones() {
    const data = await fetchTransactions();
    if (data === null) {
        const fila = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = "No se encontraron criptomonedas en tu portafolio.";
        td.colSpan = 3;
        td.classList.add("py-2", "text-gray-700", "text-center", "border-b", "border-gray-300");
        fila.appendChild(td);
        $$('tbody-transacciones').appendChild(fila);
        return;
    }

    for (const transaccion of data) {
        const tr = crearFila([transaccion.nombre, transaccion.totalCrypto, transaccion.totalPesos.totalBid], "border border-b border-gray-300");
        $$('tbody-transacciones').appendChild(tr);
    }
}

async function cargarMonedas() {
    const data = await fetchMonedas();
    console.log(data);

    if (data === null) return;
    for (const moneda of data) {
        const option = document.createElement('option');
        option.value = moneda.id;
        option.textContent = moneda.nombre + " (" + moneda.abreviatura + ")";
        $$('criptomoneda').appendChild(option);
    }
}

cargarTransacciones();
cargarMonedas();
