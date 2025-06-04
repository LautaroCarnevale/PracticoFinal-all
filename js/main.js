import { fetchTransactions, fetchCreateUser } from './fetchs.js';
import { crearFila } from './componentes/crearFila.js';

const $$ = el => document.getElementById(el);

async function cargarMyCryptos() {
    const data = await fetchTransactions();
    if (data === null) {
        const fila = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = "No se encontraron criptomonedas en tu portafolio.";
        td.colSpan = 3;
        td.classList.add("py-2", "text-gray-700", "text-center", "border-b", "border-gray-300");
        fila.appendChild(td);
        $$('tbody-portafolio').appendChild(fila);
        return;
    }

    for (const transaccion of data) {
        const tr = crearFila([transaccion.nombre, transaccion.totalCrypto, transaccion.totalCrypto, transaccion.totalPesos.totalBid], "border border-b border-gray-300");
        $$('tbody-portafolio').appendChild(tr);
    }
}


function modalCrearUsuario() {
    const userLocal = localStorage.getItem('user');

    $$('btn-registrarse').addEventListener('click', async (event) => {
        event.preventDefault();

        const nombre = $$('nombre').value;
        const apellido = $$('apellido').value;
        const email = $$('email').value;

        if (!nombre || !apellido || !email) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const user = { nombre, apellido, email, saldo: 1000000 };

        try {
            const data = await fetchCreateUser(user);

            localStorage.setItem('user', JSON.stringify(data));

            $$('modal').classList.add('hidden');
            $$('modal-registro').classList.add('hidden');

        } catch (error) {
            alert(error.message);
        }
    });

    if (!userLocal) {
        $$('modal').classList.remove('hidden');
        $$('modal-registro').classList.remove('hidden');
    }
}

modalCrearUsuario();
cargarMyCryptos();
