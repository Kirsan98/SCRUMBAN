const express = require('express');
const connectDb = require("./config/db.config");
const route = require("./routes/index");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
app.use('/api', route);

app.get('/', (req, res) => {
  res.send('Welcome to SCRUMBAN application');
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

connectDb();