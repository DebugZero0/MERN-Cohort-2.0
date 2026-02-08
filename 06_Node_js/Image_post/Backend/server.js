require('dotenv').config();
const server = require('./src/app');
const connectDB = require('./src/db/db');

// Connect to the database
connectDB();


server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});