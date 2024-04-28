import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
);


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Average Vehicle Prices by State',
    },
  },
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'State',
      },
    },
    y: {
      type: 'logarithmic',
      title: {
        display: true,
        text: 'Average Price (Logarithmic Scale)',
      },
      ticks: {
        callback: function (value) {
          if (value === 10000000 || value === 1000000 || value === 100000 || value === 10000 || value === 1000 || value === 100 || value === 10 || value === 1) {
            return value;
          }
        },
      },
    },
  },
};

const DataViz1 = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/average-price');
        const data = response.data;
        setChartData({
          labels: data.map(item => item.state),
          datasets: [{
            label: 'Average Vehicle Price by State',
            data: data.map(item => item.average_price),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (

    <div className="chart-container bg-white shadow-lg p-5 m-5 border border-dark border-3 rounded" style={{ height: '400px', width:"100%" }}>
      <h2 className="text-center">Vehicle Prices by State</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DataViz1;
