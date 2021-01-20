let Chart = require('chart.js');
let vars = require('./vars.js');

function chartInfoRendering() {
    let canvas = document.getElementById("chart");
    let ctx = canvas.getContext("2d");
    // A new chart
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLabelsGenerator(vars.chartXlabels),
            datasets: [{
                data: yLabelsGenerator(vars.chartYlabels),
                backgroundColor: ['transparent'],
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
    // Chart defaults
    Chart.defaults.global.defaultFontColor = '#fff';

    return function (currDate, currYpos) {
        // console.log(currDate, currYpos);
    }
}

function xLabelsGenerator(xLabels) {
    return [1, 2, 3, 4, 5, 6, 7];
}

function yLabelsGenerator(yLabels) {
    return [240, 241, 237, 238, 245, 250, 241];
}

module.exports = {
    "chartInfoRendering": chartInfoRendering()
}





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