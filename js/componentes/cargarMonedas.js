import { fetchGryptos, fetchMonedas } from "../fetchs.js";

const $$ = el => document.getElementById(el);

//  Función para cargar las monedas en el select de compra y venta
async function cargarMonedas() {
    const monedas = await fetchMonedas();
    const criptomonedasCant = await fetchGryptos();
    $$('criptomoneda').innerHTML = '';
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Selecciona una criptomoneda';
    $$('criptomoneda').appendChild(option);
    if (monedas === null || monedas.length === 0) return;
    if (criptomonedasCant === null || criptomonedasCant.length === 0) return;
    for (const moneda of monedas) {
        const option = document.createElement('option');
        option.value = moneda.id;
        option.textContent = moneda.nombre + " (" + moneda.abreviatura + ")" + " - " + criptomonedasCant.find(c => c.id == moneda.id).totalCrypto;
        $$('criptomoneda').appendChild(option);
    }
}

export { cargarMonedas };