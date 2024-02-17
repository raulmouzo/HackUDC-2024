const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/prices/min', async (req, res) => {
  try {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const response = await fetch('https://api.preciodelaluz.org/v1/prices/min?zone=PCB');
    const data = await response.json();
    res.json(data); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));