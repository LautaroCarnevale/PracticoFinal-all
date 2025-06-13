const crearFila = (elementos) => {
    const fila = document.createElement('tr');
    fila.classList.add("tr-transacciones", "border-b", "border-gray-300", "h-15", "odd:bg-white", "even:bg-[rgba(245,245,245,0.8)]");

    elementos.forEach((element, index) => {
        const td = document.createElement('td');
        const span = document.createElement('span');
        const button = document.createElement('button');

        button.textContent = "Ver transacción";
        button.classList.add("ver-transaccion-btn", "cursor-pointer", "bg-[#5FD35F]", "py-2", "px-4", "min-w-[65px]", "inline-block", "text-center", "rounded", "text-white", "text-xs", "font-semibold");

        if (index === 4) {
            td.textContent = "";
            button.setAttribute('data-id', element); 
            td.appendChild(button);
        } else {
            td.textContent = element;
        }

        td.classList.add("py-2", "text-sm", "text-gray-700");
        if (index === 0) td.classList.add("pl-4", "font-semibold");

        if (index === 2 && element === "Compra") {
            span.classList.add("bg-[#5FD35F]", "py-1", "min-w-[65px]", "inline-block", "text-center", "rounded", "text-white", "text-xs", "font-semibold");
            span.textContent = element;
            td.innerHTML = span.outerHTML;
        }

        if (index === 2 && element === "Venta") {
            span.classList.add("bg-[#FF5C85]", "py-1", "min-w-[65px]", "inline-block", "text-center", "rounded", "text-white", "text-xs", "font-semibold");
            span.textContent = element;
            td.innerHTML = span.outerHTML;
        }

        fila.appendChild(td);
    });

    return fila;
};


export { crearFila };