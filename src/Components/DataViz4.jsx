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

const DataViz4 = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        axios.get('/api/vehicle-types')
            .then(response => {
                const data = response.data;
                setChartData({
                    labels: data.labels,
                    datasets: [{
                        label: 'Vehicle Type Count',
                        data: data.counts,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }],
                });
            })
            .catch(error => {
                console.error('Error fetching vehicle types data:', error);
            });
    }, []);

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
                text: 'Count of Vehicles by Type',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Vehicle Type',
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

    if (Object.keys(chartData).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full p-5 m-3 my-5 bg-white shadow-lg border border-dark rounded box-border"
            style={{ height: '400px' }}>
            <h2 className="text-center">Vehicle Count by Type</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default DataViz4;
