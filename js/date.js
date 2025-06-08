const monthYearElement = document.getElementById('monthYear');
const calendarGrid = document.querySelector('.calendar-grid');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const dateInput = document.getElementById('date');

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;

const renderCalendar = () => {
    calendarGrid.innerHTML = '<div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sa</div><div>Do</div>';

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const offset = (firstDayOfMonth + 6) % 7; // Adjust for Monday start

    for (let i = 0; i < offset; i++) {
        calendarGrid.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = selectedDate && selectedDate.day === day && selectedDate.month === currentMonth && selectedDate.year === currentYear;
        calendarGrid.innerHTML += `<div class="${isSelected ? 'selected' : ''}" data-day="${day}">${day}</div>`;
    }
};

const updateMonthYear = () => {
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;
};

prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateMonthYear();
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateMonthYear();
    renderCalendar();
});

calendarGrid.addEventListener('click', (e) => {
    if (e.target.dataset.day) {
        const selectedDay = parseInt(e.target.dataset.day, 10);
        selectedDate = { day: selectedDay, month: currentMonth, year: currentYear };
        const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        dateInput.value = `${selectedDay} ${months[currentMonth]} ${currentYear}`;
        renderCalendar();

        // Redirect to another page
        window.location.href = `../pasajero.html`;
    }
});

updateMonthYear();
renderCalendar();