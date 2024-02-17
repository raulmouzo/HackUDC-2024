const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Función para realizar la solicitud de fetch reutilizable
const fetchAPI = async (url) => {
  const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
  const response = await fetch(url);
  return response.json();
};

app.get('/api/prices/min', async (req, res) => {
  try {
    const data = await fetchAPI('https://api.preciodelaluz.org/v1/prices/min?zone=PCB');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching minimum price data' });
  }
});

// Endpoint para obtener el precio máximo
app.get('/api/prices/max', async (req, res) => {
  try {
    const data = await fetchAPI('https://api.preciodelaluz.org/v1/prices/max?zone=PCB');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching maximum price data' });
  }
});

// Endpoint para obtener los precios más baratos
app.get('/api/prices/cheapests', async (req, res) => {
  try {
    // Obtener el parámetro 'n' de la URL, si existe, o usar un valor predeterminado
    const numCheapest = req.query.n || 2;
    const data = await fetchAPI(`https://api.preciodelaluz.org/v1/prices/cheapests?zone=PCB&n=${numCheapest}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cheapest prices data' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));