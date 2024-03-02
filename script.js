// CONVENTION
// Because years and months are not fixed size units for measuring time,
// some results may move to discussion, in the case your birthday input happens
// to be in the last or last 2 days of the month.
// The result may look strange when the evaluation is run on a 31 days month.
// More dramatic if you test the application on March, because the previous month
// is shorter than your current month.
// So the evaluation method is sort of a CONVENTION.

// Input elements
const inputYear = document.getElementById("inputyear");
const inputMonth = document.getElementById("inputmonth");
const inputDate = document.getElementById("inputdate");

// Output elements
const outputYears = document.querySelector("#outputYears");
const outputMonths = document.querySelector("#outputMonths");
const outputDays = document.querySelector("#outputDays");

// ************* Main function **************
function runScript() {
  let year = parseInt(inputYear.value);
  let month = parseInt(inputMonth.value);
  let date = parseInt(inputDate.value);

  // Check if input values are numbers in the acceptable range
  if (!checkDateInput(date)) {
    return;
  }

  if (!checkMonthInput(month)) {
    return;
  }

  if (!checkYearInput(year)) {
    return;
  }

  // Check if input date is valid. Must be past, and valid mont/date combination.
  if (!isValidPastDate(year, month, date)) {
    console.log("Invalid date or not a past date");
    alert("Please input a past valid date");
    return;
  }

  // Calculate and display the AGE
  calculateAge(year, month, date);
}

function checkDateInput(date) {
  if (isNaN(date) || date < 1 || date > 31) {
    alert(
      "Day must be a number 1 to 31. Leading zeros acceptable: 01, 02, etc."
    );
    return false;
  } else {
    return true;
  }
}

function checkMonthInput(month) {
  if (isNaN(month) || month < 1 || month > 12) {
    alert(
      "Month must be a number 1 to 12. Leading zeros acceptable: 01, 02, etc"
    );
    return false;
  } else {
    return true;
  }
}

function checkYearInput(year) {
  if (isNaN(year) || year < 1800) {
    alert("Year must be a number >= 1800, and not future year");
    return false;
  } else {
    return true;
  }
}

function isValidPastDate(year, month, date) {
  // Create a Date object with the provided year, month, and date
  // Note: Month is zero-based in JavaScript Date objects (0 - January, 11 - December)
  const inputDate = new Date(year, month - 1, date);

  // Create a new Date object for today's date
  const today = new Date();

  // The new Date() constructor might cheat us!!
  // Check if the date/month values is a valid combination
  // The returned inputDate above must match the user input value
  // Also check that the input must be a past date
  return inputDate.getDate() == date && inputDate < today;
}

function calculateAge(year, month, date) {
  // The input values
  let d1 = date;
  let m1 = month;
  let y1 = year;

  let today = new Date();

  let d2 = today.getDate();
  let m2 = today.getMonth() + 1;
  let y2 = today.getFullYear();

  // The output values. Elapsed years, months, and days  
  let y3, m3, d3; 
  
  y3 = y2 - y1;

  if (m2 >= m1) {
    m3 = m2 - m1;
  } else {
    y3--;
    m3 = 12 + m2 - m1;
  }

  if (d2 >= d1) {
    d3 = d2 - d1;
  } else {
    m3--;    
    d3 = calcD3(y1, m1, d1, y2, m2, d2)    
  }

  if (m3 < 0) {
    m3 = 11;
    y3--;
  }

  // Display and animate the outputs
  outputYears.innerHTML = y3;
  outputMonths.innerHTML = m3;
  outputDays.innerHTML = d3;

  gsap.from(".output-span", {
    opacity: 0,
    duration: 3,
    ease: "power1.out",
    stagger: 0.5,
  });
}

function clearOutputs() {
  outputYears.innerHTML = "--";
  outputMonths.innerHTML = "--";
  outputDays.innerHTML = "--";
}

function calcD3(birthYear, birthMonth, birthDay, currYear, currMonth, currDay) {
  //currMonth and birthMonth index comes in 1 to 12 basis
 let elapsedDays
 let prevMonthDays = new Date(currYear, (currMonth - 1), 0).getDate()

 let birthMonthDays = new Date(birthYear, birthMonth, 0).getDate()  

 // Solve the dilemma of the different month lengths. Leap month the worst.
 if (birthMonthDays > prevMonthDays && birthDay >= prevMonthDays) {
   elapsedDays = currDay
 } else {
   elapsedDays = prevMonthDays - birthDay + currDay
 }
 return elapsedDays  
}
