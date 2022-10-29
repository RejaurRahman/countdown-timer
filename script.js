const inputContainer = document.getElementById("inputContainer");
const countdownForm = document.getElementById("countdownForm");
const dateField = document.getElementById("datePicker");

// Set date input to today's date
const today = new Date().toISOString().split("T")[0];
dateField.setAttribute("min", today);
