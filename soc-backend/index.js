const express = require("express");
const app = express();
const cors = require("cors");

const logsRouter = require("./routes/logs");

app.use(cors());

app.use("/api", logsRouter);

app.get("/", (req, res) => {
  res.send("SOC Dashboard API is running ✅");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
