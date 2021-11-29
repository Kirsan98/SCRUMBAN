const express = require('express');
const connectDb = require("./config/db.config");
const route = require("./routes/index");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const columnRoutes = require("./routes/columnRoutes");
const taskRoutes = require("./routes/taskRoutes");
const logRoutes = require("./routes/logRoutes");
const sprintRoutes = require('./routes/sprintRoutes');
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  next(); // Important
})
app.use('/api', route);
app.use('/api', projectRoutes);
app.use('/api', sprintRoutes);
app.use('/api', userRoutes);
app.use('/api', columnRoutes);
app.use('/api', taskRoutes);
app.use('/api', logRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to SCRUMBAN application');
});



// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

connectDb();