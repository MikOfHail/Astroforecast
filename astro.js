const currentDate = new Date();
var month = currentDate.getMonth(); // Get the current month (0-11)
var year = currentDate.getFullYear(); // Get the current year

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
        dayDiv.textContent = day;
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

document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const titleMonth = document.getElementById('titleMonth');
    const titleYear = document.getElementById('titleYear');

    leftArrow.addEventListener('click', () => {
        month = (month - 1 + 12) % 12;
        titleMonth.textContent = monthName[month];
        if (month==11) {
            updateYear();
        }
        updateMonthName();
        generateCalendarDays();
    });

    rightArrow.addEventListener('click', () => {
        month = (month + 1 + 12) % 12;
        titleMonth.textContent = monthName[month];
        if (month==0) {
            updateYear();
        }
        updateMonthName();
        generateCalendarDays();
    });
    // Initialize the calendar on page load
    updateMonthName();
    updateYear();
    generateCalendarDays();
});