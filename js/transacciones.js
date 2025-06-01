const crearFila = (transaccion, className) => {
    const fila = document.createElement('tr');
    fila.classList.add("border-b", "border-gray-300", "h-15");

    transaccion.forEach((element, index) => {
        const td = document.createElement('td');
        td.textContent = element;

        td.classList.add("py-2", "text-sm", "text-gray-700");
        if (index === 0) td.classList.add("pl-4", "font-semibold");

        fila.appendChild(td);
    });


    return fila;
}

export { crearFila };