
class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.passengers = [];
    this.waitingList = [];
    this.direction = "Up";
    this.interval;
  }

  start() {
    this.interval = setInterval(() => this.update(), 1000);
   }
  stop() { 
    clearInterval(this.interval);
  }
  update() { 
    this.requests.sort((a,b)=> {
      if(this.direction === "Up") {
       if(a > this.floor && b > this.floor){
         return a-b;
       } else if(a > this.floor && b < this.floor) {
        return -1;
       } else if (a < this.floor && b > this.floor) {
        return 1;
       }
      } else {
        if(a < this.floor && b < this.floor){
          return b - a;
        } else if(a > this.floor && b < this.floor) {
          return 1;
        } else if (a < this.floor && b > this.floor) {
          return -1;
        }
      }
    });

    this.log();
    this._passengersEnter();
    this._passengersLeave();
    if (this.requests.length > 0 ){
      if (this.requests[0] < this.floor ){
        this.direction = "Down";
        this.floorDown();
      } else if (this.requests[0] > this.floor ){
        this.direction = "Up";
        this.floorUp();
      } else {
        this.requests.shift();
      }
    } else {
      this.stop();
    }
  }
  _passengersEnter() {
    this.waitingList.forEach((person) => {
      if (person.originFloor === this.floor){
        this.passengers.push(person);
        this.waitingList.splice(this.waitingList.indexOf(person), 1);
        this.requests.push(person.destinationFloor);
        console.log(`${person.name} has enter the elevator`);
      }
    });
   }
  _passengersLeave() { 
    this.passengers.forEach((person) => {
      if (person.destinationFloor === this.floor){
        this.passengers.splice(this.passengers.indexOf(person), 1);
        console.log(`${person.name} has left the elevator`);
      }
    });
  }
  floorUp() { 
    return this.floor >= 0 && this.floor < this.MAXFLOOR ? this.floor++ : console.log("Can't pursue the request");
  }
  floorDown() { 
    return this.floor > 0 && this.floor <= this.MAXFLOOR ? this.floor-- : console.log("Can't pursue the request");
  }
  call(person) { 
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }
  log() { 
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}



module.exports = Elevator;
