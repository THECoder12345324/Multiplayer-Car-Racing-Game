var ball;

var database, position;

function setup(){
    createCanvas(500,500);

    //Creates a connection with the database
    database = firebase.database();

    //Referring to the location of database where value is stored
    var nodeposition = database.ref("Ball/position");

    //Creates a listener which listens to changes in database
    nodeposition.on("value", readOperation, showError);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writeOperation(-1,0);
    }
    if(keyDown(RIGHT_ARROW)){
        writeOperation(1,0);
    }
    if(keyDown(UP_ARROW)){
        writeOperation(0,-1);
    }
    if(keyDown(DOWN_ARROW)){
        writeOperation(0,+1);
    }
    drawSprites();
}

function readOperation(data){

    //Reads the value in the database
    position = data.val();

    //Sets the balls initial position
    ball.x = position.x;
    ball.y = position.y;
}

function writeOperation(x, y) {

    //Sets the value in the database
    database.ref("Ball/position").set(
        {x: ball.x + x, 
         y: ball.y + y});
}

//In case there is an error
function showError() {
    console.log("There was an error");
}