export const getAvgTTS = (data) => {
  const total = data.reduce((acc, row) => row.tts ? acc + parseInt(row.tts) : acc, 0);
  const avg = Math.round(total / data.length)

  return avg;
}