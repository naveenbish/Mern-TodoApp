require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const rootRouter = require("./routes");
const cron = require("node-cron");
const { exec } = require('child_process');
const PORT = process.env.PORT || 3001;

cron.schedule('*/5 * * * *', () => {
  exec('curl https://mern-todoapp-backend-662y.onrender.com');
  console.log('Corn running....')
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server working fine.')
})

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log(`server running on Port`, PORT);
});
