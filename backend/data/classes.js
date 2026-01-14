const xlsx = require("xlsx");

/**
 * Trả về mảng các classOption để xếp TKB
 * Mỗi option là 1 đơn vị xếp (LT+BT combo / LT+BT sẵn / TN)
 */
function parseExcel(file) {
  if (!file) throw new Error("No file");

  const workbook = xlsx.read(file.buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  const headerRowIndex = rows.findIndex(r => r.includes("Mã_HP"));
  if (headerRowIndex === -1) throw new Error("Không tìm thấy header");

  const headers = rows[headerRowIndex];
  const dataRows = rows.slice(headerRowIndex + 1);

  const raw = [];

  // ==== 1. Đọc dữ liệu thô ====
  for (const row of dataRows) {
    const maHP = row[headers.indexOf("Mã_HP")];
    if (!maHP) continue;

    const loaiRaw = row[headers.indexOf("Loại_lớp")] || "";

    let loai;
    if (loaiRaw.includes("TN")) loai = "TN";
    else if (loaiRaw.includes("LT+BT")) loai = "LT+BT";
    else if (loaiRaw.includes("BT")) loai = "BT";
    else loai = "LT";

    raw.push({
      maHP,
      maLop: row[headers.indexOf("Mã_lớp")],
      maLopKem: row[headers.indexOf("Mã_lớp_kèm")],
      loai,
      thu: Number(row[headers.indexOf("Thứ")]),
      start: Number(row[headers.indexOf("BĐ")]),
      end: Number(row[headers.indexOf("KT")]),
      phong: row[headers.indexOf("Phòng")],
      so: row[headers.indexOf("Buổi_số")],
      tuan: parseWeeks(row[headers.indexOf("Tuần")])
    });
  }

  // ==== 2. Gom LT theo mã lớp ====
  const ltMap = {};
  raw.filter(r => r.loai === "LT").forEach(r => {
    ltMap[r.maLop] = r;
  });

  const results = [];

  // ==== 3. Xử lý BT + LT thành COMBO ====
  raw.filter(r => r.loai === "BT").forEach(bt => {
    const lt = ltMap[bt.maLopKem];
    if (!lt) return;

    results.push({
      maHP: bt.maHP,
      maLop: bt.maLop,
      type: "LT_BT",
      sessions: [
        {
          thu: lt.thu,
          start: lt.start,
          end: lt.end,
          phong: lt.phong,
          so: lt.so,
          loai: "LT",
          tuan: lt.tuan
        },
        {
          thu: bt.thu,
          start: bt.start,
          end: bt.end,
          phong: bt.phong,
          so: bt.so,
          loai: "BT",
          tuan: bt.tuan
        }
      ]
    });
  });

  // ==== 4. LT+BT sẵn ====
  raw.filter(r => r.loai === "LT+BT").forEach(r => {
    results.push({
      maHP: r.maHP,
      maLop: r.maLop,
      type: "LT_BT_COMBO",
      sessions: [{
        thu: r.thu,
        start: r.start,
        end: r.end,
        phong: r.phong,
        so: r.so,
        loai: "LT+BT",
        tuan: r.tuan
      }]
    });
  });

  // ==== 5. TN (độc lập) ====
  raw.filter(r => r.loai === "TN").forEach(r => {
    results.push({
      maHP: r.maHP,
      maLop: r.maLop,
      type: "TN",
      sessions: [{
        thu: r.thu,
        start: r.start,
        end: r.end,
        phong: r.phong,
        so: r.so,
        loai: "TN",
        tuan: r.tuan
      }]
    });
  });

  return results;
}

/* ==== Parse tuần ==== */
function parseWeeks(str) {
  const set = new Set();
  if (!str) return set;

  str.split(",").forEach(p => {
    if (p.includes("-")) {
      const [a, b] = p.split("-").map(Number);
      for (let i = a; i <= b; i++) set.add(i);
    } else {
      set.add(Number(p));
    }
  });
  return [...set];
}

module.exports = { parseExcel };
