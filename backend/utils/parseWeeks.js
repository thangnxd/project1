function parseWeeks(str) {
  if (!str) return [];

  const result = [];
  const parts = str.split(",");

  for (const p of parts) {
    if (p.includes("-")) {
      const [a, b] = p.split("-").map(Number);
      for (let i = a; i <= b; i++) result.push(i);
    } else {
      result.push(Number(p));
    }
  }
  return result;
}

module.exports = { parseWeeks };
