import React from 'react'
import { Pie } from 'react-chartjs-2'


const PieChart = () => {
  return (
    <div className='rounded shadow shadow-gray bg-[#f5f5f5] p-10'>
    <h1 className='text-2xl font-bold pb-5'>Best Selling Products</h1>  
    <Pie
      data={{
        responsive: true,
        labels: ['Tropical', 'CBD', 'THC', 'Extract'],
        datasets: [
          {
            label: '# of votes',
            data: [12, 19, 3, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }}
      height={400}
      width={600}
      options={{
        legend: {
          labels: {
            fontSize: 25,
          },
        },
      }}
    />
  </div>
  )
}

export default PieChart