import { crearFila } from "./componentes/crearFila.js";
import { fetchTransactions } from "./fetchs.js";
const $$ = el => document.getElementById(el);

async function cargarMyTransactions() {
    const data = await fetchTransactions();
    
    if (data === null || data.length === 0) {
        const fila = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = "No se encontraron transacciones.";
        td.colSpan = 4;
        td.classList.add("py-2", "text-gray-700", "text-center", "border-b", "border-gray-300");
        fila.appendChild(td);
        $$('tbody-transacciones').appendChild(fila);
        return;
    }
    for (const transaccion of data) {
        transaccion.fecha = new Date(transaccion.fecha).toLocaleString('es-ES');

        const estado = transaccion.cantidad > 0 ? "Compra" : "Venta";

        const tr = crearFila([transaccion.moneda.nombre, transaccion.cantidad, estado, transaccion.fecha]);
        $$('tbody-transacciones').appendChild(tr);
    }
}

cargarMyTransactions();