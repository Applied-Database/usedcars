import React, { useEffect, useState } from 'react';
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
} from 'chart.js';

// Register the Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
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
            text: 'Count of Vehicles for Sale by Manufacturer',
        },
    },
    scales: {
        x: {
            type: 'category',
            title: {
                display: true,
                text: 'Manufacturer',
            },
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Number of Vehicles',
            }
        },
    },
};

const DataViz2 = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/vehicles/count-by-manufacturer');
                const data = response.data;
                setChartData({
                    labels: data.map(item => item[0]), // Assuming first item in array is manufacturer name
                    datasets: [{
                        label: 'Vehicle Count',
                        data: data.map(item => item[1]), // Assuming second item is the count
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
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
        <div className="chart-container bg-white shadow-lg p-5 m-5 border border-dark border-3 rounded" style={{ height: '400px', width: "100%" }}>
            <h2 className="text-center">Vehicle Count by Manufacturer</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default DataViz2;
