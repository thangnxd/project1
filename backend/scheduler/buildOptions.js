function buildOptions(classes) {
  const byHP = {};
  const options = {};

  // 1. Gom theo học phần
  for (const cls of classes) {
    if (!byHP[cls.maHP]) byHP[cls.maHP] = [];
    byHP[cls.maHP].push(cls);
  }

  // 2. Build options cho từng học phần
  for (const maHP in byHP) {
    const list = byHP[maHP];
    options[maHP] = [];

    // a. LT+BT (hoàn chỉnh)
    list
      .filter(c => c.loai === "LT+BT")
      .forEach(c => options[maHP].push([c]));

    // b. LT + BT combo
    const LT = list.filter(c => c.loai === "LT" && !c.maLopKem);
    const BT = list.filter(c => c.loai === "BT" && c.maLopKem);

    for (const lt of LT) {
      BT.filter(bt => bt.maLopKem === lt.maLop)
        .forEach(bt => {
          options[maHP].push([lt, bt]);
        });
    }

    // c. TN (độc lập)
    list
      .filter(c => c.loai === "TN")
      .forEach(tn => {
        options[maHP].push([tn]);
      });
  }

  return options;
}

module.exports = buildOptions;
