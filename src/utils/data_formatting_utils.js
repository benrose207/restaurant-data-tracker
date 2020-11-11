export const getAvgTTS = (data) => {
  const total = data.reduce((acc, row) => row.tts ? acc + parseInt(row.tts) : acc, 0);
  const avg = Math.round(total / data.length)

  return avg;
}

export const getFormattedDate = (utcDate) => {
  const date = formatAsDate(utcDate);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month + 1}-${day}-${year}`;
}

export const sortByDate = (data) => {
  const sorted = data.sort((a, b) => parseInt(a.first_seen_utc) - parseInt(b.first_seen_utc));
  return sorted;
}

export const filterDataByDate = (data, startDate, endDate) => {
  const start = startDate ? new Date(`${startDate}T00:00`) : formatAsDate(data[0].first_seen_utc);
  const end = endDate ? new Date(`${endDate}T00:00`) : formatAsDate(data[data.length - 1].first_seen_utc);
  debugger
  return data.filter(customer => {
    const customerDate = formatAsDate(customer.first_seen_utc)
    return customerDate >= start && customerDate <= end;
  });
}

const formatAsDate = (unixTime) => {
  return new Date(parseInt(unixTime * 1000));
}