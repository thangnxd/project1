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
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  const headerIndex = rows.findIndex(r => r.includes("Mã_HP"));
  const headers = rows[headerIndex];
  const dataRows = rows.slice(headerIndex + 1);

  // Gộp map theo mã lớp
  const classMap = new Map();

  for (const row of dataRows) {
    const maHP = row[headers.indexOf("Mã_HP")];
    if (!maHP) continue;

    const maLop = row[headers.indexOf("Mã_lớp")];
    const key = `${maHP}_${maLop}`;

    const kip = row[headers.indexOf("Kíp")];
    let start = Number(row[headers.indexOf("BĐ")]);
    let end = Number(row[headers.indexOf("KT")]);

    // Nếu là kíp chiều thì tăng số tiết lên do tkb hust đều đánh từ 1 đến 6
    if (kip === "Chiều") {
      start += 6;
      end += 6;
    }

    const session = {
      thu: Number(row[headers.indexOf("Thứ")]),
      start,
      end,
      tuan: parseWeeks(row[headers.indexOf("Tuần")]),
      phong: row[headers.indexOf("Phòng")],
      so: row[headers.indexOf("Buổi_số")]
    };

    if (!classMap.has(key)) {
      classMap.set(key, {
        maHP,
        tenHP: row[headers.indexOf("Tên_HP")],
        maLop,
        maLopKem: row[headers.indexOf("Mã_lớp_kèm")] || null,
        loai: row[headers.indexOf("Loại_lớp")],
        maQL: row[headers.indexOf("Mã_QL")],  
        sessions: [session]
      });
    } else {
      //Nếu những lớp có 2 buổi 1 tuần thì ghép nó vào
      classMap.get(key).sessions.push(session);
    }
  }

  return Array.from(classMap.values());
}

module.exports = { parseExcel };
