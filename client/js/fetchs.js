import { cargarInfoUser } from "./componentes/cargarInfoUsuario.js";


// Función para obtener las transacciones
async function fetchGryptos() {
    try {
        const response = await fetch("http://localhost:5119/api/Crypto/GetCryptos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// Función para obtener el precio de una criptomoneda
async function fetchGetCryptosPrice(abreviatura) {
    try {
        const url = `https://criptoya.com/api/binance/${abreviatura}/ARS/1`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data.totalBid;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// Función para obtener las transacciones
async function fetchTransactions() {
    try {
        const response = await fetch("http://localhost:5119/api/transactions/GetTransactions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// Función para obtener las monedas
async function fetchMonedas() {
    try {
        const response = await fetch("http://localhost:5119/api/Crypto/GetMonedas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// Función para obtener el usuario
async function fetchGetUser(id) {
    try {
        const response = await fetch(`http://localhost:5119/api/users/VerifyUser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorJson = await response.json();
            throw errorJson;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// Función para obtener una transacción
async function fetchGetTransaction(id) {
    try {
        const response = await fetch(`http://localhost:5119/api/transactions/GetTransactionById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

         if (!response.ok) {
            // Mostrar el contenido del error devuelto por el backend
            const errorText = await response.text();
            console.error(`Error ${response.status}:`, errorText);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// Función para crear un usuario
async function fetchCreateUser(user) {
    const userEnviar = {
        Nombre: user.nombre,
        Apellido: user.apellido,
        Email: user.email,
        Saldo: 1000000000
    };

    try {
        const response = await fetch("http://localhost:5119/api/users/CreateUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userEnviar)
        });

        if (!response.ok) {
            const errorJson = await response.json();
            throw errorJson;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Función para crear una transacción (venta o compra)
async function fetchCreateTransaction(transaction) {

    const transactionModel = {
        Cantidad: parseFloat(transaction.cantidad),
        MonedaId: parseInt(transaction.moneda),
        precio: parseFloat(transaction.precio),
        UserId: transaction.userId,
        Fecha: transaction.fecha
    };

    try {
        const response = await fetch("http://localhost:5119/api/transactions/CreateTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionModel)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = await response.json();
        cargarInfoUser();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


export { fetchGetTransaction, fetchGetUser, fetchGryptos, fetchTransactions, fetchMonedas, fetchCreateUser, fetchCreateTransaction, fetchGetCryptosPrice };
