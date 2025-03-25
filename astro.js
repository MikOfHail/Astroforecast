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

    for (let i = 0; i < firstDay; i++) { // Create empty cells at the beginning of the calendar
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty-day');
        calendarGrid.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) { // Create days of the month
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dayDiv.innerHTML = `
            <div class="icons-container"></div>
            <span class="day-number">${day}</span>
            <a href="weatherForecast.html?date=${formattedDate}" class="weather-link">weather</a>
        `;
        calendarGrid.appendChild(dayDiv);
    }

    const totalCells = firstDay + daysInMonth;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) { // Create empty cells at the end of the calendar
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
    constructor(color, name, eventType) {
        this.color = color;
        this.name = name;
        this.eventType = eventType; // Add eventType property
    }

    createElement(date) {
        const icon = document.createElement('div');
        icon.classList.add('icon');
        icon.style.backgroundColor = this.color;

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.textContent = `${this.name}`; // Include eventType in popup

        icon.appendChild(popup);

        icon.addEventListener('click', () => {
            // Redirect to eventDescription.html with query parameters
            window.location.href = `eventDescription.html?icon=${encodeURIComponent(this.name)}&date=${encodeURIComponent(date)}&eventType=${encodeURIComponent(this.eventType)}`;
        });

        return icon;
    }
}

class FullMoon extends Icon {
    constructor(name = 'Full Moon') {
        super('#c9c9d4', name, 'Lunar Phase'); // Add eventType
    }
}

class NewMoon extends Icon {
    constructor(name = 'New Moon') {
        super('#2f2f36', name, 'Lunar Phase'); // Add eventType
    }
}

class Equinox extends Icon {
    constructor(name = 'Equinox') {
        super('#a4d663', name, 'Equinox'); // Add eventType
    }
}

class LunarEclipse extends Icon {
    constructor(name = 'Lunar Eclipse') {
        super('#a60e00', name, 'Eclipse'); // Add eventType
    }
}

class SolarEclipse extends Icon {
    constructor(name = 'Solar Eclipse') {
        super('#ddbb00', name, 'Eclipse'); // Add eventType
    }
}

function addIconToDay(day, iconInstance) {
    const calendarGrid = document.getElementById('calendarGrid');
    const dayDivs = calendarGrid.getElementsByClassName('day');
    const dayDiv = Array.from(dayDivs).find(div => div.querySelector('.day-number').textContent.trim() == day);

    if (dayDiv) {
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const iconElement = iconInstance.createElement(formattedDate); // Pass the date
        dayDiv.querySelector('.icons-container').appendChild(iconElement);
    }
}

function loadIcons() {
    const monthlyIconMapping = {
        0: [
            { day: 14, iconClass: FullMoon, name: 'Wolf Moon' },
            { day: 29, iconClass: NewMoon, name: 'New Year New Moon' }
        ],
        2: [ // March
            { day: 14, iconClass: FullMoon, name: 'Full Moon' },
            { day: 29, iconClass: NewMoon, name: 'New Moon' },
            { day: 20, iconClass: Equinox, name: 'Spring Equinox' },
            { day: 14, iconClass: LunarEclipse, name: 'Total Lunar Eclipse' },
            { day: 29, iconClass: SolarEclipse, name: 'Partial Solar Eclipse' }
        ],
        8: [
            { day: 22, iconClass: Equinox, name: 'Fall Equinox' }
        ],
    };

    const iconsForCurrentMonth = monthlyIconMapping[month] || []; // Get icons for the current month

    iconsForCurrentMonth.forEach(({ day, iconClass, name }) => {
        const iconInstance = new iconClass(name); // Pass the name to the constructor
        addIconToDay(day, iconInstance);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');

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