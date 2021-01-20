let Chart = require('chart.js');

function printChart() {
    let canvas = document.getElementById("chart");
    let ctx = canvas.getContext("2d");
    let myChart;

    let xLabels = [];

    return function () {
        // myChart = new Chart(ctx, {
        //     type: 'line',
        //     data: {
        //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //         datasets: [{
        //             label: 'STH',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 'transparent'
        //             ],
        //             borderColor: [
        //                 '#fff'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         title: {
        //             display: true,
        //             fontColor: '#fff',
        //             text: "TITLE"
        //         },
        //         scales: {
        //             xAxes: [{
        //                 scaleLabel: {
        //                     fontColor: '#fff',
        //                     display: true,
        //                     labelString: "XXX"
        //                 },
        //                 ticks: {
        //                     beginAtZero: true
        //                 }
        //             }],
        //             yAxes: [{
        //                 scaleLabel: {
        //                     fontColor: '#fff',
        //                     display: true,
        //                     labelString: "YYY"
        //                 },
        //                 ticks: {
        //                     beginAtZero: true
        //                 }
        //             }]
        //         }
        //     }
        // });

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xLabelsGenerator(xLabels),
                datasets: [{
                    data: yLabelsGenerator(),
                    backgroundColor: [ 'transparent' ],
                    pointBackgroundColor: '#999',
                    lineTension: 0,
                    borderColor: '#fff',
                    borderWidth: '2'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'TITLE'
                },
                legend: {
                    display: false
                }
            }
        })

        Chart.defaults.global.defaultFontColor = '#fff';
    }
}

function xLabelsGenerator(labels) {
    return [1, 2, 3, 4, 5, 6, 7];
}

function yLabelsGenerator() {
    return [240, 241, 237, 238, 245, 250, 241];
}

module.exports = {
    "printChart": printChart()
}