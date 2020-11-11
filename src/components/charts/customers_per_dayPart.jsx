import React, { useEffect } from 'react';
import Chart from 'chart.js';

const CustomersPerDayPart = ({ rawData }) => {
  useEffect(() => {
    if (window.customersPerDayPartChart && window.customersPerDayPartChart !== null) {
      window.customersPerDayPartChart.destroy();
    }

    const formattedData = {
      1: [0, 0],
      2: [0, 0],
      3: [0, 0],
      4: [0, 0],
      5: [0, 0],
      6: [0, 0],
    };

    rawData.forEach(row => {
      if (row.day_part) {
        if (formattedData[row.day_part][0] >= 0) {
          formattedData[row.day_part][0]++;
          if (row.tts) formattedData[row.day_part][1] += parseInt(row.tts);
        }
      }
    });

    const ctx = document.getElementById('customersPerDayPart').getContext('2d');

    window.customersPerDayPartChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Breakfast', 'Lunch', 'Afternoon', 'Dinner', 'Evening', 'Late Night'],
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
      <h2>Avg. Customers per Day Part</h2>
      <div className="barChart-container">
        <canvas id="customersPerDayPart" ></canvas>
      </div>
    </div>
  );
};

export default CustomersPerDayPart;
