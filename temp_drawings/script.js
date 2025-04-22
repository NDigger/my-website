import { drawings } from './drawingsList.js';

const drawingsContainer = document.getElementById("drawings-container");
const staticImage = document.getElementById("static-image");
const closeStaticImageContainer = document.getElementById("close-static-image-container");
const staticImageContainer = document.getElementById("static-image-container");
const totalTime = document.getElementById("total-time");
const html = document.querySelector("html");
const drawingsAmount = document.getElementById("drawings-amount");
const reversedDrawings = drawings.reverse()

let totalTimeSpent = {
    h: 0, 
    m: 0,
}

const createDrawingsTabs = (drawings, i) => {
    if (showDrawings > drawings.length) { return }
    showDrawings += 12
    const cap = i + 12 < drawings.length ? i + 12 : drawings.length 
    for (let index = i; index < cap; index++){
        const drawing = reversedDrawings[index];
        const name = drawing.path.match(/(?<=\/)[^\/_\.]+(?=[_\.])/);
        const getTime = () => {
            const hoursRegex = /(\d+)\s+(\d+)/;
            const minutesRegex = /(\d+)/;
            if (hoursRegex.test(drawing.time)) {
                return drawing.time.replace(hoursRegex, (_, h, m) => `${h}h ${m}m`);
            } else if (minutesRegex.test(drawing.time)) {
                return drawing.time.replace(minutesRegex, (_, m) => `${m}m`);
            }
        }
        drawingsContainer.innerHTML += `
        <button class="image-box" key="${index}">
            <img class="drawing" src="${drawing.path}" alt="${name}">
            <div class="flex full-width">
                <p class="drawing-name">Name: ${drawing.time ? `<br>` : ``}${name}</p>
                ${drawing.time ? `<p class="drawing-time">${getTime()} <i class="bi bi-clock"></i></p>` : ``}
            </div>
        </button>
        `
    }

    const addButtonEventListener = event => {
        const key = event.target.closest('.image-box').getAttribute('key');
        staticImageContainer.style.display = "block";
        html.style.overflowY = "hidden";
        staticImage.src = drawings[key].path;
    }

    // CLEAR & SELECT ALL BEFORE ADDING
    const buttons = document.querySelectorAll('.image-box');
    buttons.forEach(button => button.removeEventListener('click', addButtonEventListener));

    // ADDING TO ALL
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            addButtonEventListener(event)
        });
    });
}

closeStaticImageContainer.addEventListener("click", () => {
    staticImageContainer.style.display = "none";
    html.style.overflowY = "scroll";
})

let lastScrollY = window.scrollY;
const header = document.getElementById('header');

reversedDrawings.forEach(drawing => {
    if (drawing.hasOwnProperty('time')) {
        let drawingTime = drawing.time.match(/(\d+)\s+(\d+)/);
        if (drawingTime != null) {
            totalTimeSpent.h += parseInt(drawingTime[1]);
            totalTimeSpent.m += parseInt(drawingTime[2]);
        } else {
            drawingTime = drawing.time.match(/(\d+)/);
            totalTimeSpent.m += parseInt(drawingTime[1]);
        }
}})

const convertToHoursAndMinutes = totalTime => {
    totalTimeSpent.h = totalTimeSpent.h || 0;
    totalTimeSpent.m = totalTimeSpent.m || 0; 

    totalTimeSpent.h += Math.floor(totalTimeSpent.m / 60);
    totalTimeSpent.m = totalTimeSpent.m % 60; 

    return totalTimeSpent;
};

totalTimeSpent = convertToHoursAndMinutes(totalTimeSpent);

totalTime.innerHTML = `<span id="total-time-text">Total time (page drawings only)</span> <br>${totalTimeSpent.h}h ${totalTimeSpent.m}m`;
drawingsAmount.textContent = drawings.length;

let showDrawings = 0
createDrawingsTabs(drawings, showDrawings);

// PAGE BOTTOM REACHED
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - 300;
  
    if (scrollTop + windowHeight >= documentHeight) {
        createDrawingsTabs(drawings, showDrawings);
    }
});