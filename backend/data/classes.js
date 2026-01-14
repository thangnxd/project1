const xlsx = require("xlsx");

function parseWeeks(str) {
  if (!str) return [];
  const weeks = new Set();

  str.split(",").forEach(p => {
    if (p.includes("-")) {
      const [a, b] = p.split("-").map(Number);
      for (let i = a; i <= b; i++) weeks.add(i);
    } else {
      weeks.add(Number(p));
    }
  });

  return [...weeks];
}

function parseExcel(file) {
  const workbook = xlsx.read(file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  const headerIndex = rows.findIndex(r => r.includes("Mã_HP"));
  const headers = rows[headerIndex];
  const dataRows = rows.slice(headerIndex + 1);

  const classes = [];

  for (const row of dataRows) {
    const maHP = row[headers.indexOf("Mã_HP")];
    if (!maHP) continue;

    classes.push({
      maHP,
      tenHP:row[headers.indexOf("Tên_HP")],
      maLop: row[headers.indexOf("Mã_lớp")],
      maLopKem: row[headers.indexOf("Mã_lớp_kèm")] || null,
      loai: row[headers.indexOf("Loại_lớp")],   // ⭐ CỰC KỲ QUAN TRỌNG
      thu: Number(row[headers.indexOf("Thứ")]),
      start: Number(row[headers.indexOf("BĐ")]),
      end: Number(row[headers.indexOf("KT")]),
      tuan: parseWeeks(row[headers.indexOf("Tuần")]),
      phong: row[headers.indexOf("Phòng")],
      so: row[headers.indexOf("Buổi_số")],
      sessions: [{
        thu: Number(row[headers.indexOf("Thứ")]),
        start: Number(row[headers.indexOf("BĐ")]),
        end: Number(row[headers.indexOf("KT")]),
        tuan: parseWeeks(row[headers.indexOf("Tuần")]),
        phong: row[headers.indexOf("Phòng")],
        so: row[headers.indexOf("Buổi_số")]
      }]
    });
  }

  return classes;
}

module.exports = { parseExcel };
