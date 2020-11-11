export const getAvgTTS = (data) => {
  const total = data.reduce((acc, row) => row.tts ? acc + parseInt(row.tts) : acc, 0);
  const avg = Math.round(total / data.length)

  return avg;
}

export const getFormattedDate = (utcDate) => {
  const date = new Date(parseInt(utcDate) * 1000);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month + 1}-${day}-${year}`;
}