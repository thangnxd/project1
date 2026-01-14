const { classConflict } = require("../utils/conflict.js");

function schedule(courses, options, limit = 1000) {
  const results = [];
  const current = [];

  function backtrack(i) {
    if (results.length >= limit) return;

    if (i === courses.length) {
      results.push(JSON.parse(JSON.stringify(current)));
      return;
    }

    const maHP = courses[i];
    const combos = options[maHP] || [];

    if (combos.length === 0) return;

    for (const combo of combos) {
      // combo = [LT, TH]

      // 1. Check conflict cho TỪNG lớp trong combo
      let conflict = false;
      for (const cls of combo) {
        if (classConflict(cls, current)) {
          conflict = true;
          break;
        }
      }

      if (conflict) continue;

      // 2. Thêm toàn bộ combo
      for (const cls of combo) {
        current.push(cls);
      }

      backtrack(i + 1);

      // 3. Gỡ combo ra
      for (let k = 0; k < combo.length; k++) {
        current.pop();
      }
    }
  }

  backtrack(0);
  return results;
}

module.exports = schedule;
