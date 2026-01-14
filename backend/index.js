const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { parseExcel } = require("./data/classes");
const scheduleRoute = require("./routes/schedule.route");
const store = require("./data/store");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// TEST
app.get("/", (req, res) => {
  res.send("Backend running");
});

// UPLOAD EXCEL
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    store.allClasses = parseExcel(req.file);

    console.log("Uploaded classes:", store.allClasses.length);

    res.json({
      ok: true,
      totalClasses: store.allClasses.length
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SCHEDULE
app.use("/api/schedule", scheduleRoute);

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});
