import moment from 'moment';
import { jsPDF } from 'jspdf';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

let chartInstance = null;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateSalesChart(items) {
    const labels = items.map(item => item.item_name);
    const data = items.map(item => item.quantity);
    const backgroundColors = items.map(() => getRandomColor());
    const borderColors = backgroundColors.map(color => color);
    
    if(chartInstance != null){
        chartInstance.destroy();
    }

    const ctx = document.getElementById('salesChart').getContext('2d');
    
    Chart.register(ChartDataLabels);
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantity Sold',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: '#000',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value;
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.datasets[0].data.map((value, index) => {
                                return {
                                    text: `${data.labels[index]} `,
                                    fillStyle: data.datasets[0].backgroundColor[index],
                                    hidden: false,
                                    index: index
                                };
                            });
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            const chartImage = document.getElementById('salesChart').toDataURL('image/png');
            resolve(chartImage);
        }, 1000); // Give some time for the chart to render
    });
}

export default generateSalesChart;