// Tự động phát nhạc nền
const birthdayAudio = document.getElementById("birthday-audio");

// Phát nhạc tự động khi trang tải xong (với vòng lặp)
window.onload = () => {
    birthdayAudio.play();
};

// Pháo hoa hiệu ứng
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, color, speed, angle) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
        this.angle = angle;
        this.alpha = 1;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
    }
}

function createFireworks(x, y) {
    const colors = ["255, 99, 71", "144, 238, 144", "173, 216, 230", "255, 215, 0", "255, 0, 255"];
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, speed, angle));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((particle) => particle.alpha > 0);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

// Tạo pháo hoa khi click chuột
canvas.addEventListener("click", (e) => {
    createFireworks(e.clientX, e.clientY);
});

// Bắt đầu hoạt ảnh
animate();
