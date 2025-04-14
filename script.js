import { randomFacts } from './randomFacts.js';

const randomFactText = document.getElementById("rnd-fact-text");

const nowInMs = Date.now();
const msInDay = 1000 * 60 * 60 * 24;

const daysSinceEpoch = Math.floor(nowInMs / msInDay);

randomFactText.textContent = `${randomFacts[daysSinceEpoch % randomFacts.length]}.`;