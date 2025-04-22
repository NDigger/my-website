import { randomFacts } from './randomFacts.js';

const randomFactText = document.getElementById("rnd-fact-text");

const convertMsToDays = (ms) => {
    const msInDay = 1000 * 60 * 60 * 24;
    return Math.floor(ms / msInDay)
} 

const currentTime = Date.now();
const daysSinceEpoch = convertMsToDays(currentTime);
randomFactText.textContent = `${randomFacts[daysSinceEpoch % randomFacts.length]}.`;


const currentFactDay = document.getElementById("current-fact-day");

const siteCreationDate = new Date('2025-04-13T00:00:00Z');
currentFactDay.textContent = `#${convertMsToDays(currentTime - siteCreationDate)}`