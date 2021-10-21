song = "";
leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

rightWristY = 0;
rightWristX = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#EE82EE");
    stroke("#000000");

    circle(leftWristX,leftWristY,20);

    if (scoreLeftWrist > 0.2) {

        leftwristnumber = Number(leftWristY);
        weDontLikeDecimals = floor(leftwristnumber);
        volume = weDontLikeDecimals / 500;
        
        song.setVolume(volume);
        document.getElementById("vol").innerHTML = "Volume = "+volume;

    }

    if (scoreRightWrist > 0.2) {

        circle(rightWristX,rightWristY,20);

        if(scoreRightWrist >0 && scoreRightWrist <= 100){
            document.getElementById("spd").innerHTML = "Speed = 0.5";
            song.rate(0.5);
        }
        else if(scoreRightWrist >100 && scoreRightWrist <= 200){
            document.getElementById("spd").innerHTML = "Speed = 1";
            song.rate(1);
        }
        else if(scoreRightWrist >200 && scoreRightWrist <= 300){
            document.getElementById("spd").innerHTML = "Speed = 1.5";
            song.rate(1.5);
        }
        else if(scoreRightWrist >300 && scoreRightWrist <= 400){
            document.getElementById("spd").innerHTML = "Speed = 2";
            song.rate(2);
        }
        else if(scoreRightWrist >400 && scoreRightWrist <= 500){
            document.getElementById("spd").innerHTML = "Speed = 2.5";
            song.rate(2.5);
        }
    } 
}

function modelLoaded() {
    console.log("Model: PoseNet initalized.");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score of left wrist: "+scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score of right wrist: "+scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
console.log("Left wrist X:"+leftWristX+"Left wrist Y:"+leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
console.log("Right wrist X:"+rightWristX+"Right wrist Y:"+rightWristY);
    }
}



function play_song() {

    song.play();
    song.setVolume(1);
    song.rate(1);
}