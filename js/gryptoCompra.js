import { cargarMonedas } from "./componentes/cargarMonedas.js";
import { formatearPrecioEnPesos } from "./componentes/formatearPrice.js";
import { typeToast } from "./componentes/Toast.js";
import { fetchCreateTransaction, fetchGetCryptosPrice, fetchMonedas } from "./fetchs.js";

const $$ = el => document.getElementById(el);

// generar una transacción de compra o venta
async function generarUnaTransaccion() {
    const monedas = await fetchMonedas();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!monedas) return;
    if (!user) return typeToast('#FF0000', 'No tienes una cuenta de usuario. Por favor, crea una.');
    // Función para calcular el monto de compra y mostrarlo en html
    const calcularMontoCompra = async () => {
        const moneda = $$('criptomoneda').value;
        const cantidad = parseFloat($$('cantidad-compra').value);

        if (!moneda || isNaN(cantidad)) return $$('monto-compra').textContent = '0.00000000';

        $$('modal-estimacion').classList.remove('hidden');

        const monedaData = monedas.find(m => m.id == moneda);
        if (!monedaData) return;

        const priceMonedaSelected = await fetchGetCryptosPrice(monedaData.abreviatura);
        const monto = cantidad * priceMonedaSelected;

        $$('monto-compra').textContent = formatearPrecioEnPesos(monto);
    };

    // Evento para escuchar el select de criptomonedas y su valor de cantidad
    $$('criptomoneda').addEventListener('change', calcularMontoCompra);
    $$('cantidad-compra').addEventListener('input', calcularMontoCompra);

    // Evento para crear la transacción
    $$('btn-transaccion-compra').addEventListener('click', async (event) => {
        event.preventDefault();
        const fechaActual = new Date();

        // Convertir la fecha actual a la zona horaria del usuario
        const fechaLocal = new Date(fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000)
            .toISOString()
            .replace('Z', '');

        const cantidad = parseFloat($$('cantidad-compra').value);
        const moneda = $$('criptomoneda').value;

        // Validaciones
        if (isNaN(cantidad) && cantidad > 0) return typeToast('#FF0000', 'Por favor, ingresa una cantidad válida.');
        if (!moneda) return typeToast('#FF0000', 'Por favor, selecciona una criptomoneda.');


        const monedaData = monedas.find(m => m.id == moneda);
        if (!monedaData) return typeToast('#FF0000', 'Por favor, selecciona una criptomoneda.');

        try {
            // Obtener el precio de una criptomoneda y cargarlo en al transacción
            const priceMonedaSelected = await fetchGetCryptosPrice(monedaData.abreviatura);
            const precio = cantidad * priceMonedaSelected;

            // Crear la transacción
            const res = await fetchCreateTransaction({
                cantidad,
                moneda,
                precio,
                fecha: fechaLocal,
                userId: user.id
            });
            cargarMonedas();
            typeToast('#4CAF50', 'Transacción de compra realizada con éxito');
        } catch (error) {
            typeToast('#FF0000', error.message);
        }
    });
}
// Llamada a las funciones
cargarMonedas();
generarUnaTransaccion();

