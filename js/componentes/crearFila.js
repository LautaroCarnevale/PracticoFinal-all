const crearFila = (elementos) => {
    const fila = document.createElement('tr');
    fila.classList.add("border-b", "border-gray-300", "h-15");

    //  Crear celdas para cada elemento de los elementos
    //  y agregar clases de estilos
    elementos.forEach((element, index) => {
        const td = document.createElement('td');
        const span = document.createElement('span');


        td.textContent = element;
        td.classList.add("py-2", "text-sm", "text-gray-700");
        if (index === 0) td.classList.add("pl-4", "font-semibold");
        if (index === 2 && element === "Compra") {
            span.classList.add("bg-[#5FD35F]", "py-2", "min-w-[70px]", "inline-block", "text-center", "rounded", "text-white", "text-xs", "font-semibold");
            span.textContent = element;
            td.innerHTML = span.outerHTML;
        }
        if (index === 2 && element === "Venta") {
            span.classList.add("bg-[#FF5C85]", "py-2", "min-w-[70px]", "inline-block", "text-center", "rounded", "text-white", "text-xs", "font-semibold");
            span.textContent = element;
            td.innerHTML = span.outerHTML;
        }
        fila.appendChild(td);
    });


    return fila;
}

export { crearFila };