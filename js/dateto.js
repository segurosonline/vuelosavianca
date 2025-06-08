const monthYearElement = document.getElementById('monthYear');
const calendarGrid = document.querySelector('.calendar-grid');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const departureInput = document.getElementById('departure');
const returnInput = document.getElementById('return');



const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let departureDate = null;
let returnDate = null;

const renderCalendar = () => {
    calendarGrid.innerHTML = '<div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sa</div><div>Do</div>';

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const offset = (firstDayOfMonth + 6) % 7; // Adjust for Monday start

    for (let i = 0; i < offset; i++) {
        calendarGrid.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isDeparture = departureDate && departureDate.day === day && departureDate.month === currentMonth && departureDate.year === currentYear;
        const isReturn = returnDate && returnDate.day === day && returnDate.month === currentMonth && returnDate.year === currentYear;
        const className = isDeparture || isReturn ? 'selected' : '';
        calendarGrid.innerHTML += `<div class="${className}" data-day="${day}">${day}</div>`;
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
        const selectedDate = { day: selectedDay, month: currentMonth, year: currentYear };

        if (!departureDate || (departureDate && returnDate)) {
            departureDate = selectedDate;
            returnDate = null;
            departureInput.value = formatDate(departureDate);
            returnInput.value = '';
        } else if (!returnDate) {
            returnDate = selectedDate;
            returnInput.value = formatDate(returnDate);
        }

        if (departureDate && returnDate) {
            setTimeout(() => {
                window.location.href = `../pasajeros.html`;
            }, 500);
        }

        renderCalendar();
    }
});

const formatDate = (date) => {
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    return `${date.day} ${months[date.month]} ${date.year}`;
};

updateMonthYear();
renderCalendar();