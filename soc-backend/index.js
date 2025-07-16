const express = require("express");
const app = express();

const logsRouter = require("./routes/logs");

app.use("/api", logsRouter);

app.get("/", (req, res) => {
  res.send("SOC Dashboard API is running ✅");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
