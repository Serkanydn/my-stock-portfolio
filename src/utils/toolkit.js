const getDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  let day = now.getDate();
  let month = now.getMonth() + 1;

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  const date = `${year}-${month}-${day}`;

  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (hour < 10) hour = "0" + hour;
  if (minutes < 10) minutes = "0" + minutes;

  const time = `${hour}:${minutes}`;

  return { date, time };
};

export { getDate };
