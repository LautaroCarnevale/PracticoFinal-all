import { fetchTransactions } from './fetchs.js';
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

cargarTransacciones();
