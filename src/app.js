const express = require('express');
const mongoose = require('mongoose');
const restaurantModel = require('./dataModel'); 
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = 3000;

app.use(cors());

mongoose.connect(process.env.mongodb)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

  app.get('/', async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
  
      if (!latitude || !longitude) {
        return res.status(400).send('Latitude and longitude are required');
      }
        const restaurants = await restaurantModel.find({});
  
      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
  
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; 
      };
  
      const sortedRestaurants = restaurants
        .map((restaurant) => {
          const distance = calculateDistance(
            parseFloat(latitude), 
            parseFloat(longitude),
            parseFloat(restaurant.latitude), 
            parseFloat(restaurant.langitude) 
          );
          return { ...restaurant.toObject(), distance: `${distance.toFixed(2)} km` }; 
        })
        .sort((a, b) => a.distance - b.distance); 
      res.status(200).json(sortedRestaurants); 
    } catch (error) {
      console.log(error);
      res.status(500).send('Error fetching and sorting restaurant data');
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
