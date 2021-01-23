let Chart = require('chart.js');
let vars = require('./vars.js');
let chartInfoRendering = chartInfoRendering_();

function chartInfoRendering_() {
    let canvas = document.getElementById("chart");
    let ctx = canvas.getContext("2d");
    // Chart defaults
    Chart.defaults.global.defaultFontColor = '#fff';
    // A new chart
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
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
                text: 'Eye offset by time'
            },
            legend: {
                display: false
            },
            animation: {
                duration: 0
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Time"
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Y - coordinate eye offset"
                    },
                    ticks: {
                        stepSize: 10
                    }
                }]
            }
        }
    })

    return function (xLabels, yLabels) {
        myChart.data.labels = xLabels;
        myChart.data.datasets[0].data = yLabels;
        myChart.update();
    }
}

// The function updates xLabels and yLabels in chart
function chartLabelAndDataGenerate(currDate, currPosY, XandYmaxLength) {
    pushLabelAndDataInfo(currDate, currPosY);

    if (vars.chartXlabels.length == XandYmaxLength + 1)
        cutLabelAndDataInfo();

    chartInfoRendering(vars.chartXlabels, vars.chartYlabels);
}

// The function adds the last elements to vars.chartXlabels and vars.chartYlabels
function pushLabelAndDataInfo(date_, pos) {
    vars.chartXlabels.push(date_);
    vars.chartYlabels.push(pos);
}

// The function removes the first element from the coordinate array
function cutLabelAndDataInfo() {
    vars.chartXlabels.splice(0, 1);
    vars.chartYlabels.splice(0, 1);
}

module.exports = {
    "chartLabelAndDataGenerate": chartLabelAndDataGenerate
}