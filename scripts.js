
//color picker

var randArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
var selectedColor = [];


for (var i = 0; i < 6 ; i++) {

var rand = Math.floor(Math.random() * 16);
selectedColor[i] = randArray[rand];

}

var actualColor = selectedColor.join("");

$(".color").css("background-color", "#" + actualColor);

var actualRGB = $(".color").css("background-color");
var processingHint = actualRGB.split("(");
var actualHintArray = processingHint[1].split(",");
var actualHint = actualHintArray[0];

$(".color").mouseover(function(){


  $(".color").css({
    "z-index": "3",
    "width": "100px",
    "height": "100px",})
            .html("RGB: (" + actualHintArray[0] + ", ___ , ___)");

})

$(".color").mouseout(function(){

  $(".color").css({
    "z-index": "1",
    "width": "25px",
    "height": "25px",})
            .html("");

})

/* Whack a mole: every two seconds, picks three random checkboxes and
checks them. Iterates seven times. */

$("#whackstart").click(function(e){

var loop = 0;
var setWhack = setInterval(whackToggle, 2000);

function whackToggle()
{

  if (loop == 7) {

    $(":checkbox").prop("checked", false);
    clearInterval(setWhack);

  }

  else {

    $(":checkbox").prop("checked", false);

    var check1 = Math.floor((Math.random() * 16) + 1);
    var check2 = Math.floor((Math.random() * 16) + 1);
    var check3 = Math.floor((Math.random() * 16) + 1);

    $(":checkbox:nth-child(" + check1 + ")").prop("checked", true);
    $(":checkbox:nth-child(" + check2 + ")").prop("checked", true);
    $(":checkbox:nth-child(" + check3 + ")").prop("checked", true);

    loop++;
  }

}

e.preventDefault();

})


/* Shell game: ~fairly~ similar code to the whack a mole game..
Picks a random radio button to select and then hides the shell at the end.
Tells you if you've picked the wrong one.*/

$("#shellstart").click(function(e){

$(".response").html("");

var loop = 0;
var setShell = setInterval(shellToggle, 200);
var correctAnswer = 10;

function shellToggle()
{

  $(":radio").prop("checked", false);

  var check1 = Math.floor((Math.random() * 9) + 1);

  $(":radio:nth-child(" + check1 + ")").prop("checked", true);
  correctAnswer = check1;

  loop++;

  if (loop == 7) {

    window.setTimeout(function(){

      $(":radio").prop("checked", false);

      $(":radio").click(function(){
        $(".response").html("Nope!");
      });

      $(":radio:nth-child(" + correctAnswer + ")").click(function(){
        $(".response").html("Correct!");
      });

      clearInterval(setShell);
    }, 300);
  }

}

e.preventDefault();

})


/* Test of strength- cycles through each of the | characters in the div
"strengthtest", setting their class to "black". Starts when you click start,
stops when you click stop... I had to cut this out due to a lack of time
and weird jQuery collisions (it doesn't like the character |) but I might
revisit it later.


var lines = $(".strengthtest").html();
var splitLines = lines.split("");

$(splitLines);

console.log(splitLines);

$(splitLines[14]).wrap("<span class='red'></span>");

$("#strengthstart").click(function(e){

  // Get the contents of strengthtest */


/*

  for (var i = 0; i < lines.length; i++) {
    $(lines[i]).addClass("black");

    if(i == 0)
    {
      $(lines[27]).removeClass("black");
    }
    else {
      $(lines[i-1]).addClass("black");
    }

  }

  $("#strengthstop").click(function(e2){

    for (var j = 0; j < lines.length; j++) {
      lines[j].removeClass("black");
    }

    e2.preventDefault();
  })

  e.preventDefault();

}); */


/*

Crane game: uses jCanvas to draw a 'crane' and a random prize on the canvas. When
a user hits "move left" or "move right" the crane will move accordingly.

*/

$("#cranestart").click(function(e){

  var numPrizes = $(".cranenum").val();

  $(".cranegame").addLayer({
    type: 'rectangle',
    x: 50,
    y: 0,
    width: 40,
    height: 140,
    name: 'crane',
  });

$(".cranegame").drawLine({
    layer: 'crane',
    strokeStyle: "#cccccc",
    strokeWidth: 3,
    x1: 50, y1: 0,
    x2: 50, y2: 50,
  }).drawLine({
    layer: 'crane',
    strokeStyle: "#cccccc",
    strokeWidth: 3,
    x1: 50, y1: 50,
    x2: 30, y2: 70,
  }).drawLine({
    layer: 'crane',
    strokeStyle: "#cccccc",
    strokeWidth: 3,
    x1: 50, y1: 50,
    x2: 70, y2: 70,
  }).drawLayers();


  // sets up the prizes on the canvas; is super sloppy (sorry!)
  for (var i = 0; i < numPrizes; i++) {

    // picking a random color for the prizes
    var selected = [];

    for (var j = 0; j < 6 ; j++) {
      var random = Math.floor(Math.random() * 16);
      selected[j] = randArray[random];
    }

    var col = ("#" + selected.join(""));

    // picking a location for the prizes
    var yPos = Math.floor((Math.random() * 130) + 130);
    var xPos = Math.floor((Math.random() * 450) + 10);

    $(".cranegame").drawEllipse({
      fillStyle: col,
      x: xPos,
      y: yPos,
      width: 40,
      height: 40,
    });

  }

  e.preventDefault();

})

/*
$("#right").mousedown(function(e){



$(".cranegame").animateLayer("crane", {
  x: ++,
  y:

})


}).mouseup(function((){
  clearInterval(moveRight);
}) */


$("#reset").click(function(e){

  $(".cranegame").clearCanvas();

})
