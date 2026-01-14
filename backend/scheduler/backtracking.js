const { classConflict } = require("../utils/conflict");

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
    const optionList = options[maHP];

    if (!optionList || optionList.length === 0) return;

    for (const opt of optionList) {
      const combo = opt.combo;

      if (classConflict(combo, current)) continue;

      current.push(...combo);
      backtrack(i + 1);
      current.splice(current.length - combo.length);
    }
  }

  backtrack(0);
  return results;
}

module.exports = schedule;
