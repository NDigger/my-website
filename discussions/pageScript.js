const ratingSpans = document.querySelectorAll(".rating");

const changeSpanStyleByRating = (span) => {
    const rating = span.textContent;
    if (rating <= 1) {
        span.style.color = `hsl(0, 50%, 50%)`;
        span.style.backgroundColor = `hsl(0, 50%, 5%)`;
        span.style.border = `2px solid hsl(0, 50%, 50%)`;
    } else if (rating <= 4.5) {
        span.style.color = `hsl(${(Number(rating) - 1) * 30}, 50%, 50%)`;
        span.style.backgroundColor = `hsl(${(Number(rating) - 1) * 30}, 50%, 5%)`;
        span.style.border = `2px solid hsl(${(Number(rating) - 1) * 30}, 50%, 50%)`;
    } else {
        span.style.color = "black";
        span.style.background = "linear-gradient(gold, yellow)";
        span.style.border = "3px outset gold";
        span.classList.add("shiny");
    }
    
}

ratingSpans.forEach(span => changeSpanStyleByRating(span))

const settings = JSON.parse(localStorage.getItem("settings"))
console.log(settings.animationsEnabled)
const addBgAnimation = () => document.querySelector("body").classList.add("animated")
settings ? settings.animationsEnabled ? addBgAnimation() : '' : addBgAnimation()