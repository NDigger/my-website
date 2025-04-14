const cloudsContainer = document.getElementById("clouds-container")

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static ZERO = new Vector2(0, 0);
    static ONE = new Vector2(1, 1);

    add(vector2) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
}

function rand_range(min, max) {
    return Math.random() * (max - min) + min;
}

class Star {
    constructor() {
        const rndSize = rand_range(60, 220); 
        this.size = new Vector2(rndSize, rndSize);
        this.position = new Vector2(rand_range(-90, 10), rand_range(-15, 55));
        this.move = new Vector2(rand_range(0.05, 0.4), 0) //new Vector2(rand_range(-.05, .05), rand_range(-.05, .05));
        this.alpha = 0;
        const randColor = () => rand_range(255, 255)
        this.color = { 
            r: randColor(), 
            g: randColor(), 
            b: randColor(),
        }

        this.object = document.createElement("div");
        this.object.classList.add("star");
        cloudsContainer.appendChild(this.object);
        this.update();
        this.appearance();
    }

    appearance = async () => {
        const targetA = rand_range(.2, .9);
        for (let i = 0; i < 100; i++) {
            this.alpha += targetA / 140;
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        this.disappearance();
    };

    disappearance() {
        if (this.alpha < 0.05) {
            this.remove()
            return
        }
        this.alpha *= .99;
        requestAnimationFrame(this.disappearance.bind(this));
    }

    update() {
        this.position = this.position.add(this.move)
        this.object.style.top = `${this.position.y}%`;
        this.object.style.left = `${this.position.x}vw`;
        this.object.style.width = `${this.size.x}vw`;
        this.object.style.height = `${this.size.y}vh`;
        this.object.style.background = `radial-gradient(farthest-corner, rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha}) 0%, rgba(0, 0, 0, 0) 50%)`;
        this.updateAnimationFrame = requestAnimationFrame(this.update.bind(this));
    }

    remove() {
        cancelAnimationFrame(this.updateAnimationFrame);
        this.object.remove();
        this.object = null;
    }
}

setInterval(() => {
    if (!isActive) { return }
    let spawn = Math.floor(Math.random() * 6 + 1)
    while (spawn > 0) {
        new Star();
        spawn--;
    }
}, 2000);

let isActive = true;
document.addEventListener("visibilitychange", () => {
    isActive = !document.hidden;
});