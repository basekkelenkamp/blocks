"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject() {
        this._x = 0;
        this._y = 0;
        this._rotate = 0;
        console.log("i'm a game object");
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "rotate", {
        get: function () {
            return this._rotate;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.rotate + "deg)";
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.speedRotate = 0;
        _this.growSpeed = 0;
        _this.maxSize = 0;
        _this.size = 40;
        _this.randomNr = 0;
        _this.div = document.createElement("ball");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(_this.div);
        _this.div.style.transform = "translate(" + _this.x + "px, " + _this.y + "px)";
        _this.div.style.height = _this.size + "px";
        _this.div.style.width = _this.size + "px";
        _this.div.style.background = "black";
        _this.speedX = Math.random() * 2;
        _this.speedY = Math.random() * 2;
        _this.speedRotate = Math.random() / 2;
        _this.growSpeed = Math.random() / 3;
        _this.maxSize = Math.random() * (250 - 150) + 150;
        _this._x = Math.random() * (window.innerWidth - _this.div.clientWidth);
        _this._y = Math.random() * (window.innerHeight - _this.div.clientHeight);
        if (_this._x < 250 && _this._y < 250) {
            _this._x += 250;
            _this._y += 250;
        }
        if (Math.floor(Math.random() * 2) == 0) {
            _this.speedX *= -1;
            _this.randomNr = 1;
        }
        if (Math.floor(Math.random() * 2) == 0) {
            _this.speedY *= -1;
        }
        return _this;
    }
    Ball.prototype.updateBall = function () {
        _super.prototype.update.call(this);
        this._x += this.speedX;
        this._y += this.speedY;
        var rightWall = window.innerWidth - this.div.clientWidth;
        var bottomWall = window.innerHeight - this.div.clientHeight;
        if (this.x > rightWall || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > bottomWall || this.y < 0) {
            this.speedY *= -1;
        }
    };
    Ball.prototype.hit = function () {
        this.speedX *= -1;
        this.speedY *= -1;
    };
    Ball.prototype.grow = function () {
        this.size += this.growSpeed;
        this.div.style.height = this.size + "px";
        this.div.style.width = this.size + "px";
        if (this.size > this.maxSize) {
            this.size = this.maxSize;
            if (this.randomNr == 1) {
                this._rotate += this.speedRotate;
            }
            else {
                this._rotate -= this.speedRotate;
            }
        }
    };
    return Ball;
}(GameObject));
var Game = (function () {
    function Game() {
        this.game = document.getElementsByTagName("game")[0];
        this.balls = [];
        this.lives = 3;
        this.growTime = 30;
        this.growing = false;
        this.counter = 0;
        this.counterMax = 180;
        this.points = 0;
        this.h2 = document.createElement("h2");
        this.game.appendChild(this.h2);
        this.h2.innerHTML = "Lives: " + this.lives;
        this.h2.style.transform = "translate(" + window.innerWidth / 2 + "px, " + 10 + "px)";
        this.h3 = document.createElement("h3");
        this.game.appendChild(this.h3);
        this.h3.innerHTML = "Points: " + this.points;
        this.h3.style.transform = "translate(" + window.innerWidth / 2 + "px, " + 50 + "px)";
        this.h1 = document.createElement("h1");
        this.game.appendChild(this.h1);
        this.h1.style.display = "none";
        this.h1.innerHTML = "GAME OVER";
        document.body.style.backgroundColor = "rgb(93, 160, 84)";
        this.player = new Player();
        for (var i = 0; i < 20; i++) {
            this.balls.push(new Ball());
        }
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player.update();
        console.log(this.lives);
        if (this.lives > 0) {
            this.counter++;
        }
        if (this.counter > this.counterMax) {
            this.counter = 0;
            this.points++;
            this.h3.innerHTML = "Points: " + this.points;
            if (this.balls.length < this.growTime) {
                this.balls.push(new Ball());
            }
        }
        if (this.growing && this.lives == 1) {
            this.player.speed = 2;
        }
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.updateBall();
            if (!this.growing) {
                for (var _b = 0, _c = this.balls; _b < _c.length; _b++) {
                    var otherBall = _c[_b];
                    if (this.checkCollision(ball.getRectangle(), otherBall.getRectangle())) {
                        ball.hit();
                        otherBall.hit();
                    }
                }
            }
            if (this.balls.length == this.growTime) {
                this.growing = true;
                ball.grow();
            }
            if (this.checkCollision(ball.getRectangle(), this.player.getRectangle())) {
                this.lives -= 1;
                this.h2.innerHTML = "Lives: " + this.lives;
                if (this.lives == 2) {
                    this.removeBalls();
                    this.player.speed = 4;
                    document.body.style.backgroundColor = "rgb(136, 67, 67)";
                    this.counterMax = 30;
                    this.growTime = 20;
                }
                if (this.lives == 1) {
                    this.removeBalls();
                    this.player.speed = 1;
                    document.body.style.backgroundColor = "rgb(61, 61, 128)";
                    this.counterMax = 20;
                    this.growTime = 30;
                }
                if (this.lives == 0) {
                    this.removeBalls();
                    this.h2.remove();
                    this.counterMax = 180;
                    this.player.speed = 8;
                    this.h1.style.display = "block";
                    document.body.style.backgroundColor = "darkslategray";
                }
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.removeBalls = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            b.div.remove();
        }
        this.balls = [];
    };
    return Game;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this._speed = 2;
        _this.left = 0;
        _this.right = 0;
        _this.up = 0;
        _this.down = 0;
        _this.div = document.createElement("player");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(_this.div);
        _this.reset();
        _this.div.style.transform = "translate(" + 100 + "px, " + 100 + "px)";
        _this.div.style.height = "30px";
        _this.div.style.width = "30px";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Object.defineProperty(Player.prototype, "speed", {
        set: function (speed) { this._speed = speed; },
        enumerable: true,
        configurable: true
    });
    Player.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case 38:
                this.up = this._speed;
                break;
            case 39:
                this.right = this._speed;
                break;
            case 40:
                this.down = this._speed;
                break;
            case 37:
                this.left = this._speed;
                break;
        }
    };
    Player.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case 38:
                this.up = 0;
                break;
            case 39:
                this.right = 0;
                break;
            case 40:
                this.down = 0;
                break;
            case 37:
                this.left = 0;
                break;
        }
    };
    Player.prototype.reset = function () {
        this._x = 50;
        this._y = 50;
        console.log("reset");
        this.div.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
    };
    Player.prototype.update = function () {
        var newY = this.y - this.up + this.down;
        var newX = this.x - this.left + this.right;
        if (newY > 0 && newY + this.div.clientHeight < window.innerHeight)
            this._y = newY;
        if (newX > 0 && newX + this.div.clientWidth < window.innerWidth)
            this._x = newX;
        if (this._x > window.innerWidth) {
            this.reset();
        }
        if (this._y > window.innerHeight) {
            this.reset();
        }
        _super.prototype.update.call(this);
    };
    return Player;
}(GameObject));
var Start = (function () {
    function Start() {
        var _this = this;
        var game = document.getElementsByTagName("game")[0];
        this.startGame = document.createElement("startgame");
        game.appendChild(this.startGame);
        this.startGame.innerHTML = "Start game";
        this.p = document.createElement("p");
        game.appendChild(this.p);
        this.p.innerHTML = "Resize window to change difficulty.";
        this.startGame.addEventListener("click", function () { return _this.startNewGame(); });
    }
    Start.prototype.startNewGame = function () {
        this.newGame = new Game();
        this.startGame.style.display = "none";
        this.p.style.display = "none";
    };
    return Start;
}());
window.addEventListener("load", function () { return new Start(); });
//# sourceMappingURL=main.js.map