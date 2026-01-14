function buildOptions(classes) {
  const byHP = {};

  // Gom theo học phần
  for (const cls of classes) {
    if (!byHP[cls.maHP]) byHP[cls.maHP] = [];
    byHP[cls.maHP].push(cls);
  }

  const options = {};

  for (const maHP in byHP) {
    const list = byHP[maHP];

    const LT = list.filter(c => c.loai === "LT");
    const BT = list.filter(c => c.loai === "BT");
    const LTBT = list.filter(c => c.loai === "LT+BT");
    const TN = list.filter(c => c.loai === "TN");

    options[maHP] = [];

    // 1️⃣ LT+BT sẵn
    for (const c of LTBT) {
      options[maHP].push({
        maHP,
        combo: [c]
      });
    }

    // 2️⃣ Ghép LT + BT
    for (const lt of LT) {
      const btList = BT.filter(
        bt => bt.maLopKem === lt.maLop
      );

      if (btList.length === 0) {
        // Chỉ có LT (vẫn hợp lệ)
        options[maHP].push({
          maHP,
          combo: [lt]
        });
      } else {
        for (const bt of btList) {
          options[maHP].push({
            maHP,
            combo: [lt, bt]
          });
        }
      }
    }

    // 3️⃣ Thêm TN (nếu có)
    if (TN.length > 0) {
      const withTN = [];
      for (const opt of options[maHP]) {
        for (const tn of TN) {
          withTN.push({
            maHP,
            combo: [...opt.combo, tn]
          });
        }
      }
      options[maHP] = withTN;
    }
  }

  return options;
}

module.exports = buildOptions;
