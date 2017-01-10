gymApp.controller('statisticsCtrl', function ($scope, $stateParams, User) {

  Highcharts.chart('container', {

    chart: {
      type: 'column'
    },
    title: {
      text: 'مقارنة بين الاشتراكات الشهرية'
    },
    xAxis: {
      categories: ['175', '200', '225']
    },
    yAxis: {
      title: {
        text: 'العدد'
      }
    },
    series: [{
      name: '175',
      data: [100, 0, 0]
    }, {
      name: '200',
      data: [0, 200, 0]
    }, {
      name: '225',
      data: [0, 0, 100]
    }]
  });
})