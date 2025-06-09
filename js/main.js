import { fetchGryptos, fetchCreateUser, fetchGetCryptosPrice } from './fetchs.js';
import { crearFila } from './componentes/crearFila.js';
import { formatearPrecioEnPesos } from './componentes/formatearPrice.js';

const $$ = el => document.getElementById(el);

async function cargarMyCryptos() {
    const data = await fetchGryptos();
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
    let totalPesos = 0;
    for (const transaccion of data) {
        let totalEnPesos = 0;
     
        if (transaccion.totalCrypto > 0) {
            const precioActual = await fetchGetCryptosPrice(transaccion.abreviatura);
            totalEnPesos = precioActual ? precioActual * transaccion.totalCrypto : 0;
        }

        const totalCryptoFormateado = transaccion.totalCrypto.toLocaleString('es-AR');
        const totalPesosFormateado = formatearPrecioEnPesos(totalEnPesos);

        const tr = crearFila([
            transaccion.nombre,
            totalCryptoFormateado,
            `$${totalPesosFormateado}`,
        ]);
           totalPesos += totalEnPesos;
        $$('tbody-portafolio').appendChild(tr);
    }
    console.log(`Total en pesos: $${formatearPrecioEnPesos(totalPesos)}`);
    $$('total-valor').textContent = ` $${formatearPrecioEnPesos(totalPesos)}`;
    
}

// Función para crear un modal de registro de usuario
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

            localStorage.setItem('user', JSON.stringify({
                id: data.id,
                nombre: data.nombre,
                apellido: data.apellido,
            }));

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
