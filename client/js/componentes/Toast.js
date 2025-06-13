function typeToast(type, message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: type,
        },
    }).showToast();
}

export { typeToast };