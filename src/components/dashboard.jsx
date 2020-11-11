import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { sortByDate, filterDataByDate } from '../utils/data_formatting_utils';
import AvgTTS from './charts/avg_tts';
import CustomersPerDay from './charts/customers_per_day';
import CustomersPerDayPart from './charts/customers_per_dayPart';
import CustomersPerHour from './charts/customers_per_hour';
import DailyCustomersTTS from './charts/daily_customers_tts';

const Dashboard = () => {
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/data_aug27.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const results = Papa.parse(csv, { header: true });
      const sortedResults = sortByDate(results.data);

      setInitialData(sortedResults);
    }

    fetchData();
  }, []);

  const handleFilters = (e) => {
    e.preventDefault();

    if (dateRange.start || dateRange.end) {
      const filteredByDate = filterDataByDate(initialData, dateRange.start, dateRange.end);
      setFilteredData(filteredByDate);
    } else {
      setFilteredData(initialData);
    }
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  }

  const handleFilterClear = () => {
    setDateRange({ start: '', end: '' });
    setFilteredData(initialData)
  }

  return (
    <main>
      <div className="dashboard-header">
        <AvgTTS rawData={filteredData.length ? filteredData : initialData} />
        <form onSubmit={handleFilters}>
          <label htmlFor="startDate">Start</label>
          <input type="date" id="startDate" name="start" value={dateRange.start} onChange={handleDateChange}/>
          <label htmlFor="endDate">End</label>
          <input type="date" id="endDate" name="end" value={dateRange.end} onChange={handleDateChange} />
          <button type="submit">Apply</button>
          <button type="button" onClick={handleFilterClear} >Clear</button>
        </form>
      </div>
      <section className="charts-container">
        <DailyCustomersTTS rawData={filteredData.length ? filteredData : initialData}/>
        <CustomersPerDay rawData={filteredData.length ? filteredData : initialData} />
        <CustomersPerDayPart rawData={filteredData.length ? filteredData : initialData} />
        <CustomersPerHour rawData={filteredData.length ? filteredData : initialData} />
      </section>
    </main>
  );
};

export default Dashboard;
