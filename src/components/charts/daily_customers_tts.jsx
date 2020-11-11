import React, { useEffect } from 'react';
import Chart from 'chart.js';
import { getFormattedDate } from '../../utils/data_formatting_utils';

const DailyCustomersTTS = ({ rawData }) => {
  useEffect(() => {
    if (window.dailyCustomersTTSChart && window.dailyCustomersTTSChart !== null) {
      window.dailyCustomersTTSChart.destroy();
    }

    const formattedData = {};
    
    rawData.forEach(row => {
      if (row.first_seen_utc) {
        const date = getFormattedDate(row.first_seen_utc);
        
        if (!formattedData[date]) formattedData[date] = [0, 0];
        formattedData[date][0]++;
        formattedData[date][1] += parseInt(row.tts);
      }
    })
    
    const ctx = document.getElementById('dailyCustomersTTS').getContext('2d');
    
    window.dailyCustomersTTSChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(formattedData),
        datasets: [{
          label: 'Customers',
          data: Object.values(formattedData).map(value => value[0]),
          backgroundColor: '#3BA3F2',
          borderColor: '#3BA3F2',
          fill: false
        }, {
          label: 'Avg TTS (seconds)',
          data: Object.values(formattedData).map(value => Math.round(value[1] / value[0])),
          backgroundColor: '#FBD533',
          borderColor: '#FBD533',
          fill: false
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
      <h2>Daily Customers and TTS</h2>
      <div className="barChart-container">
        <canvas id="dailyCustomersTTS" ></canvas>
      </div>
    </div>
  );
};

export default DailyCustomersTTS;
