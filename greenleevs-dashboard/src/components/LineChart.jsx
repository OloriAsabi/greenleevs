import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const LineChart = () => {

  return (
    <div className='rounded shadow shadow-gray bg-[#f5f5f5] p-10'>
    <h1 className='text-2xl font-bold pb-5'>Weekly Sales</h1>  
    <Line
      data={{
        responsive: true,
        labels:  ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // Step 2: rename to labelsArray
        datasets: [
          // Step 5: Add all datasets
          {
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(0, 179, 25, 0.2)',
            borderColor: 'rgba(0, 179, 25, 1)',
            fill: true,
            tension: 0.1
          },
          {
            label: 'Orders',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: true,
            tension: 0.1
          },
        ],
      }}
      height={400}
      width={600}
      options={{
        scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: true,
        //       },
        //     },
        //   ],
        },
        legend: {
          labels: {
            fontSize: 40,
          },
        },
      }}
    />
  </div>
);
}

export default LineChart