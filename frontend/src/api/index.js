const API_URL = 'http://localhost:5000/api';

export const fetchItems = async () => {
    try {
        const response = await fetch(`${API_URL}/items`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};

export const addItem = async (itemData) => {
    try {
        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error adding item:", error);
    }
};