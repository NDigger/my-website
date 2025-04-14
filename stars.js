const starsContainer = document.getElementById("stars-container")
const starData = []

const spawnStar = () => {
    const star = document.createElement("div");
    star.classList = "star";
    const top = rand_range(0, 20);
    const left = rand_range(0, 95);
    star.style.top = `${top}%`;
    star.style.left = `${left}vw`;
    const multiplier = Math.random() * 2 + 1;
    star.style.width = `${multiplier * 10}%`;
    star.style.height = `${multiplier * 10}px`;
    starData.push({star: star, top: top, size: multiplier, multiplier: multiplier});
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

setInterval(spawnStar, 200);
update();
