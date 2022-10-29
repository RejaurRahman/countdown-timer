const countdownForm = document.getElementById("countdownForm");
const inputContainer = document.getElementById("inputContainer");
const countdownDatePicker = document.getElementById("datePicker");
const countdown = document.getElementById("countdown");
const countdownMainTitle = document.getElementById("countdownTitle");
const countdownButton = document.getElementById("countdownButton");
const countdownTime = document.querySelectorAll("span");
const countdownComplete = document.getElementById("complete");
const countdownCompleteInfo = document.getElementById("completeInfo");
const countdownCompleteButton = document.getElementById("completeButton");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min & Value with Today"s Date
const today = new Date().toISOString().split("T")[0];
countdownDatePicker.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Input
    inputContainer.hidden = true;

    // If the countdown has ended, show final state
    if (distance < 0) {
      countdown.hidden = true;
      clearInterval(countdownActive);

      countdownCompleteInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;

      countdownComplete.hidden = false;
    } else {
      // else, show the countdown in progress
      countdownMainTitle.textContent = `${countdownTitle}`;
      countdownTime[0].textContent = `${days}`;
      countdownTime[1].textContent = `${hours}`;
      countdownTime[2].textContent = `${minutes}`;
      countdownTime[3].textContent = `${seconds}`;
      countdownComplete.hidden = true;
      countdown.hidden = false;
    }
  }, second);
}

function updateCountdown(e) {
  e.preventDefault();

  // Set title and date, save to localStorage
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  // Check if no date entered
  if (countdownDate === "") {
    alert("Please select a date for the countdown.");
  } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();

    updateDOM();
  }
}

function reset() {
  // Hide countdowns, show input form
  countdown.hidden = true;
  countdownComplete.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);

  // Reset values, remove localStorage item
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));

    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();

    updateDOM();
  }
}

// Event Listener
countdownForm.addEventListener("submit", updateCountdown);
countdownButton.addEventListener("click", reset);
countdownCompleteButton.addEventListener("click", reset);

// On Load, check localStorage
restorePreviousCountdown();
