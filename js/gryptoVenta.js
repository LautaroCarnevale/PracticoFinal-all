import { cargarMonedas } from "./componentes/cargarMonedas.js";
import { formatearPrecioEnPesos } from "./componentes/formatearPrice.js";
import { fetchCreateTransaction, fetchGetCryptosPrice, fetchMonedas } from "./fetchs.js";

const $$ = el => document.getElementById(el);


// generar una transacción de venta
async function generarUnaTransaccion() {
    const monedas = await fetchMonedas();

    const calcularMontoVenta = async () => {
        const moneda = $$('criptomoneda').value;
        const cantidad = parseFloat($$('cantidad-venta').value);

        if (!moneda || isNaN(cantidad)) {
            $$('monto-venta').textContent = '0.00000000';
            return;
        }

        $$('modal-estimacion').classList.remove('hidden');

        const monedaData = monedas.find(m => m.id == moneda);
        if (!monedaData) return;

        const priceMonedaSelected = await fetchGetCryptosPrice(monedaData.abreviatura);
        const monto = cantidad * priceMonedaSelected;

        $$('monto-venta').textContent = formatearPrecioEnPesos(monto);
    };

    $$('criptomoneda').addEventListener('change', calcularMontoVenta);
    $$('cantidad-venta').addEventListener('change', calcularMontoVenta);

    $$('btn-transaccion-venta').addEventListener('click', async (event) => {
        event.preventDefault();
        const fechaActual = new Date()
        const fechaLocal = new Date(fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000)
            .toISOString()
            .replace('Z', '');
        const cantidadVenta = parseFloat($$('cantidad-venta').value);
        const moneda = $$('criptomoneda').value;


        if (!moneda) {
            Toastify({
                text: "Por favor, selecciona una criptomoneda.",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#FF0000",
                }
            }).showToast();
            return;
        }

        if (isNaN(cantidadVenta)) {
            Toastify({
                text: "Por favor, ingresa una cantidad válida.",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#FF0000",
                }
            }).showToast();
            return;
        }

        try {
            swal({
                title: " ¿Estás seguro de que quieres vender?",
                text: `Esta acción no se puede deshacer.`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        const res = await fetchCreateTransaction({ cantidad: -cantidadVenta, moneda, fecha: fechaActual, userId: 1 });
                        Toastify({
                            text: "Transacción de venta realizada con éxito",
                            duration: 3000,
                            gravity: "top",
                            position: "right",
                            style: {
                                background: "#4CAF50",
                            }
                        }).showToast();
                    } else {
                        swal("Tu transacción ha sido cancelada");
                    }
                });


        } catch (error) {
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

}

cargarMonedas();
generarUnaTransaccion();