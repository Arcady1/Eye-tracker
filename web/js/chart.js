let Chart = require('chart.js');

function printChart() {
    let canvas = document.getElementById("chart");
    let ctx = canvas.getContext("2d");
    let myChart;

    return function () {
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'transparent'
                    ],
                    borderColor: [
                        '#fff'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    fontColor: '#fff',
                    text: "TITLE"
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            fontColor: '#fff',
                            display: true,
                            labelString: "XXX"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            fontColor: '#fff',
                            display: true,
                            labelString: "YYY"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

module.exports = {
    "printChart": printChart()
}