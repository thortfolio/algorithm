var mycode = (function(){
    var trainAPos = -5;
    var trainBPos = 8;
    var fly = 0;

    var trainADistance = 3;
    var trainBDistance = 4;
    var flyDistance = 5;
    var flyDirection = 1;
    var flyTotalDistance = 0;

    var time = 0;
    var count = 0;
    var speed = 10;
    var point = 1 / 100;
    var digitNum = point.toString().length - 2;

    trainADistance = trainADistance * point;
    trainBDistance = trainBDistance * point;
    flyDistance = flyDistance * point;

    var interval = setInterval(function(){
        if(fly >= trainBPos || fly <= trainAPos){
            flyDirection = flyDirection * -1;
        }
        fly += (flyDistance * flyDirection);
        flyTotalDistance += flyDistance;
        trainAPos += trainADistance;
        trainBPos -= trainBDistance;
        if(trainAPos >= trainBPos){
            clearInterval(interval);
        } else {
            ++count;
        }
        console.log("time: " + (time += point).toFixed(digitNum) + "s");
        console.log("train A:" + trainAPos.toFixed(digitNum) + "m");
        console.log("fly:" + fly.toFixed(digitNum) + "m (distance: " + flyTotalDistance.toFixed(digitNum) + "m)");
        console.log("train B:" + trainBPos.toFixed(digitNum) + "m");
        console.log("---------------------");

    }, speed);
});

var formula = (function(){
    var trainAPos = -5;     // meter
    var trainBPos = 8;      // meter

    var trainASpeed = 3;    // m/1s
    var trainBSpeed = 4;    // m/1s
    var flySpeed = 5;       // m/1s

    var totalTrainSpeed = trainASpeed + trainBSpeed;
    var distance = trainBPos - trainAPos;
    var collisionTime = distance / totalTrainSpeed;

    return console.log("총 이동거리: " + flySpeed * collisionTime + "m");
});