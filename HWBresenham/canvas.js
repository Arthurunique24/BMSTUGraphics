let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

let countOfCircles = 200;
let colorArray = ["#99B898", "#FECEA8", "#FF847C", "#E84A5F"];

function BrosenhamCircle(X1, Y1, R, circleColor) {
    let x = 0;
    let y = R;
    let delta = 1 - 2 * R;
    let error = 0;

    while (y >= 0) {
        c.fillStyle = circleColor;
        c.fillRect(X1 + x, Y1 + y, 1, 1);
        c.fillRect(X1 + x, Y1 - y, 1, 1);
        c.fillRect(X1 - x, Y1 + y, 1, 1);
        c.fillRect(X1 - x, Y1 - y, 1, 1);

        error = 2 * (delta + y) - 1;
        if ((delta < 0) && (error <= 0)) {
            delta += 2 * ++x + 1;
            continue;
        }

        error = 2 * (delta - x) - 1;
        if ((delta > 0) && (error > 0)) {
            delta += 1 - 2 * --y;
            continue;
        }
        x++;
        delta += 2 * (x - y);
        y--;
    }
}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colorArray = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        BrosenhamCircle(this.x, this.y, radius, this.colorArray);
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = - this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

let circleArray = [];

function init() {
    circleArray = [];

    for (let i = 0; i < countOfCircles; i++) {
        let radius = Math.random() * 30 + 5;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

init();
animate();