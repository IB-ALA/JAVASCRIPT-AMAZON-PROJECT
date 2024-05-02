

class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    // this.speed = 0;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h. Trunk is ${this.isTrunkOpen ? 'opened' : 'closed'}.`);
  }

  go() {
    if (((this.speed >= 0 && this.speed < 200) && this.speed + 5 <= 200) && !this.isTrunkOpen) {
      this.speed+=5; 
    }
  }

  brake() {
    if ((this.speed >= 0 && this.speed < 200 && (this.speed - 5 >= 0))) {
      this.speed-=5; 
    }
  }

  openTrunk() {
    if (this.speed = 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    if (this.speed >= 0 && this.speed < 200) {
      this.isTrunkOpen = false;
    }
  }
}

class RaceCar extends Car {
  acceleration; 
  // isTrunkOpen

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }


  go() {
    if (((this.speed >= 0 && this.speed < 300) && this.speed + this.acceleration <= 300) && !this.isTrunkOpen) {
      this.speed+=this.acceleration; 
    }
  }

  openTrunk() {
    return;
  }

  closeTrunk() {
    return;
  }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});

const raceCar1 = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20});

// console.log(car1);
// console.log(car2);
console.log(raceCar1);
// car1.displayInfo();
// car2.displayInfo();
raceCar1.displayInfo();

// car1.go();
// car2.go();
// car1.go();
// car2.go();
// car2.go();

raceCar1.go();
// raceCar1.model = 'F2';
// car2.go();

// car1.brake();
// car2.brake();

// car1.closeTrunk();
// car1.go();
// car2.


// car1.displayInfo();
// car2.displayInfo();
raceCar1.displayInfo();

// WE MADE SPEED PRIVATE AND LEARNT THAT PRIVATE PROPERTOES ARE NOT INHERITED BY CHILDREN CLASSES. 
// IN OTHER LANGUAGES THERE IS ONE FEATURE CALLED THE 'PROTECTED', SIMILAR TO 'PRIVATE PROPERTY' BUT OOP IS NOT POPULAR IS JS SO IT'S MISSING SOME FEATURES.

