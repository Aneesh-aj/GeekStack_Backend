const express = require('express');
const axios = require('axios');
const app = express();
const port =  3000;
const cors = require('cors');


app.use(cors());


app.get('/', async (req, res) => {
  try {
    const { location, radius, type, key } = req.query;
    console.log( location, radius, type ,key , req.params,req.body)
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: { location, radius, type, key },
    });
    console.log(" the response",response)
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching data from Google Maps');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
