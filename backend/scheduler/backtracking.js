const { classConflict } = require("../utils/conflict");

function schedule(courses, options, limit = 10000) {
  const results = [];
  const current = [];

  function backtrack(i) {
    if (results.length >= limit) return;

    if (i === courses.length) {
      results.push(JSON.parse(JSON.stringify(current)));
      return;
    }

    const maHP = courses[i];
    const classList = options[maHP] || [];

    for (const cls of classList) {
      // cls giờ là 1 OBJECT duy nhất (LT+BT hoặc TN)
      if (classConflict(cls, current)) continue;

      current.push(cls);
      backtrack(i + 1);
      current.pop();
    }
  }

  backtrack(0);
  return results;
}

module.exports = schedule;
