const fabObj = require('../math-logic/fibonacci-series')

process.on('message', number => {
    let result = fabObj.calculateFibonacciValue(number)
    console.log('Fibonacci series worker1 with PID ', process.pid)
    process.send(result) 
})