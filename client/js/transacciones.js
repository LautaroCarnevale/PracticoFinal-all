import { crearFila } from "./componentes/crearFila.js";
import { fetchGetTransaction, fetchTransactions } from "./fetchs.js";
const $$ = el => document.getElementById(el);

// Función para cargar las transacciones en una tabla
async function cargarMyTransactions() {
    try {
        const data = await fetchTransactions();

        if (data === null || data.length === 0) {
            const fila = document.createElement('tr');
            const td = document.createElement('td');
            td.textContent = "No se encontraron transacciones.";
            td.colSpan = 5;
            td.classList.add("py-2", "text-gray-700", "text-center", "border-b", "border-gray-300");
            fila.appendChild(td);
            $$('tbody-transacciones').appendChild(fila);
            return;
        }
        for (const transaccion of data) {
            transaccion.fecha = new Date(transaccion.fecha).toLocaleString('es-ES');

            const estado = transaccion.cantidad > 0 ? "Compra" : "Venta";

            const tr = crearFila([transaccion.moneda.nombre, transaccion.cantidad, estado, transaccion.fecha, transaccion.id]);
            $$('tbody-transacciones').appendChild(tr);
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para cerrar el modal
function cerrarInfo() {
    $$('cerrar-modal-info').addEventListener('click', () => {
        $$('modal-info').classList.add('hidden');
    });
}

// Función para obtener la información de una transacción por su ID
async function ObtenerTransaccionById() {
    try {
        document.addEventListener('click', async (e) => {
            const boton = e.target.closest('.ver-transaccion-btn');
            if (!boton) return;

            const id = boton.getAttribute('data-id');
            if (!id) return;
            const data = await fetchGetTransaction(id);
            if (!data) return;
            $$('modal-info').classList.remove('hidden');

            const fecha = new Date(data.fecha).toLocaleString('es-ES');
            data.fecha = fecha;

            let info = `
  <div class="mb-3">
    <p class="font-semibold text-gray-800">Moneda</p>
    <p class="text-gray-600">${data.moneda.nombre}</p>
  </div>
  <div class="mb-3">
    <p class="font-semibold text-gray-800">Cantidad</p>
    <p class="text-gray-600">${data.cantidad}</p>
  </div>
  <div class="mb-3">
    <p class="font-semibold text-gray-800">Estado</p>
    <p class="text-gray-600">${data.cantidad > 0 ? "Compra" : "Venta"}</p>
  </div>
  <div class="mb-3">
    <p class="font-semibold text-gray-800">Fecha</p>
    <p class="text-gray-600">${data.fecha}</p>
  </div>
`;

            $$('info-transaccion').innerHTML = info;
        });
    } catch (error) {
        console.log(error);
    }
}
cerrarInfo();
ObtenerTransaccionById();
cargarMyTransactions();