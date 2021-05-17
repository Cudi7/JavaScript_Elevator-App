import Elevator from './Elevator.js';

//select all btns
const AllbuttonFloor = document.querySelectorAll('.btn-floor');
const ELEVATOR_TOTAL_DISTANCE = 392; // total distance from bottom to top
const ELEVATOR_FLOOR_DISTANCE = 65.33; // total distance each floor

// generates instace of a class Elevator
const elevator = new Elevator(ELEVATOR_TOTAL_DISTANCE, ELEVATOR_FLOOR_DISTANCE);

//return current elevator position and elevator element
const elevatorPosition = () => {
  const elevator = document.querySelector('.elevator');

  const style = getComputedStyle(elevator);
  return [style.bottom.split('px')[0], elevator];
};

//handle click event
function handleClick(e) {
  elevator.buttonPressed(e.target);
}

//listen to click event on  each btn
AllbuttonFloor.forEach((btn) => btn.addEventListener('click', handleClick));

export { elevatorPosition, elevator };
