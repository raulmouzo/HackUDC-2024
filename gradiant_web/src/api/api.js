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
  /*
  {
    "date": "17-02-2024",
    "hour": "15-16",
    "is-cheap": true,
    "is-under-avg": true,
    "market": "PVPC",
    "price": 67.62,
    "units": "€/MWh"
    }
    */
  try {
    //const data = await fetchAPI('https://api.preciodelaluz.org/v1/prices/min?zone=PCB');
    const data = await fetchAPI('http://localhost:5000/api/prices/min');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching minimum price data' });
  }
});

// Endpoint para obtener el precio máximo
app.get('/api/prices/max', async (req, res) => {
    /* {
    "date": "17-02-2024",
    "hour": "19-20",
    "is-cheap": false,
    "is-under-avg": false,
    "market": "PVPC",
    "price": 127.83,
    "units": "€/MWh"
} */
  try {
    //const data = await fetchAPI('https://api.preciodelaluz.org/v1/prices/max?zone=PCB');
    const data = await fetchAPI('http://localhost:5000/api/prices/max');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching maximum price data' });
  }
});

// Endpoint para obtener los precios más baratos
app.get('/api/prices/cheapests', async (req, res) => {
  /*
  [
    {
    "date": "17-02-2024",
    "hour": "15-16",
    "is-cheap": true,
    "is-under-avg": true,
    "market": "PVPC",
    "price": 67.62,
    "units": "€/MWh"
    },
    {
    "date": "17-02-2024",
    "hour": "14-15",
    "is-cheap": true,
    "is-under-avg": true,
    "market": "PVPC",
    "price": 68.97,
    "units": "€/MWh"
    }
  ]
  */
  try {
    const numCheapest = req.query.n || 2;
    //const data = await fetchAPI(`https://api.preciodelaluz.org/v1/prices/cheapests?zone=PCB&n=${numCheapest}`);
    const data = await fetchAPI(`http://localhost:5000/api/prices/cheapests?n=${numCheapest}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cheapest prices data' });
  }
});

app.get('/api/prices/cheapests1', async (req, res) => {

  try {
    const data = await fetchAPI(`http://localhost:5000/api/prices/cheapest1`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cheapest prices data' });
  }
});

app.get('/api/prices/cheapests2', async (req, res) => {

  try {
    const data = await fetchAPI(`http://localhost:5000/api/prices/cheapest2`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cheapest prices data' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));