import { fetchGryptos, fetchCreateUser, fetchGetCryptosPrice, fetchSaldoUser } from './fetchs.js';
import { crearFila } from './componentes/crearFila.js';
import { formatearPrecioEnPesos } from './componentes/formatearPrice.js';

const $$ = el => document.getElementById(el);


// Función para cargar las criptomonedas del portafolio del usuario
async function cargarMyCryptos() {
    const data = await fetchGryptos();
    if (data === null || data.length === 0) {
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
        const totalPesosFormateado = formatearPrecioEnPesos(totalEnPesos);

        const tr = crearFila([
            transaccion.nombre,
            transaccion.totalCrypto,
            `$${totalPesosFormateado}`,
        ]);
        totalPesos += totalEnPesos;
        $$('tbody-portafolio').appendChild(tr);
    }

    $$('total-valor').textContent = ` $${formatearPrecioEnPesos(totalPesos)}`;
}

// Función para crear un modal de registro de usuario
function modalCrearUsuario() {
    const userLocal = localStorage.getItem('user');


    $$('btn-registrarse').addEventListener('click', async (event) => {
        event.preventDefault();
        $$('error-nombre').textContent = '';
        $$('error-apellido').textContent = '';
        $$('error-email').textContent = '';

        const nombre = $$('nombre').value.trim();
        const apellido = $$('apellido').value.trim();
        const email = $$('email').value.trim();

        if (!nombre) return $$('error-nombre').textContent = 'Por favor, ingresa tu nombre.';
        if (!apellido) return $$('error-apellido').textContent = 'Por favor, ingresa tu apellido.';
        if (!email) return $$('error-email').textContent = 'Por favor, ingresa tu email.';


        // Validación simple de email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return $$('error-email').textContent = 'Por favor, ingresa un correo electrónico válido.';
        }

        const user = { nombre, apellido, email };

        try {
            const data = await fetchCreateUser(user);

            if (data === null) {
                Toastify({
                    text: "Error al crear el usuario. Por favor, inténtalo de nuevo.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "#FF0000",
                    }
                }).showToast();
            }

            localStorage.setItem('user', JSON.stringify({
                id: data.id,
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
            }));

            $$('modal').classList.add('hidden');
            $$('modal-registro').classList.add('hidden');
        } catch (error) {
            $$(error.type).textContent = error.message;

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

    if (!userLocal) {
        $$('modal').classList.remove('hidden');
        $$('modal-registro').classList.remove('hidden');
    }
}

async function cargarSaldoUser() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if(!userLocal) return
    const user = await fetchSaldoUser(userLocal.id);
    $$('total-saldo').textContent = `$${formatearPrecioEnPesos(user.saldo)}`;

}


cargarSaldoUser()
modalCrearUsuario();
cargarMyCryptos();
