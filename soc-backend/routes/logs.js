const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Reading the log file
const logFilePath = path.join(__dirname, "..", "siem_logs.json");
let logs = [];

try {
  const raw = fs.readFileSync(logFilePath, "utf-8");
  logs = JSON.parse(raw);
} catch (err) {
  console.error("❌ Failed to read log file:", err);
}

// GET /api/logs
router.get("/logs", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedLogs = logs.slice(start, end);

  res.json({
    page,
    limit,
    total: logs.length,
    totalPages: Math.ceil(logs.length / limit),
    data: paginatedLogs,
  });
});

// GET /api/event-count
router.get("/event-count", (req, res) => {
  const counts = {};

  logs.forEach((log) => {
    const type = log.event_type;
    counts[type] = (counts[type] || 0) + 1;
  });

  res.json(counts);
});

// GET /api/events-by-hour
router.get("/events-by-hour", (req, res) => {
  const eventsByHour = {};

  logs.forEach((log) => {
    const date = new Date(log.timestamp);

    // Round and formatting as YYYY-MM-DDTHH:00
    const hourKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:00`;

    eventsByHour[hourKey] = (eventsByHour[hourKey] || 0) + 1;
  });

  const sorted = Object.keys(eventsByHour)
    .sort()
    .reduce((obj, key) => {
      obj[key] = eventsByHour[key];
      return obj;
    }, {});

  res.json(sorted);
});

module.exports = router;
