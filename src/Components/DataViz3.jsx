import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

// Register the necessary components for Pie chart
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

const chartOptions = {
    responsive: true, // This will make the chart responsive to the parent container size
    plugins: {
        legend: {
            position: 'top',
            align: 'center',
        },
        title: {
            display: true,
            text: 'Vehicle Conditions',
            position: 'top',
        },
    },
};

const DataViz3 = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('/api/vehicle-conditions')
            .then(response => {
                const data = response.data;
                setChartData({
                    labels: data.labels,
                    datasets: [{
                        label: 'Vehicle Condition',
                        data: data.counts,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#F7464A',
                            '#949FB1',
                            '#AC64AD'
                        ],
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#F7464A',
                            '#A8B3C5',
                            '#BF7D82'
                        ]
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching pie chart data:', error);
            });
    }, []);

    if (!chartData) {
        return <div>Loading...</div>;
    }
    const chartContainerStyle = {
        // This centers the container
        maxHeight: '1000px',
        display: 'flex',
        justifyContent: 'center', // These two flex properties center the child horizontally and vertically
        alignItems: 'center'
    };


    return (
        <div className="content  p-1 m-3 my-5 bg-white shadow-lg border border-dark rounded box-border">
            <div style={chartContainerStyle}>
                <div className="flex justify-center items-center p-5 md:p-1 ">
                    <div className="relative" style={{ width: '100%'}}>
                        <h2 className="text-center text-xl font-bold mb-1">Vehicle Conditions</h2>
                        <Pie data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataViz3;
