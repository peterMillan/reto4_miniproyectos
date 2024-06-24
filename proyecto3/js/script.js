// Obtener el canvas y su contexto
const canvas = document.getElementById("breakoutCanvas");
const ctx = canvas.getContext("2d");

// Establecer las dimensiones del canvas
canvas.width = 650;
canvas.height = 320;

// Parámetros de la pelota
let ballRadius = 10;
let ballImage = new Image();
ballImage.src = 'img/pelota.png';
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Parámetros de la paleta
let paddleHeight = 10;
let paddleWidth = 115;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// Parámetros de los ladrillos
let brickRowCount = 6;
let brickColumnCount = 16;
let brickWidth = 28;
let brickHeight = 15;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;

// Crear los ladrillos
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1, color: getRandomNeonColor() };
    }
}

// Añadir manejadores de eventos
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", touchStartHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);
document.addEventListener("touchend", touchEndHandler, false);

// Funciones de manejo de eventos de teclado
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Funciones de manejo de eventos táctiles
function touchStartHandler(e) {
    const touchX = e.touches[0].clientX;
    if (touchX > window.innerWidth / 2) {
        rightPressed = true;
    } else {
        leftPressed = true;
    }
}

function touchMoveHandler(e) {
    const touchX = e.touches[0].clientX;
    if (touchX > window.innerWidth / 2) {
        rightPressed = true;
        leftPressed = false;
    } else {
        rightPressed = false;
        leftPressed = true;
    }
}

function touchEndHandler() {
    rightPressed = false;
    leftPressed = false;
}

// Función para detectar colisiones
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("¡Ganaste, felicidades!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Función para dibujar la pelota
function drawBall() {
    ctx.drawImage(ballImage, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
}

// Función para dibujar la paleta
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

// Función para dibujar los ladrillos
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Función para obtener un color neón aleatorio
function getRandomNeonColor() {
    const neonColors = ["#FF00FF", "#00FFFF", "#39FF14", "#FF9933", "#FF00CC"];
    return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// Función para dibujar la puntuación
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Puntuación: " + score, 8, 20);
}

// Función para dibujar las vidas
function drawLives() {
    const livesContainer = document.getElementById('livesContainer');
    livesContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'heart');
        livesContainer.appendChild(heart);
    }
}

// Función para animar la pérdida de una vida
function animateLifeLost() {
    const livesContainer = document.getElementById('livesContainer');
    const heart = livesContainer.querySelector('.heart:last-child');
    if (heart) {
        heart.classList.add('disappear');
        setTimeout(() => {
            heart.remove();
        }, 300);
    }
}

// Función principal para dibujar en el canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    // Colisiones con las paredes laterales
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Colisiones con el techo
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Colisiones con la paleta
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // Pérdida de una vida
            lives--;
            paddleWidth = paddleWidth - 20;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                animateLifeLost();
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    // Movimiento de la paleta
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

// Iniciar el dibujo
draw();