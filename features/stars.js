const starsContainer = document.createElement("div");
starsContainer.id = "stars-container";
document.querySelector("body").appendChild(starsContainer);

const rand_range = (min, max) => Math.random() * (max - min) + min;

const starData = []

const spawnStar = () => {
    const star = document.createElement("div");
    star.classList = "star";
    const top = rand_range(0, 20);
    const left = rand_range(0, 90);
    star.style.top = `${top}%`;
    star.style.left = `${left}vw`;
    const multiplier = Math.random() * 2 + 1;
    starData.push({star: star, top: top, size: multiplier * rand_range(0, 3), multiplier: multiplier});
    starsContainer.appendChild(star);
}

window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    for (let i = 0; i < starData.length; i++) {
        starData[i].star.style.top = `${starData[i].top + window.scrollY / 160 * window.devicePixelRatio * starData[i].multiplier}%`;
    }
});

const update = () => {
    for (let i = 0; i < starData.length; i++) {
        if (starData[i].size < 0) {
            starsContainer.removeChild(starData[i].star);
            starData.splice(i, 1);
        } else {
            starData[i].size -= 0.01;
            starData[i].star.style.width = `${starData[i].size * 10}px`;
            starData[i].star.style.height = `${starData[i].size * 10}px`;
        }
    }
    requestAnimationFrame(update);
}

setInterval(() => {
    if (window.innerWidth > 768) {spawnStar()}
}, 200);
update();
