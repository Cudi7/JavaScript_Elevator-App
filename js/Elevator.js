import { elevatorPosition } from './script.js';
import { buttonAddActive, moveDown, moveUp } from './UI.js';

class Elevator {
  constructor(ELEVATOR_TOTAL_DISTANCE, ELEVATOR_FLOOR_DISTANCE) {
    this.totalDistance = ELEVATOR_TOTAL_DISTANCE;
    this.floorDistance = ELEVATOR_FLOOR_DISTANCE;

    this.floorQueue = [];

    this.currentFloor = 0;
    this.currentElevatorDistance = 0;

    this.movingUp = false;
    this.movingDown = false;
  }

  buttonPressed(button) {
    //if there are more than 2 or 3 elements on queue return, and dont to anything
    if (this.floorQueue.length >= 3) return;

    // we push new floor movement to the array and add active green class
    this.button = button;
    this.floorQueue.push(this.button);
    this.checkActiveClass();

    //movement actions for when we are already  moving up || down
    if (this.movingUp) this.handleMemoUp();
    if (this.movingDown) this.handleMemoDown();

    //movement action for when we are not moving (  normal movement)
    if (!this.movingUp && !this.movingDown) this.handleNormalMove();
  }

  checkActiveClass() {
    if (this.floorQueue.length === 1) buttonAddActive(this.button);

    [this.currentElevatorDistance, this.elevator] = elevatorPosition();
    const buttonPressedDistance =
      Number(this.button.innerText) * this.floorDistance;
    const currentPosition = Number(this.currentElevatorDistance);

    if (this.movingUp && currentPosition <= buttonPressedDistance) {
      buttonAddActive(this.button);
    }
    if (this.movingDown && currentPosition >= buttonPressedDistance) {
      console.log('moving down greeeen');
      buttonAddActive(this.button);
    }
  }

  handleNormalMove() {
    [this.currentElevatorDistance, this.elevator] = elevatorPosition();
    //check the current elevator position and save it to currentElevatorDistance
    this.floorToTravelDistance =
      Number(this.floorQueue[0].innerText) * this.floorDistance;

    this.floorToTravelDistance >= Number(this.currentElevatorDistance)
      ? this.moveTo('up')
      : this.moveTo('down');
  }

  handleMemoUp() {
    [this.currentElevatorDistance, this.elevator] = elevatorPosition();

    //we are moving up, so we need to sort the floors - ascending order
    this.floorQueue = this.floorQueue.sort((a, b) => a.innerText - b.innerText);

    this.floorToTravelDistance =
      Number(this.floorQueue[0].innerText) * this.floorDistance;

    // console.log('traveling to floor... : ');
    // console.log(this.floorToTravelDistance);
    // console.log('elevator current distance...:');
    // console.log(Number(this.currentElevatorDistance));

    const position =
      this.floorToTravelDistance >= Number(this.currentElevatorDistance);
    //if true, we can go, othwise we have already passed
    if (position) this.moveTo('up');
  }

  handleMemoDown() {
    [this.currentElevatorDistance, this.elevator] = elevatorPosition();

    //we are moving down, so we need to sort the floors -  descending
    this.floorQueue = this.floorQueue.sort((a, b) => b.innerText - a.innerText);

    this.floorToTravelDistance =
      Number(this.floorQueue[0].innerText) * this.floorDistance;
    // console.log('traveling to floor... : ');
    // console.log(this.floorToTravelDistance);
    // console.log('elevator current distance...:');
    // console.log(Number(this.currentElevatorDistance));

    const position =
      this.floorToTravelDistance <= Number(this.currentElevatorDistance);
    //if true, we can go, othwise we have already passed
    if (position) this.moveTo('down');
  }

  moveTo(direction) {
    if (direction === 'up') {
      this.movingUp = true;
      this.movingDown = false;

      moveUp(this.floorToTravelDistance, this.elevator, this.floorQueue[0]);
    } else {
      this.movingDown = true;
      this.movingUp = false;

      moveDown(this.floorToTravelDistance, this.elevator, this.floorQueue[0]);
    }
  }

  resetValues() {
    this.floorQueue.shift();
    this.movingDown = false;
    this.movingUp = false;
  }

  getQueue() {
    return this.floorQueue;
  }
}

export default Elevator;
