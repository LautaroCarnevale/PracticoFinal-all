import { fetchMonedas } from "./fetchs.js";
const $$ = el => document.getElementById(el);

async function cargarMonedas() {
    const data = await fetchMonedas();
    if (data === null) return;
    for (const moneda of data) {
        const option = document.createElement('option');
        option.value = moneda.id;
        option.textContent = moneda.nombre + " (" + moneda.abreviatura + ")";
        $$('criptomoneda').appendChild(option);
    }
}


cargarMonedas();