import { fetchGryptos, fetchCreateUser, fetchGetCryptosPrice } from './fetchs.js';
import { crearFila } from './componentes/crearFila.js';
import { formatearPrecioEnPesos } from './componentes/formatearPrice.js';
import { typeToast } from './componentes/Toast.js';
import { cargarInfoUser } from './componentes/cargarInfoUsuario.js';

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

// Función para administrar un modal de registro de usuario
function modalCrearUsuario() {
    const userLocal = localStorage.getItem('user');

    // evento para cerrar el modal de registro y crear un nuevo usuario
    $$('btn-registrarse').addEventListener('click', async (event) => {
        event.preventDefault();

        $$('error-nombre').textContent = '';
        $$('error-apellido').textContent = '';
        $$('error-email').textContent = '';

        const nombre = $$('nombre').value.trim();
        const apellido = $$('apellido').value.trim();
        const email = $$('email').value.trim();

        //validaciones
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

            if (data === null) return typeToast('#FF0000', 'Error al crear el usuario. Por favor, inténtalo de nuevo.');

            // Si el usuario ya se encuentra registrado
            if (data.type == "error-email") {
                swal({
                    title: "Usario ya registrado",
                    text: `El usuario ${data.user.email} ya se encuentra registrado. ¿Deseas iniciar sesión con ese usuario?`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then(async (willDelete) => {

                        // Si el usuario desea iniciar sesión con el usuario ya registrado
                        if (willDelete) {
                            localStorage.setItem('user', JSON.stringify({
                                id: data.user.id,
                                nombre: data.user.nombre,
                                apellido: data.user.apellido,
                                email: data.user.email,
                            }));
                            $$('modal').classList.add('hidden');
                            $$('modal-registro').classList.add('hidden');
                            cargarInfoUser();
                            return;
                        }
                    });
            }
            localStorage.setItem('user', JSON.stringify({
                id: data.user.id,
                nombre: data.user.nombre,
                apellido: data.user.apellido,
                email: data.user.email,
            }));
            $$('modal').classList.add('hidden');
            $$('modal-registro').classList.add('hidden');

            cargarInfoUser();
        } catch (error) {
            $$(error.type).textContent = error.message;
            typeToast('#FF0000', error.message);
        }
    });

    if (!userLocal) {
        $$('modal').classList.remove('hidden');
        $$('modal-registro').classList.remove('hidden');
    }
}


modalCrearUsuario();
cargarMyCryptos();
