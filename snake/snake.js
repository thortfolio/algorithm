/*****************************************
* utils
******************************************/
var canvas, context;
function createCanvas(width, height, bgColor){
    canvas = document.createElement('canvas');
    context = canvas.getContext("2d");
    canvas.id = "myCanvas";
    canvas.width = width;
    canvas.height = height;
    canvas.style.backgroundColor = bgColor;
    document.body.appendChild(canvas);
}

function background(color){
    
}

function constrain(n, low, high){
    if(n <= low){
        return low;
    } else if(n >= high){
        return high;
    } else {
        return n;
    }
}

function diff (num1, num2) {
    if (num1 > num2) {
        return num1 - num2;
    } else {
        return num2 - num1;
    }
};
  
function distance (x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
};
function FpsCtrl(fps, callback) {
    var delay = 1000 / fps,                               // calc. time per frame
        time = null,                                      // start time
        frame = -1,                                       // frame count
        tref;                                             // rAF time reference
    function loop(timestamp) {
        if (time === null) time = timestamp;              // init start time
        var seg = Math.floor((timestamp - time) / delay); // calc frame no.
        if (seg > frame) {                                // moved to next frame?
            frame = seg;                                  // update
            callback({                                    // callback function
                time: timestamp,
                frame: frame
            })
        }
        tref = requestAnimationFrame(loop)
    }
    // play status
    this.isPlaying = false;

    // set frame-rate
    this.frameRate = function(newfps) {
        if (!arguments.length) return fps;
        fps = newfps;
        delay = 1000 / fps;
        frame = -1;
        time = null;
    };

    // enable starting/pausing of the object
    this.start = function() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            tref = requestAnimationFrame(loop);
        }
    };

    this.pause = function() {
        if (this.isPlaying) {
            console.log("pause");
            cancelAnimationFrame(tref);
            this.isPlaying = false;
            time = null;
            frame = -1;
        }
    };
}
/*****************************************
* index
******************************************/
const KEYCODE = {
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
}
var snake;
var food;
var fps;
var squareSize = 20;

function start(){
    createCanvas(600, 600, "grey");

    snake = new Snake();

    food = new Food();
    food.random();

    fps = new FpsCtrl(10, update);
    fps.start();
}

function stop(){
    snake.death();
    fps.pause();
}

function update(){
    snake.show();
    if(snake.eat(food)) food.random();
    snake.update();

    food.update();
}

function keyboard(evnet){
    if(evnet.keyCode === KEYCODE.UP_ARROW){
        snake.direction(0, -1);
    }
    if(evnet.keyCode === KEYCODE.DOWN_ARROW){
        snake.direction(0, 1);
    }
    if(evnet.keyCode === KEYCODE.LEFT_ARROW){
        snake.direction(-1, 0);
    }
    if(evnet.keyCode === KEYCODE.RIGHT_ARROW){
        snake.direction(1, 0);
    }
}

function init(){
    start();
    window.addEventListener("keydown", keyboard);
}

init();

// window.addEventListener("click", function(){
//     fps.pause();
// });
/*****************************************
* food
******************************************/
function Food(){
    this.x = 0;
    this.y = 0;

    this.random = function(){
        this.x = Math.floor(Math.random() * 30) * 20;
        this.y = Math.floor(Math.random() * 30) * 20;
    }

    this.update = function(){
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(food.x, food.y, squareSize, squareSize);
        context.fill();
    }
}
/*****************************************
* snake
******************************************/
function Snake(){
    this.x = 0;
    this.y = 0;
    this.speedX = 1;
    this.speedY = 0;
    this.total = 0;
    this.tail = [];

    this.update = function(){
        if(this.total === this.tail.length){
            for(var i = 0; i < this.tail.length-1; i++){
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total-1] = {}
        this.tail[this.total-1].x = this.x;
        this.tail[this.total-1].y = this.y;
        this.x = this.x + this.speedX * squareSize;
        this.y = this.y + this.speedY * squareSize;

        this.x = constrain(this.x, 0, canvas.width - squareSize);
        this.y = constrain(this.y, 0, canvas.height - squareSize);
    }

    this.show = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(255,255,255,1)";
        for(var i = 0; i < this.total; i++){
            context.fillRect(this.tail[i].x, this.tail[i].y, squareSize, squareSize);
            context.strokeStyle = "#000000";
            context.lineWidth = 1;
            context.strokeRect(this.tail[i].x, this.tail[i].y, squareSize, squareSize);
        }
        context.fillRect(this.x, this.y, squareSize, squareSize);
        context.strokeStyle = "#000000";
        context.lineWidth = 1;
        context.strokeRect(this.x, this.y, squareSize, squareSize);
    }

    this.direction = function(x, y){
        this.speedX = x;
        this.speedY = y;
    }

    this.eat = function(pos){
        var d = distance(this.x, this.y, pos.x, pos.y);
        if(d < 1){
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.death = function(){
        console.log("game over");
        for(var i = 0; i < this.tail.length-1; i++){
            var pos = this.tail[i];
            var d = distance(this.x, this.y, pos.x, pos.y);
            if(d < 1){
                this.total = 0;
                this.tail = [];
            }
        }
    }
}