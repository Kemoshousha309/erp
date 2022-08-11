export const storeLocally = (itemName, value) => {
  if (typeof (value) === 'object') {
    localStorage.setItem(itemName, JSON.stringify(value));
  } else {
    localStorage.setItem(itemName, value);
  }
  const storeTime = new Date().getTime();
  localStorage.setItem(`${itemName}_storeTime`, storeTime);
  return storeTime;
};

export const isExpire = (itemName, expireTime) => {
  const currentTime = new Date().getTime();
  const storeTime = parseInt(localStorage.getItem(`${itemName}_storeTime`));
  const remainTime = currentTime - storeTime;
  return remainTime >= expireTime;
};

