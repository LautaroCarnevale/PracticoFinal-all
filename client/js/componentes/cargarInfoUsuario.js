import { fetchGetUser } from "../fetchs.js";
import { formatearPrecioEnPesos } from "./formatearPrice.js";

const $$ = el => document.getElementById(el);

const usuarioDesconocido = () => {
    $$('total-saldo').textContent = '$0.00';
    $$('nombreCompleto').textContent = 'Usuario Desconocido';
}

// Función para cargar la información del usuario en el header
async function cargarInfoUser() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (!userLocal) return usuarioDesconocido();
    const user = await fetchGetUser(userLocal.id);
    if (!user) return usuarioDesconocido();

    $$('total-saldo').textContent = `$${formatearPrecioEnPesos(user.saldo)}`;
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        $$('total-saldo-main').textContent = `$${formatearPrecioEnPesos(user.saldo)}`;
    }
    $$('nombreCompleto').textContent = `${userLocal.nombre} ${userLocal.apellido}`
}

export { cargarInfoUser }