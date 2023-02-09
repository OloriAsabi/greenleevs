import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { GetWeeklySales } from '../apis/api';
ChartJS.register(...registerables);

const LineChart = () => {
  const [weeklySales, setWeeklySales] = useState([]);
  useEffect(() => {
    GetWeeklySales()
    .then((response) => {
    const data = response.data.data     
      setWeeklySales(data)
    }).catch((e) => {
    console.log(e);
    });
  },[]);


  return (
    <div className='rounded shadow shadow-gray bg-[#f5f5f5] p-10'>
    <h1 className='text-2xl font-bold pb-5'>Weekly Sales</h1>  
    <Line
      data={{
        responsive: true,
        labels: weeklySales?.map((days) => days.day),
        datasets: [
          {
            label: 'Sales',
            data:  weeklySales?.map((days) => days.sales),
            backgroundColor: 'rgba(0, 179, 25, 0.2)',
            borderColor: 'rgba(0, 179, 25, 1)',
            fill: true,
            tension: 0.1
          },
          {
            label: 'Orders',
            data: weeklySales?.map((days) => days.orders),
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