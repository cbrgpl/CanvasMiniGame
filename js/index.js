function MiniGame() {
    console.log('kekw');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 15,
        speed: 5,
        dx: 0,
        dy: 0,
    };

    const enemy1 = {
            x: getRandomInt(0, canvas.width),
            y: getRandomInt(0, canvas.height),
            size: getRandomInt(5, 25),
            speed: getRandomInt(1, 4),
            dx: 5,
            dy: -5
        },
        enemy2 = {
            x: getRandomInt(0, canvas.width),
            y: getRandomInt(0, canvas.height),
            size: getRandomInt(5, 25),
            speed: getRandomInt(1, 4),
            dx: 1,
            dy: 3
        },
        enemy3 = {
            x: getRandomInt(0, canvas.width),
            y: getRandomInt(0, canvas.height),
            size: getRandomInt(5, 25),
            speed: getRandomInt(1, 4),
            dx: 4,
            dy: 3
        },
        enemy4 = {
            x: getRandomInt(0, canvas.width),
            y: getRandomInt(0, canvas.height),
            size: getRandomInt(5, 25),
            speed: getRandomInt(1, 4),
            dx: 0.2,
            dy: 0.2
        };

// // Triangle draw
//
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// ctx.lineTo(50, 50);
// ctx.closePath();
// ctx.stroke();

// Arc draw(Circles)

    function DrawPlayer() {
        ctx.beginPath();
        ctx.fillStyle = "purple";
        ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }


    function WallDetect() {
        // Left Detect
        if (player.x - player.size === canvas.width) {
            player.x = 0;
        }
        // Right Detect
        if (player.x + player.size === 0) {
            player.x = canvas.width
        }
        // Top Detect
        if (player.y - player.size === canvas.height) {
            player.y = 0;
        }
        // Bottom Detect
        if (player.y + player.size === 0) {
            player.y = canvas.height;
        }
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    };

    function update() {
        clear();

        DrawPlayer();

        EnemyDraw(enemy1);
        EnemyDraw(enemy2);
        EnemyDraw(enemy3);
        EnemyDraw(enemy4);

        NewPos();
        EnemyNewPos(enemy1);
        EnemyNewPos(enemy2);
        EnemyNewPos(enemy3);
        EnemyNewPos(enemy4);

        ContactDetect();

        requestAnimationFrame(update)

    }

    function NewPos() {
        player.x += player.dx;
        player.y += player.dy;


        WallDetect();
    }

    function KeyDown(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ф') {
            MoveLeft();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'в') {
            MoveRight();
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'ц') {
            MoveTop();
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'ы') {
            MoveBottom();
        }
    }

    function KeyUp(e) {
        if (
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'a' ||
            e.key === 'd' ||
            e.key === 's' ||
            e.key === 'w' ||
            e.key === 'ф' ||
            e.key === 'в' ||
            e.key === 'ы' ||
            e.key === 'ц'
        ) {
            player.dx = 0;
            player.dy = 0;
        }
    }

    function MoveRight() {
        player.dx = player.speed
    }

    function MoveLeft() {
        player.dx = -player.speed
    }

    function MoveTop() {
        player.dy = -player.speed
    }

    function MoveBottom() {
        player.dy = player.speed
    }

    update();

    document.addEventListener('keydown', KeyDown);
    document.addEventListener('keyup', KeyUp);

    function getRandomInt(min, max) {
        // console.log(-(min + Math.floor(Math.random() * Math.floor(max))))
        if (Math.random() % 2 === 0) {
            return -(min + Math.floor(Math.random() * Math.floor(max)));
        }
        return min + Math.floor(Math.random() * Math.floor(max));
    }

    function EnemyDraw(enemy) {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
    }

    function EnemyNewPos(enemy) {
        enemy.x += enemy.dx;
        enemy.y += enemy.dy;

        WallEnemyDetect(enemy)
    }

    function WallEnemyDetect(enemy) {
        // Right
        if (enemy.x + enemy.size >= canvas.width) {
            enemy.dx = -enemy.speed - getRandomInt(1, 2);
        }
        // Left
        if (enemy.x - enemy.size <= 0) {
            enemy.dx = enemy.speed + getRandomInt(1, 2);
        }
        // Top
        if (enemy.y + enemy.size >= canvas.height) {
            enemy.dy = -enemy.speed + getRandomInt(1, 2);
        }
        // Bottom
        if (enemy.y - enemy.size <= 0) {
            enemy.dy = enemy.speed - getRandomInt(1, 2);
        }
    }

    function ContactDetect() {
        if (
            Math.pow(Math.pow((player.x - enemy1.x), 2) + Math.pow((player.y - enemy1.y), 2), 0.5) <= player.size + enemy1.size ||
            Math.pow(Math.pow((player.x - enemy2.x), 2) + Math.pow((player.y - enemy2.y), 2), 0.5) <= player.size + enemy2.size ||
            Math.pow(Math.pow((player.x - enemy3.x), 2) + Math.pow((player.y - enemy3.y), 2), 0.5) <= player.size + enemy3.size ||
            Math.pow(Math.pow((player.x - enemy4.x), 2) + Math.pow((player.y - enemy4.y), 2), 0.5) <= player.size + enemy4.size
        ) {
            clear();
            document.getElementById('canvas').style.display = 'none';
            document.querySelector('.lose').classList.add('lose__active');
        }
    }
}

document.addEventListener('click', function (e) {
    document.querySelector('.title').classList.add('title__deactive');
    requestAnimationFrame(function () {
        document.querySelector('.hello').classList.add('hello__active');
        setTimeout(function () {
            document.querySelector('.title').style.display = 'none';
        }, 1500)
    })

});

document.querySelector('.hello').addEventListener('click', function (e) {
    document.querySelector('.hello').classList.add('hello__deactive');
    document.getElementById('canvas').style.display = 'block';
    MiniGame();
});

document.querySelector('.lose').addEventListener('click', function (e) {
    document.querySelector('.lose').classList.remove('lose__active');
    document.getElementById('canvas').style.display = 'block';
    // MiniGame();
});