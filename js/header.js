import { formatearPrecioEnPesos } from "./componentes/formatearPrice.js";
import { fetchSaldoUser } from "./fetchs.js";

const $$ = el => document.getElementById(el);

$$('logout').addEventListener('click', (event) => {
    event.preventDefault();
    swal({
        title: "Cerrar sesión",
        text: `¿Estás seguro de que deseas cerrar sesión?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then(async (willDelete) => {
            if (willDelete) {
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            } else {
                swal("No se ha cerrado sesión", {
                    icon: "info",
                });
            }
        });
});

async function cargarInfoUser() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (!userLocal) return
    const user = await fetchSaldoUser(userLocal.id);
    $$('total-saldo').textContent = `$${formatearPrecioEnPesos(user.saldo)}`;
    $$('nombreCompleto').textContent = `${userLocal.nombre} ${userLocal.apellido}`
}


cargarInfoUser()

export { cargarInfoUser }