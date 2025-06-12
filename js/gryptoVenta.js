import { cargarMonedas } from "./componentes/cargarMonedas.js";
import { formatearPrecioEnPesos } from "./componentes/formatearPrice.js";
import { typeToast } from "./componentes/Toast.js";
import { fetchCreateTransaction, fetchGetCryptosPrice, fetchMonedas } from "./fetchs.js";

const $$ = el => document.getElementById(el);


// generar una transacción de venta
async function generarUnaTransaccion() {
    const monedas = await fetchMonedas();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!monedas) return;
    if (!user) return typeToast('#FF0000', 'No tienes una cuenta de usuario. Por favor, crea una.');

    // Función para calcular el monto de venta y mostrarlo en html
    const calcularMontoVenta = async () => {
        const moneda = $$('criptomoneda').value;
        const cantidad = parseFloat($$('cantidad-venta').value);

        if (!moneda || isNaN(cantidad)) return $$('monto-venta').textContent = '0.00000000';

        $$('modal-estimacion').classList.remove('hidden');

        const monedaData = monedas.find(m => m.id == moneda);
        if (!monedaData) return;

        const priceMonedaSelected = await fetchGetCryptosPrice(monedaData.abreviatura);
        const monto = cantidad * priceMonedaSelected;

        $$('monto-venta').textContent = formatearPrecioEnPesos(monto);
    };

    // Evento para escuchar el select de criptomonedas y su valor de cantidad
    $$('criptomoneda').addEventListener('change', calcularMontoVenta);
    $$('cantidad-venta').addEventListener('input', calcularMontoVenta);

    // Evento para crear la transacción
    $$('btn-transaccion-venta').addEventListener('click', async (event) => {
        event.preventDefault();
        const fechaActual = new Date()

        // Convertir la fecha actual a la zona horaria del usuario
        const fechaLocal = new Date(fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000)
            .toISOString()
            .replace('Z', '');
        const cantidadVenta = parseFloat($$('cantidad-venta').value);
        const moneda = $$('criptomoneda').value;

        // Validaciones 
        if (!moneda) return typeToast('#FF0000', 'Por favor, selecciona una criptomoneda.');
        if (isNaN(cantidadVenta) && cantidadVenta > 0) return typeToast('#FF0000', 'Por favor, ingresa una cantidad.');


        try {
            // Alerta de confirmación de venta
            const willDelete = await swal({
                title: `Estas seguro de vender ${cantidadVenta} ${monedas.find(m => m.id == moneda).nombre}?`,
                text: `Esta acción no se puede deshacer.`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });

            // Realizar la venta
            if (willDelete) {
                const monedaData = monedas.find(m => m.id == moneda);
                if (!monedaData) return;

                // Calcular el precio de la venta
                const priceMonedaSelected = await fetchGetCryptosPrice(monedaData.abreviatura);
                if (!priceMonedaSelected) return;
                const precio = cantidadVenta * priceMonedaSelected;


                // Realizar la venta
                const res = await fetchCreateTransaction({
                    cantidad: -cantidadVenta,
                    moneda,
                    fecha: fechaLocal,
                    precio: -precio,
                    userId: user.id
                });
                cargarMonedas();
                typeToast('#4CAF50', 'Transacción de venta realizada con éxito');
            } else {
                swal("Tu transacción ha sido cancelada");
            }

        } catch (error) {
            typeToast('#FF0000', error.message || "Ocurrió un error");
        }
    });
}

// Llamada a las funciones
cargarMonedas();
generarUnaTransaccion();
