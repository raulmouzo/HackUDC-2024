const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get('/api/prices/min', (req, res) => {
  // Datos de ejemplo para el precio mínimo
  const minPriceData = {
    "date": "17-02-2024",
    "hour": "15-16",
    "is-cheap": true,
    "is-under-avg": true,
    "market": "PVPC",
    "price": 67.62,
    "units": "€/MWh"
  };
  res.json(minPriceData);
});


app.get('/api/prices/max', (req, res) => {
  // Datos de ejemplo para el precio máximo
  const maxPriceData = {
    "date": "17-02-2024",
    "hour": "19-20",
    "is-cheap": false,
    "is-under-avg": false,
    "market": "PVPC",
    "price": 127.83,
    "units": "€/MWh"
  };
  res.json(maxPriceData);
});

app.get('/api/prices/cheapest1', (req, res) => {
  // Datos de ejemplo para los precios más baratos
  const cheapestPricesData1 =  {
      "date": "17-02-2024",
      "hour": "15-16",
      "is-cheap": true,
      "is-under-avg": true,
      "market": "PVPC",
      "price": 67.62,
      "units": "€/MWh"
    };
  res.json(cheapestPricesData1);
});

app.get('/api/prices/cheapest2', (req, res) => {
    // Datos de ejemplo para los precios más baratos
    const cheapestPricesData2 =  {
        "date": "17-02-2024",
        "hour": "14-15",
        "is-cheap": true,
        "is-under-avg": true,
        "market": "PVPC",
        "price": 68.97,
        "units": "€/MWh"
        }
    res.json(cheapestPricesData2);
  });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));