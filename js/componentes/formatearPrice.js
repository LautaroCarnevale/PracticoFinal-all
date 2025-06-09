function formatearPrecioEnPesos(valor) {
    return Number(valor).toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}


export { formatearPrecioEnPesos };