import React, { useEffect } from 'react';
import Chart from 'chart.js';

const CustomersPerHour = ({ rawData }) => {  
  useEffect(() => {
    if (window.customersPerHourChart && window.customersPerHourChart !== null) {
      window.customersPerHourChart.destroy();
    }
    
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

    const ctx = document.getElementById('customersPerHour').getContext('2d');

    window.customersPerHourChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(formattedData),
        datasets: [{
          label: 'Customers',
          data: Object.values(formattedData).map(value => value[0]),
          backgroundColor: new Array(Object.keys(formattedData).length).fill('#3BA3F2'),
        }, {
            label: 'TTS (seconds)',
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
        <canvas id="customersPerHour" ></canvas>
      </div>
    </div>
  );
};

export default CustomersPerHour;
