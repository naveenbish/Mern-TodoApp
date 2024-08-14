require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const rootRouter = require("./routes");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log(`server running on Port`, PORT);
});
