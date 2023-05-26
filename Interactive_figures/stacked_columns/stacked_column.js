document.addEventListener('DOMContentLoaded', async function() {
    window.linkText = localStorage.getItem('linkText'); // Retrieve the link text from localStorage
    console.log(window.linkText);
    let jsondata;
    fetch('https://pankb.blob.core.windows.net/data/PanKB/Interactive_figures/data/' + window.linkText + '/stacked_column.json').then(
        function(u){ return u.json();}
    ).then(
        function(json){
            jsondata = json;

            // Get the window's height
            let iframeHeight = window.innerHeight;


            const chart = Highcharts.chart('container', {
                chart: {
                    type: 'column',
                    marginRight: 80,
                    marginLeft: 80,
                    height: iframeHeight - 30
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '',
                    align: 'center'
                },
                xAxis: {
                    categories: jsondata.categories,
                    labels:{
                        rotation: 315,
                        padding: 0.1,
                        style:{
                            fontSize: "12px"
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Count'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            fontSize: "12px",
                            color: ( // theme
                                Highcharts.defaultOptions.title.style &&
                                Highcharts.defaultOptions.title.style.color
                            ) || 'gray',
                            textOutline: 'none'
                        }
                    }
                },
                legend: {
                    align: 'center', // align to center
                    verticalAlign: 'top', // align to top
                    y: 25,
                    floating: true,
                    backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: 'Core',
                    data: jsondata.Core
                }, {
                    name: 'Accessory',
                    data: jsondata.Accessory
                }, {
                    name: 'Rare',
                    data: jsondata.Rare
                }]
            });
        }
    )

})