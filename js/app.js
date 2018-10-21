function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

class Enemy {
    constructor(player) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = getRandomArbitrary(-150, -101);
        this.y = 83 * getRandomIntInclusive(0, 2) + 3 * 83 / 4;
        this.speed = getRandomArbitrary(300, 700);
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > 550) {
            this.x = getRandomArbitrary(-150, -101);
            this.y = 83 * getRandomIntInclusive(0, 2) + 3 * 83 / 4;
            this.speed = getRandomArbitrary(200, 500);
        }
        if (this.checkCollision()) player.die();
    }

    // This function checks if the enemy and the player are at the same row and in a close x position
    checkCollision() {
        return player.x < this.x + 25 && player.x > this.x - 15 && player.y === this.y;
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 2 * 101;
        this.y = 4 * 83 + 3 * 83 / 4;
        this.input = [0, 0];
        this.alive = true;
    }

    // Update player's x and y according to input
    // check if input is invalid
    // check if the player has reached the water block
    // reset input (to avoid continuous movement)
    update(dt) {
        this.x += this.input[0];
        this.y += this.input[1];
        this.clamp();
        this.checkWin();
        this.input = [0, 0];
    }

    // check if the movement sets the player's position out of bounds
    clamp() {
        if (this.x > 4 * 101 || this.x < 0) this.x -= this.input[0];
        else if (this.y > 4 * 83 + 3 * 83 / 4) this.y -= this.input[1];
    }

    // check if player has reached the water. if yes, start a new game
    checkWin() {
        if (this.y < 3 * 83 / 4) newGame();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // player died, reset game without starting a new one (the enemies do not reset)
    die() {
        this.x = 2 * 101;
        this.y = 4 * 83 + 3 * 83 / 4;
    }

    // set input pixels according to user's input
    handleInput(keyCode) {
        console.log(keyCode);
        if (keyCode === 'left') {
            this.input = [-101, 0];
        }
        else if (keyCode === 'right') {
            this.input = [101, 0];
        }
        else if (keyCode === 'up') {
            this.input = [0, -83];
        }
        else if (keyCode === 'down') {
            this.input = [0, 83];
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function newGame() {
    player = new Player();
    allEnemies = [];
    const enemyNo = getRandomIntInclusive(3, 7);
    for (let i = 0; i < enemyNo; i++) {
        allEnemies.push(new Enemy());
    }
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
newGame();