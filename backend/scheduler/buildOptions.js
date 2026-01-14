function buildOptions(classes) {
  const byHP = {};
  classes.forEach(cls => {
    if (!byHP[cls.maHP]) byHP[cls.maHP] = [];
    byHP[cls.maHP].push(cls);
  });

  const options = {};

  for (const maHP in byHP) {
    const list = byHP[maHP];

    const LT = list.filter(c => c.loai === "LT" && !c.maLopKem);
    const BT = list.filter(c => c.loai === "BT" && c.maLopKem);
    const LTBT = list.filter(
      c => c.loai === "LT+BT" || c.maLopKem === c.maLop
    );
    const TN = list.filter(c => c.loai === "TN");

    options[maHP] = [];

    // 1️⃣ LT + BT combo
    for (const lt of LT) {
      const btList = BT.filter(bt => bt.maLopKem === lt.maLop);

      for (const bt of btList) {
        const combo = {
          maHP,
          sessions: [...lt.sessions, ...bt.sessions],
          loai: "LT+BT"
        };

        if (TN.length === 0) {
          options[maHP].push(combo);
        } else {
          for (const tn of TN) {
            options[maHP].push({
              maHP,
              sessions: [...combo.sessions, ...tn.sessions],
              loai: "LT+BT+TN"
            });
          }
        }
      }
    }

    // 2️⃣ LT+BT gộp sẵn
    for (const c of LTBT) {
      if (TN.length === 0) {
        options[maHP].push(c);
      } else {
        for (const tn of TN) {
          options[maHP].push({
            maHP,
            sessions: [...c.sessions, ...tn.sessions],
            loai: "LT+BT+TN"
          });
        }
      }
    }
  }

  return options;
}

module.exports = buildOptions;
