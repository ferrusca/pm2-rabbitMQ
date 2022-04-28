const fabObj = require('../math-logic/fibonacci-series')

process.on('message', number => {
    const result = fabObj.calculateFibonacciValue(number);
    console.log('Fibonacci series worker2 with PID ', process.pid);
    process.send(result);
})