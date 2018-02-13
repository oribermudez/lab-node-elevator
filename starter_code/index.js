const Elevator = require('./elevator.js');
const Person = require('./person.js');

var myElevator = new Elevator;
var myJulia = new Person("Julia", 4, 6);
var myPeter = new Person("Peter", 7, 1);
var myBet = new Person("Bet", 2, 10);
var myOri = new Person("Ori", 8, 0);
var myRaul = new Person("Raul", 5, 0);


myElevator.start();
myElevator.call(myJulia);
myElevator.call(myPeter);
myElevator.call(myBet);
myElevator.call(myOri);
myElevator.call(myRaul);
