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