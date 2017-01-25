"use strict";

/**
 * constructor for object TruthTableNN
 */
function TruthTableNN(numberOfCombinations) {
    /**
     * start of defining basic data
     */
    this.truthTable = {
        ActivateFunction: [],
        x1: [],
        x2: [],
        w1: 0,
        w2: 0,
        eta: 0,
        bias: -0.2,
        threshold: 0.1,
        error: [],
        learningPercentage: 0,
        net: []
    };

    this.perceptron = {
        weights: {
            w1: [],
            w2: []
        },

        net: [],
        ActivateFunction: [],
        learningPercentage: 0,
        lastLearningValue: 0
    };



    for (var i = 0; i < numberOfCombinations; i++) {
        this.truthTable["x1"].push((i & 2) == 0 ? 1 : 0);
        this.truthTable["x2"].push((i & 1) == 0 ? 1 : 0);
    }

    this.truthTable['x1'].reverse();
    this.truthTable['x2'].reverse();

    /**
     * sets w1, w2  and eta values
     */

    this.setWeightsAndEta = function (w1, w2, eta) {
        this.truthTable['w1'] = w1;
        this.truthTable['w2'] = w2;
        this.truthTable['eta'] = eta;
    }

    /**
     * this function does the basic truth table operations.
     * Currently defined : [AND, OR, XOR]
     */
    this.truthTableOperations = function (operationName) {
        switch (operationName) {
            case 'AND' || 'and' || '&&':
                this.truthTable['andGateResult'] = [];
                for (var i = 0; i < this.truthTable['x1'].length; i++) {
                    this.truthTable['andGateResult'][i] = (this.truthTable['x1'][i] && this.truthTable['x2'][i]);
                }
                break;

            case 'OR' || 'or' || '||':
                this.truthTable['orGateResult'] = [];
                for (var i = 0; i < this.truthTable['x1'].length; i++) {
                    this.truthTable['orGateResult'][i] = (this.truthTable['x1'][i] || this.truthTable['x2'][i]);
                }
                break;

            case 'XOR' || 'xor':
                this.truthTable['xorGateResult'] = [];
                for (var i = 0; i < this.truthTable['x1'].length; i++) {
                    if ((this.truthTable['x1'][i] !== this.truthTable['x2'][i])) {
                        this.truthTable['xorGateResult'][i] = 0;
                    } else {
                        this.truthTable['xorGateResult'][i] = 0;
                    }
                }
                break;

            default:
                console.log('undefined operation');
                break;
        }
    }

    /**
     * this function calculates the net function.
     */
    this.calculateNetFunction = function (w1, w2, netArray) {

        for (var i = 0; i < this.truthTable['x1'].length; i++) {
            netArray[i] = (Number(((this.truthTable['x2'][i] * w2) + (this.truthTable['x1'][i] * w1) + this.truthTable['bias']).toFixed(1)));

            if (netArray[i] === -0)
                netArray[i] = 0;
        }
    }

    /**
     * This function calculates the activate function according to the passed activateFunctionName
     */
    this.calculateActivateFunction = function (activateFunctionName, netArray, resultArray) {
        switch (activateFunctionName.toLowerCase()) {
            case 'sigmoid':
                resultArray['sigmoid'] = [];
                for (var i = 0; i < netArray.length; i++) {
                    var sigmoidEquation = 1 / (1 + Math.exp(-netArray[i]));
                    resultArray['sigmoid'][i] = (sigmoidEquation + ", And belongs to class " + (sigmoidEquation > this.truthTable["threshold"] ? "1" : "2"));
                }
                break;

            case 'bipolar':
                resultArray['bipolar'] = [];
                for (var i = 0; i < netArray.length; i++) {
                    resultArray['bipolar'][i] = ((netArray[i] >= 0 ? 1 : -1));
                }

            case 'binary':
                resultArray['binary'] = [];
                for (var i = 0; i < netArray.length; i++) {
                    resultArray['binary'][i] = ((netArray[i] >= this.truthTable.threshold ? 1 : 0));
                }

            default:
                break;
        }

    }

    /**
     * calculates the error between the ground truth & actual result from net function
     */
    this.calculateError = function (gateType, netArray) {
        for (var i = 0; i < netArray.length; i++) {
            this.truthTable['error'][i] = this.truthTable[gateType.toLowerCase() + 'GateResult'][i] - this.truthTable['ActivateFunction'][functionType.toLowerCase()][i];
        }
    }

    /**
     * calculates the learning percantage between actual and target
     */
    this.calculateLearningPercentage = function (gateType, functionType, learningArray, compareToArray) {
        for (var i = 0; i < this.truthTable[gateType.toLowerCase() + 'GateResult'].length; i++) {
            if (this.truthTable[gateType.toLowerCase() + 'GateResult'][i] === compareToArray[i]) {
                learningArray.learningPercentage = Number(learningArray.learningPercentage + 25);
            }
        }
    }

    /**
     * applies perceptron algorithm
     */
    this.calculatePerceptron = function (gateType, functionType) {
        this.calculateError(gateType, this.truthTable['net']);

        var epochs = 5;
        var iterations = this.truthTable['x1'].length;
        var equalEpochResult = 0;


        for (var i = 0; i < epochs; i++) {
            for (var j = 0; j < iterations; j++) {
                if (j === 0) {
                    this.perceptron['weights']['w1'][j] = (this.truthTable['w1']);
                    this.perceptron['weights']['w2'][j] = (this.truthTable['w2']);
                } else {
                    this.perceptron['weights']['w1'][j] =
                        Number((this.perceptron['weights']['w1'][j - 1] + (this.truthTable['eta'] * this.truthTable['error'][j] * this.truthTable['x1'][j])).toFixed(2));

                    // console.log(`${this.perceptron['weights']['w1'][j - 1]} + ${this.truthTable['eta']} * ${this.truthTable['error'][j]} * ${this.truthTable['x2'][j]} = ${(this.perceptron['weights']['w1'][j - 1] + (this.truthTable['eta'] * this.truthTable['error'][j] * this.truthTable['x1'][j]))}`);
                    this.perceptron['weights']['w2'][j] =
                        Number((this.perceptron['weights']['w2'][j - 1] + (this.truthTable['eta'] * this.truthTable['error'][j] * this.truthTable['x2'][j])).toFixed(2));

                    // console.log(`${this.perceptron['weights']['w2'][j - 1]} + ${this.truthTable['eta']} * ${this.truthTable['error'][j]} * ${this.truthTable['x2'][j]} = ${(this.perceptron['weights']['w2'][j - 1] + (this.truthTable['eta'] * this.truthTable['error'][j] * this.truthTable['x2'][j]))}`);

                }
            }

            this.truthTable.w1 = this.perceptron.weights.w1[3];
            this.truthTable.w2 = this.perceptron.weights.w2[3];

            this.calculateNetFunction(this.truthTable.w1, this.truthTable.w2, this.perceptron['net']);
            this.calculateActivateFunction(functionType, this.perceptron.net, this.perceptron.ActivateFunction);
            this.calculateLearningPercentage(gateType, functionType, this.perceptron, this.perceptron.ActivateFunction[functionType.toLowerCase()]);

            this.perceptron.lastLearningValue = this.perceptron.learningPercentage;
            this.perceptron.learningPercentage = 0;

            console.log(this.perceptron);
            console.log("\n\n");

            // if (this.perceptron.learningPercentage < 75 && epochs < 10) {
            //     this.perceptron.learningPercentage = 0;
            //     epochs++;
            // }

            // if ((this.perceptron.learningPercentage < this.truthTable.learningPercentage) || !(this.perceptron.learningPercentage > 75) && equalEpochResult < 3) {
            //     this.perceptron.learningPercentage = 0;
            //     epochs++;

            // } else if (this.perceptron.learningPercentage === this.truthTable.learningPercentage) {
            //     equalEpochResult++;
            // }
        }

        console.log(`done in ${epochs} epochs with w1 = ${this.perceptron['weights']['w1'][3]} w2 = ${this.perceptron['weights']['w2'][3]}`);
        // console.log(equalEpochResult);
    }


};


var newTable = new TruthTableNN(4);
var gateType = 'AND';
var functionType = 'Binary';


newTable.setWeightsAndEta(0.3, -0.1, -0.1);


/**
 * ground truth
 */
newTable.truthTableOperations(gateType);

/**
 * actual after applying net function
 */
newTable.calculateNetFunction(newTable.truthTable.w1, newTable.truthTable.w2, newTable.truthTable.net);

/**
 * to change values according to some activate function
 */
newTable.calculateActivateFunction(functionType, newTable.truthTable.net, newTable.truthTable.ActivateFunction);

newTable.calculateLearningPercentage(gateType, functionType, newTable.truthTable, newTable.truthTable.ActivateFunction[functionType.toLowerCase()]);

newTable.calculatePerceptron(gateType, functionType);


/** 
 * Step function, there must be a threshold or table will has something wrong.
 * check the functions and run them again
 */