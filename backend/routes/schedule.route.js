const express = require("express");
const router = express.Router();

const schedule = require("../scheduler/backtracking");
const { scoreTimetable } = require("../utils/score.js");
const buildOptions = require("../scheduler/buildOptions");
const store = require("../data/store");

router.post("/", (req, res) => {
  try {
    // ✅ PHẢI CÓ DÒNG NÀY
    const { courses, limit, criteria } = req.body;

    console.log("courses:", courses);
    console.log("allClasses size:", store.allClasses.length);

    if (!courses || courses.length === 0) {
      return res.status(400).json({ error: "Danh sách học phần rỗng" });
    }

    // ✅ build options đúng cách
    const options = buildOptions(store.allClasses);

    // check học phần không xếp được
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

    const results = schedule(courses, options, limit || 1000);

    const scored = results.map(tkb => ({
      timetable: tkb,
      score: scoreTimetable(tkb, criteria || {})
    }));

    scored.sort((a, b) => b.score - a.score);

    res.json({
      ok: true,
      total: scored.length,
      top: scored.slice(0, 10)
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
