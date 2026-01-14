function buildOptions(classes) {
  const byHP = {};
  const options = {};

  // Gom theo học phần
  for (const cls of classes) {
    if (!byHP[cls.maHP]) byHP[cls.maHP] = [];
    byHP[cls.maHP].push(cls);
  }

  for (const maHP in byHP) {
    const list = byHP[maHP];

    const lt = list.filter(c => c.loai === "LT");
    const bt = list.filter(c => c.loai === "BT");
    const ltbt = list.filter(c => c.loai === "LT+BT");
    const tn = list.filter(c => c.loai === "TN");

    options[maHP] = [];

    // Nếu là lớp LT+BT
    for (const cls of ltbt) {
      options[maHP].push({
        maHP,
        tenHP: cls.tenHP,
        maLop: cls.maLop,
        loai: "LT+BT",
        sessions: cls.sessions
      });
    }

    // Nếu là lớp LT và BT tách riêng thì ghép
    for (const ltCls of lt) {
      const btOfLT = bt.filter(
        b => b.maLopKem === ltCls.maLop
      );

      for (const btCls of btOfLT) {
        options[maHP].push({
          maHP,
          tenHP: btCls.tenHP,
          maLop: `${ltCls.maLop}+${btCls.maLop}`,
          loai: "LT+BT",
          sessions: [
            ...ltCls.sessions,
            ...btCls.sessions
          ]
        });
      }
    }

    //Lớp TN
    for (const tnCls of tn) {
      options[maHP].push({
        maHP,
        tenHP: tnCls.tenHP,
        maLop: tnCls.maLop,
        loai: "TN",
        sessions: tnCls.sessions
      });
    }
  }

  return options;
}

module.exports = buildOptions;
