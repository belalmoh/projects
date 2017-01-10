var sysModelingAssignment = angular.module('sysModelingAssignment', []);

sysModelingAssignment.controller('sysModelingCtrl', function ($scope) {

    $scope.givens = {
        clockRate: null,
        clockTime: null,
        cpi: null,
        ipc: null,
        ic: null,
        frequency: null,
    };

    $scope.calc = {
        executionTime: null,
        time: null,
        instructionTime: null,
        clockCycle: null,
        clockCycleTime: null,
    };

    $scope.todo = {
        performance: {
            isNeeded: false,
            first: false,
            second: false
        },
        executionTime: {
            isNeeded: false,
            first: false
        },
        instructionTime: {
            isNeeded: false,
            first: false,
            second: false,
            third: false
        },
        mips: {
            isNeeded: false,
            first: false
        },
        cpuExec: {
            isNeeded: false,
            first: false,
            second: false,
            third: false,
        },
        cpuClock: {
            isNeeded: false,
            first: false
        }
    };

    $scope.result = {
        performance: {
            one: null,
            many: []
        },
        executionTime: {
            one: null,
            many: []
        },
        instructionTime: {
            one: null,
            many: []
        },
        Mips: {
            one: null,
            many: []
        },
        cpuExecutionTime: {
            one: null,
            many: []
        },
        cpuClockCycle: {
            one: null,
            many: []
        },
        isAllNull: true
    }

    $scope.isChecked = function (element) {
        $scope.todo[element].isNeeded = !$scope.todo[element].isNeeded;
    };

    $scope.isSelected = function (element, subelement) {
        var objectLength = Object.keys($scope.todo[element]).length;
        for (var i = 0; i < objectLength; i++) {
            if ($scope.todo[element].hasOwnProperty(subelement[0]) && i === 0) {
                $scope.todo[element][subelement[i]] = true;
            } else {
                $scope.todo[element][subelement[i]] = false;
            }
        }

        // console.log($scope.todo[element].hasOwnProperty(subelement[0]));
    };


    $scope.calculateEq = function (result, elementName) {
        $scope.result.isAllNull = false;

        $scope.result[elementName].one = eval(result);
        $scope.result[elementName].many.push(eval(result));

        console.log($scope.result[elementName].many);
    };


    $scope.comparisonX = {
        name: "",
        data: []
    };
    $scope.comparisonY = {
        name: "",
        data: []
    };

    $scope.setXandY = function (name, data, flag) {

        if (flag === 'x') {
            $scope.comparisonX.name = name;
            $scope.comparisonX.data = data;
        } else {
            $scope.comparisonY.name = name;
            $scope.comparisonY.data = data;
        }

        console.log(data);

        $scope.drawGraph();
    }

    $scope.drawGraph = function () {
        Highcharts.chart('graph', {

            chart: {
                type: 'line'
            },
            title: {
                text: 'Comparison between ' + $scope.comparisonX.name + ' and ' + $scope.comparisonY.name
            },
            xAxis: {
                title: {
                    text: 'X'
                }
            },
            yAxis: {
                title: {
                    text: 'Y'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: $scope.comparisonX.name,
                data: $scope.comparisonX.data
            }, {
                name: $scope.comparisonY.name,
                data: $scope.comparisonY.data
            }]
        });
    }

    /** 
     * List of rules.
     * 1) Performance = 1 / Execution Time
     * 
     *      1.1) Performance = IPC * Freq / Ic == Ic / CPI * Freq .. etc
     *      
     *      1.2) Execution = vise-versa of performance
     * 
     * 2) Execution Time = Ic * Instruction Time
     * 
     * 3) Instruction Time = T * CPI == CPI / Freq == 1 / IPC * Freq
     * 
     * 4) MIPS = ClockRate / CPI * 10^6
     * 
     * 5) CPU ExecTime = ClockCycle / ClockRate == ClockCycle * ClockCycleTime
     * 
     * 6) CPU ClockCycles = IC * CPI
     * 
     * 7) CPU ExecTime = IC * CPI / ClockRate  
     */

});