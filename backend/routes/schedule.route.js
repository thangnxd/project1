const express = require("express");
const router = express.Router();

const schedule = require("../scheduler/backtracking");
const buildOptions = require("../scheduler/buildOptions");
const { scoreTimetable } = require("../utils/score");
const store = require("../data/store");

router.post("/", (req, res) => {

  console.log("REQ BODY:", req.body);
  try {
    const { courses, limit = 1000, criteria = {} } = req.body;

    if (!courses || courses.length === 0) {
      return res.status(400).json({ ok: false, message: "Danh sách học phần rỗng" });
    }

    if (!store.allClasses || store.allClasses.length === 0) {
      return res.json({ ok: false, message: "Chưa upload Excel" });
    }

    const options = buildOptions(store.allClasses);

    const impossible = courses.filter(
      hp => !options[hp] || options[hp].length === 0
    );

    if (impossible.length > 0) {
      return res.json({
        ok: false,
        message: "Có học phần không thể xếp",
        impossible
      });
    }

    const results = schedule(courses, options, limit);

    const scored = results.map(tkb => ({
      timetable: tkb,
      score: scoreTimetable(tkb, criteria)
    }));

    scored.sort((a, b) => b.score - a.score);

    res.json({
      ok: true,
      total: scored.length,
      top: scored.slice(0, limit)
    });

  } catch (e) {
    console.error("SCHEDULE ERROR:", e);
      res.status(500).json({
        ok: false,
        message: "Có lỗi xảy ra",
        error: e.message
      });
  }
});

module.exports = router;
