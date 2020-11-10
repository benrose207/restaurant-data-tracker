import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const CustomersPerDay = ({ rawData }) => {
  const ctx = useRef();
  
  useEffect(() => {
    const formattedData = {
      Mon: [0, 0],
      Tue: [0, 0],
      Wed: [0, 0],
      Thu: [0, 0],
      Fri: [0, 0],
      Sat: [0, 0],
      Sun: [0, 0],
    };

    const uniqueDays = {
      Mon: new Set(),
      Tue: new Set(),
      Wed: new Set(),
      Thu: new Set(),
      Fri: new Set(),
      Sat: new Set(),
      Sun: new Set(),
    }
  
    rawData.forEach(row => {
      if (row.first_seen_utc) {
        const date = new Date(parseInt(row.first_seen_utc) * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        if (formattedData[day][0] >= 0) {
          formattedData[day][0]++;
          if (row.tts) formattedData[day][1] += parseInt(row.tts);
        }
        const monthDay = `${date.getMonth()}-${date.getDate()}`;
        uniqueDays[day].add(monthDay);
      }
    });

    const chart = new Chart(ctx.current, {
      type: 'bar',
      data: {
        labels: Object.keys(formattedData),
        datasets: [
          {
            label: 'Customers',
            data: Object.keys(formattedData).map(day => Math.round(formattedData[day][0] / uniqueDays[day].size)),
            backgroundColor: new Array(Object.keys(formattedData).length).fill('#3BA3F2'),
          },
          {
            label: 'TTS',
            data: Object.values(formattedData).map(value => Math.round(value[1] / value[0])),
            backgroundColor: new Array(Object.keys(formattedData).length).fill('#FBD533'),
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              position: 'left',
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    });
  }, [rawData]);

  return (
    <div className="metric-card chart-component">
      <h2>Avg. Customers per Day</h2>
      <div className="barChart-container">
        <canvas id="customersPerDay" ref={ctx}></canvas>
      </div>
    </div>
  );
};

export default CustomersPerDay;
