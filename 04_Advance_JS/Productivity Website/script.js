const list = document.querySelectorAll('.list');
const indicator = document.querySelector('.indicator');


function moveIndicator(element) {
  indicator.style.transform = `translateX(${element.offsetLeft}px)`;
}

function activeLink() {
  list.forEach(item => item.classList.remove('active'));
  this.classList.add('active');
  moveIndicator(this);
}

// Click event 
list.forEach(item => item.addEventListener('click', activeLink));

// 🔥 SET INDICATOR ON PAGE LOAD (HOME)
const activeItem = document.querySelector('.list.active');
moveIndicator(activeItem);

// Content toggling

const listItems = document.querySelectorAll(".list");
const pages = document.querySelectorAll(".page");

listItems.forEach((item, index) => {
  item.addEventListener("click", () => {

    // 1. Toggle active menu item
    listItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    // 2. Toggle content
    pages.forEach(page => page.classList.remove("active"));
    pages[index].classList.add("active");

  });
});

// To-Do List Section

var currentTaskList = [];

if (localStorage.getItem('currentTaskList')) {
  currentTaskList = JSON.parse(localStorage.getItem('currentTaskList'));
}

renderTask(); // ✅ render saved tasks on page load

let form = document.querySelector('form');
const taskInput = document.getElementById('taskInput');
const taskDescription = document.getElementById('taskDescription');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskValue = taskInput.value.trim();
  const descValue = taskDescription.value.trim();

  // remove previous errors
  taskInput.classList.remove('input-error');
  taskDescription.classList.remove('input-error');

  let hasError = false;

  if (!taskValue) {
    taskInput.classList.add('input-error');
    hasError = true;
  }

  if (!descValue) {
    taskDescription.classList.add('input-error');
    hasError = true;
  }

  // ❌ stop everything if invalid
  if (hasError) {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    return;
  }

  // ✅ valid data only 
  currentTaskList.push({
    task: taskValue,
    description: descValue,
    done: false
  });

  localStorage.setItem(
    'currentTaskList',
    JSON.stringify(currentTaskList)
  );

  taskInput.value = '';
  taskDescription.value = '';

  renderTask();
});

[taskInput, taskDescription].forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('input-error');
  });
});


function renderTask() {
  let alltasks = document.querySelector('.parent > .child:nth-child(2)');
  let sum = '';

  currentTaskList.forEach(function (elem, index) {
    sum += `
      <div class="tasks"> 
        <h5 class="${elem.done ? 'done' : ''}">${elem.task}</h5>
        <div class="btn">
          <button class="info-btn" data-index="${index}">
            <i class="ri-info-i"></i>
            <span>Info</span>
          </button>
          <button class="done-btn" data-index="${index}">
            <i class="ri-check-double-fill"></i>
            <span>Done</span>
          </button>
          <button class="complete-btn" data-index="${index}">
            <i class="ri-delete-bin-6-line"></i>
            <span>Delete</span> 
          </button>
        </div>
      </div>`;
  });

  alltasks.innerHTML = sum;
}

// logic for completing a task
let alltasks = document.querySelector('.parent > .child:nth-child(2)');

alltasks.addEventListener('click', function (e) {

  // DELETE
  if (e.target.closest('.complete-btn')) {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    const btn = e.target.closest('.complete-btn');
    const index = btn.dataset.index;

    currentTaskList.splice(index, 1);
    localStorage.setItem('currentTaskList', JSON.stringify(currentTaskList));
    renderTask();
  }

  // DONE / UNDO
  if (e.target.closest('.done-btn')) {
    const btn = e.target.closest('.done-btn');
    const index = btn.dataset.index;

    // toggle done state
    currentTaskList[index].done = !currentTaskList[index].done;

    localStorage.setItem('currentTaskList', JSON.stringify(currentTaskList));
    renderTask();
  }
  // INFO
  if (e.target.closest('.info-btn')) {
    const btn = e.target.closest('.info-btn');
    const index = btn.dataset.index;
    const infoBox = document.querySelector('.information-box');
    infoBox.innerHTML = `
      <i class="ri-close-line"></i>
      <div class="info-content">
      <h2>${currentTaskList[index].task}</h2>
      <br>
      <p>Description: ${currentTaskList[index].description}</p>
      </div>
    `;
    infoBox.style.display = 'inline-block';
    document.querySelector('.blur').style.display = 'block';
    // close info box
    infoBox.querySelector('.ri-close-line').addEventListener('click', function () {
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      infoBox.style.display = 'none';
      document.querySelector('.blur').style.display = 'none';
    });


  }

});

// Daily planner section 

var dayPlanerData = JSON.parse(localStorage.getItem('dayPlaner')) || {};
var dayPlaner = document.querySelector('.daily-planner');

var hours = Array.from({ length: 18 }, (_, idx) => `${idx + 6}:00 - ${idx + 7}:00`); // Makes an array
var wholeDaySum = '';
hours.forEach((elem, index) => {
  var savedData = dayPlanerData[`hour-${index}`] || '';
  wholeDaySum += `
    <div class="daily-planner-time">
                    <p>${elem}</p>
                    <input id=${index} type="text" placeholder="..." value="${savedData}">
                </div>
  `;
});
dayPlaner.innerHTML = wholeDaySum;

// logic to save data in local storage

var inputElements = document.querySelectorAll('.daily-planner-time input');

inputElements.forEach((inputElem, index) => {
  inputElem.addEventListener('input', () => { // Event listener is input as we want to save data as soon as user types and save it without pressing enter
    dayPlanerData[`hour-${index}`] = inputElem.value;
    localStorage.setItem('dayPlaner', JSON.stringify(dayPlanerData));
  });
});

// Quote of the day section

const ONE_DAY = 24 * 60 * 60 * 1000;

function shouldFetchNewQuote() {
  const lastFetchTime = localStorage.getItem("quoteTime");
  if (!lastFetchTime) return true;

  return Date.now() - Number(lastFetchTime) >= ONE_DAY;
}

async function fetchQuotes() {
  let response = await fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: {
      "X-Api-Key": "Br95/EFqd2ny8Vs6iseKGg==yGULRvHgRVbhAyZr",
    },
  });

  const data = await response.json();

  localStorage.setItem("dailyQuote", JSON.stringify(data[0]));
  localStorage.setItem("quoteTime", Date.now());

  displayQuote(data[0]);
}

function displayQuote(data) {
  document.getElementById("quote").innerText = `"${data.quote}"`;
  document.getElementById("author").innerText = `- ${data.author}`;
}

// 🚀 FAST ENTRY POINT
(function initQuote() {
  const storedQuote = localStorage.getItem("dailyQuote");

  if (storedQuote && !shouldFetchNewQuote()) {
    displayQuote(JSON.parse(storedQuote));
  } else {
    fetchQuotes(); // network only when needed
  }
})();

// Pomodoro Timer Section
let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let tookBreak = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const messageDisplay = document.getElementById('message');

startButton.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
    startButton.textContent = 'Pause';
  } else {
    pauseTimer();
    startButton.textContent = 'Start';
  }
  isRunning = !isRunning;
});
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      if (!tookBreak) {
        timeLeft = breakTime;
        tookBreak = true;
        resetTimer();
        messageDisplay.textContent = "Break time! Relax for 5 minutes.";
        return;
      } else {
        timeLeft = 25 * 60;
        tookBreak = false;
        resetTimer();
        messageDisplay.textContent = "Work session! Focus for 25 minutes.";
        return;
      }
    }
    timeLeft--;
    updateDisplay();
  }
    , 1000);
}
function pauseTimer() {
  clearInterval(timer);
}
function resetTimer() {
  clearInterval(timer);
  timeLeft = tookBreak ? breakTime : 25 * 60;
  isRunning = false;
  startButton.textContent = 'Start';
  updateDisplay();
}
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
updateDisplay();
