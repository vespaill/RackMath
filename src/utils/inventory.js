const modQuantity = (plateObjs, modifier) => {
  return plateObjs.reduce((prev, cur) => {
    // Filter out plates with 0 quantity.
    if (cur.quantity > 0) {
      return [
        ...prev,
        {
          value: cur.value,
          color: cur.color,
          // Half quantity because we want to work with one side of barbell.
          quantity: Math.floor(cur.quantity * modifier)
        }
      ];
    }
    return prev;
  }, []);
};

const expandFromQuantity = plateObjs => {
  const array = [];
  for (let plate of plateObjs) {
    let j = Math.floor(plate.quantity);
    while (j > 0) {
      array.push({ value: plate.value, color: plate.color });
      j--;
    }
  }
  return array;
};

export { modQuantity, expandFromQuantity };
