var month = 0;
var year = 2025;

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

function generateCalendarDays() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = ''; // Clear existing days

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        calendarGrid.appendChild(dayDiv);
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
            year--
            titleYear.textContent = year;
        }
        generateCalendarDays();
    });

    rightArrow.addEventListener('click', () => {
        month = (month + 1 + 12) % 12;
        titleMonth.textContent = monthName[month];
        if (month==0) {
            year++
            titleYear.textContent = year;
        }
        generateCalendarDays();
    });
});