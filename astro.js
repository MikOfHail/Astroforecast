const currentDate = new Date();
var month = currentDate.getMonth(); // Get the current month (0-11)
var year = currentDate.getFullYear(); // Get the current year

var eventType; //type of event to be displace in eventDescription

const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    'September',
    "October",
    "November",
    "December"
]; 

function updateMonthName() {
    const titleMonth = document.getElementById('titleMonth');
    titleMonth.textContent = monthName[month];
}

function updateYear() {
    const titleYear = document.getElementById('titleYear');
    titleYear.textContent = year;
}

function generateCalendarDays() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = ''; // Clear existing days

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty-day');
        calendarGrid.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerHTML = `<div class="icons-container"></div><span class="day-number">${day}</span>`;
        calendarGrid.appendChild(dayDiv);
    }

    const totalCells = firstDay + daysInMonth;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
        for (let i = 0; i < remainingCells; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty-day');
            calendarGrid.appendChild(emptyDiv);
        }
    }
}

function setCityStateVariables() {
    const city = document.getElementById('cityInput').value;
    const state = document.getElementById('stateInput').value;
    console.log('User input:', city, state);
    if (true) {
        window.location.href = 'calendar.html';
    }
}

class Icon {
    constructor(color, name) {
        this.color = color;
        this.name = name;
    }

    createElement() {
        const icon = document.createElement('div');
        icon.classList.add('icon');
        icon.style.backgroundColor = this.color;

        icon.addEventListener('click', () => {
            alert(`${this.name} icon clicked!`);
        });

        return icon;
    }
}

function addIconToDay(day, iconInstance) {
    const calendarGrid = document.getElementById('calendarGrid');
    const dayDivs = calendarGrid.getElementsByClassName('day');
    const dayDiv = Array.from(dayDivs).find(div => div.textContent.trim() == day);

    if (dayDiv) {
        const iconElement = iconInstance.createElement();
        dayDiv.querySelector('.icons-container').appendChild(iconElement);
    }
}

function loadIcons() {
    const blueIcon = new Icon('blue', 'Blue');
    const redIcon = new Icon('red', 'Red');
    const yellowIcon = new Icon('yellow', 'Yellow');

    addIconToDay(15, blueIcon);
    addIconToDay(15, redIcon);
    addIconToDay(15, yellowIcon);
}

document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const titleMonth = document.getElementById('titleMonth');

    leftArrow.addEventListener('click', () => {
        month = (month - 1 + 12) % 12;
        if (month==11) {
            year--
        }
        updateYear();
        updateMonthName();
        generateCalendarDays();
        loadIcons()
    });

    rightArrow.addEventListener('click', () => {
        month = (month + 1 + 12) % 12;
        if (month==0) {
            year++
        }
        updateYear();
        updateMonthName();
        generateCalendarDays();
        loadIcons()
    });
    // Initialize the calendar on page load
    updateMonthName();
    updateYear();
    generateCalendarDays();
    loadIcons();
});