const { classConflict } = require("../utils/conflict");

function schedule(courses, options, limit = 1000) {
  const results = [];
  const current = [];

  function backtrack(i) {
    if (results.length >= limit) return;

    if (i === courses.length) {
      results.push(current.flat());
      return;
    }

    const maHP = courses[i];
    const combos = options[maHP] || [];

    for (const combo of combos) {
      let ok = true;

      for (const cls of combo) {
        if (classConflict(cls, current)) {
          ok = false;
          break;
        }
      }

      if (!ok) continue;

      current.push(...combo);
      backtrack(i + 1);
      combo.forEach(() => current.pop());
    }
  }

  backtrack(0);
  return results;
}

module.exports = schedule;
