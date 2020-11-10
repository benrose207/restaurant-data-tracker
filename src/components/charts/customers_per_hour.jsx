import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const CustomersPerHour = ({ rawData }) => {
  const ctx = useRef();

  useEffect(() => {
    const formattedData = {};

    rawData.forEach(row => {
      if (row.first_seen_utc) {
        const date = new Date(parseInt(row.first_seen_utc) * 1000);
        const hour = date.getHours();

        if (!formattedData[hour]) formattedData[hour] = [0, 0];
        formattedData[hour][0]++;

        if (row.tts) formattedData[hour][1] += parseInt(row.tts);
      }
    });

    const chart = new Chart(ctx.current, {
      type: 'bar',
      data: {
        labels: Object.keys(formattedData),
        datasets: [{
          label: 'Customers',
          data: Object.values(formattedData).map(value => value[0]),
          backgroundColor: new Array(Object.keys(formattedData).length).fill('#3BA3F2'),
        }, {
            label: 'TTS',
            data: Object.values(formattedData).map(value => Math.round(value[1] / value[0])),
            backgroundColor: new Array(Object.keys(formattedData).length).fill('#FBD533'),
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
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
      <h2>Avg. Customers per Hour</h2>
      <div className="barChart-container">
        <canvas id="customersPerHour" ref={ctx}></canvas>
      </div>
    </div>
  );
};

export default CustomersPerHour;
