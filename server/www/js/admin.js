/* eslint-disable no-prototype-builtins */
const monthYearElement = document.getElementById('monthYear');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const svgclipboad = document.getElementById('svgclipboad')

const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function updateCalendar() {
    monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;
    createCalendarDays(currentYear, currentMonth);
}

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

const daysContainer = document.createElement('tbody');
daysContainer.classList.add('days-container');

// Fonction pour obtenir le nombre de jours dans un mois spécifique
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Fonction pour créer les cases des jours dans le calendrier
function createCalendarDays(year, month) {
    daysContainer.innerHTML = '';

    const daysInMonth = getDaysInMonth(year, month);
    const currentDate = new Date();

    // Ajoute les jours du mois dans les cases correspondantes
    for (let day = 1; day <= daysInMonth; day++) {
        const calendarDate = document.createElement('td');
        calendarDate.classList.add('date');
        calendarDate.textContent = day;

        // Vérifie si le jour correspond à la date actuelle
        if (
            year === currentDate.getFullYear() &&
            month === currentDate.getMonth() &&
            day === currentDate.getDate()
        ) {
            calendarDate.classList.add('active');
        }

        // Donner une class "dim_sam" aux dimanches et samedis
        const dayOfWeek = new Date(year, month, day).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 1) {
            calendarDate.classList.add('dim_sam');
        }
        daysContainer.appendChild(calendarDate);
    }

    // Ajoute daysContainer à la section des jours dans le calendrier
    const existingDaysContainer = document.querySelector('.days-container');
    if (existingDaysContainer) {
        existingDaysContainer.replaceWith(daysContainer);
    } else {
        document.querySelector('.days').appendChild(daysContainer);
    }
}

updateCalendar();

// Chargement du fichier JSON de configuration
fetch('config')
    .then(response => response.json())
    .then(configJson => {
        // Sélectionnez l'élément où vous voulez afficher les paramètres
        const jsonParamsContainer = document.getElementById('jsonParams');

        // Parcourez les propriétés du JSON et affichez-les dans le format souhaité
        for (const key in configJson) {
            if (configJson.hasOwnProperty(key)) {
                const keyValue = configJson[key];
                const paramElement = document.createElement('p');
                paramElement.textContent = key + ' = ' + keyValue;
                jsonParamsContainer.appendChild(paramElement);
            }
        }
    })
    .catch(error => {
        console.error('Une erreur est survenue lors du chargement du fichier JSON :', error);
    });

svgclipboad.addEventListener('click', () => {
    fetch('config') // Charger le fichier JSON
        .then(response => response.text()) // Convertir la réponse en texte
        .then(text => {
            navigator.clipboard.writeText(text)
                .then(() => {
                    console.log('JSON copié avec succès !');
                })
                .catch(err => {
                    console.error('Une erreur est survenue lors de la copie du JSON :', err);
                });
        })
        .catch(error => {
            console.error('Une erreur est survenue lors du chargement du fichier JSON :', error);
        });
});
