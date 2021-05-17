import { elevator } from './script.js';
let timeOutIdUp;
let timeOutIdDown;

//add class green active
const buttonAddActive = (button) => button.classList.add('active');

//remove class green active and check queue
const buttonRemoveActive = (button) => {
  button.classList.value = 'btn-floor floor';
  elevator.resetValues();
  checkQueue();
};

const checkQueue = () => {
  const queue = elevator.getQueue();

  if (queue.length) elevator.handleNormalMove();
};

//moveUp, if we are already moving, stop timeout and go to the new distance
function moveUp(distance, elevator, button) {
  if (timeOutIdUp) clearInterval(timeOutIdUp);

  timeOutIdUp = setTimeout(() => {
    elevator.style.bottom = `${distance}px`;

    setTimeout(() => buttonRemoveActive(button), 2200);
  }, 2000);
}

//moveDown, if we are already moving, stop timeout and go to the new distance
function moveDown(distance, elevator, button) {
  if (timeOutIdDown) clearInterval(timeOutIdDown);

  timeOutIdDown = setTimeout(() => {
    elevator.style.bottom = `${distance}px`;

    setTimeout(() => buttonRemoveActive(button), 2200);
  }, 2000);
}

export { buttonAddActive, buttonRemoveActive, moveUp, moveDown };
