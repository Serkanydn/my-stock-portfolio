class Toolbox {
  wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  calculatePercent = (value, total) => Math.round((value / total - 1) * 100);

  getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

  removeDuplicates = (arr) => [...new Set(arr)];

  sortBy = (arr, key) =>
    arr.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));

  isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  pluck = (objs, key) => objs.map((obj) => obj[key]);

  insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index),
  ];

  replace = (arr, oldItemIndex, count = 1, newItem) => {
    arr.splice(oldItemIndex, count, newItem);
  };

  getCurrentTime = () => {
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  };

  getTimeZone = () => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return timeZone;
  };

  groupByObject = (arr, key) => {
    arr.reduce((prev, curr) => {
      prev[key] = curr[key] ?? [];

      prev[key].push(curr);

      return prev;
    }, {});
  };

  fillArray = (length, item) => new Array(length).fill(item);
}

export default new Toolbox();
