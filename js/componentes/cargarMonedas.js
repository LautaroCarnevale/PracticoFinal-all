import { fetchGryptos, fetchMonedas } from "../fetchs.js";

const $$ = el => document.getElementById(el);

// Función para limpiar el select
function limpiarSelect() {
    $$('criptomoneda').innerHTML = '';
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Selecciona una criptomoneda';
    $$('criptomoneda').appendChild(option);
}

//  Función para cargar las monedas en el select de compra y venta
async function cargarMonedas() {
    try {
        
        // obtenemos los nomrbes de las monedas(cryptomonedas)
        const monedas = await fetchMonedas();
        // obtenemos las criptomonedas del usuario y sus cantidades
        const criptomonedasCant = await fetchGryptos();
        ;
        limpiarSelect();
        if (monedas === null || monedas.length === 0) return typeToast;
        if (criptomonedasCant === null || criptomonedasCant.length === 0) return;


        for (const moneda of monedas) {
            const option = document.createElement('option');
            option.value = moneda.id;
            option.textContent = moneda.nombre + " (" + moneda.abreviatura + ")" + " - " + criptomonedasCant.find(c => c.id == moneda.id).totalCrypto;
            $$('criptomoneda').appendChild(option);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export { cargarMonedas };