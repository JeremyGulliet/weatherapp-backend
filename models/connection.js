const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://GULLIET:5yEBvpGO505z2u7G@cluster0.xbbymqv.mongodb.net/weatherapp'

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
