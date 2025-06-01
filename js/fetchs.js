async function fetchTransactions() {
    try {
        const response = await fetch("https://localhost:7096/api/Crypto/GetCryptos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null; // o throw error;
    }
}

export { fetchTransactions };
