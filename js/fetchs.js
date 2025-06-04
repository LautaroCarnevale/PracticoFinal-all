
async function fetchTransactions() {
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

// async function fetchTransactions() {
//     try {
//         const response = await fetch("http://localhost:7096/api/Crypto/GetCryptos", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         });

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Fetch error:', error);
//         return null;
//     }
// }

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


async function fetchCreateUser(user) {
    const userEnviar = {
        Nombre: user.nombre,
        Apellido: user.apellido,
        Email: user.email,
        Saldo: 1000000
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
            throw new Error("Error al guardar el usuario");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}



async function fetchVerifyUser(user) {
    try {
        const response = await fetch("http://localhost:5119/api/users/VerifyUser", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Assuming the response is JSON
        return response.status === 200;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export { fetchTransactions, fetchMonedas, fetchCreateUser, fetchVerifyUser };
