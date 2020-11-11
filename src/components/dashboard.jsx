import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import AvgTTS from './charts/avg_tts';
import CustomersPerDay from './charts/customers_per_day';
import CustomersPerDayPart from './charts/customers_per_dayPart';
import CustomersPerHour from './charts/customers_per_hour';
import DailyCustomersTTS from './charts/daily_customers_tts';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/data_aug27.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const results = Papa.parse(csv, { header: true });

      setData(results.data);
    }

    fetchData();
  }, []);

  return (
    <main>
      <AvgTTS rawData={data} />
      <section className="charts-container">
        <DailyCustomersTTS rawData={data}/>
        <CustomersPerDay rawData={data} />
        <CustomersPerDayPart rawData={data} />
        <CustomersPerHour rawData={data} />
      </section>
    </main>
  );
};

export default Dashboard;
