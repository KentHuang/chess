;(function () {

var canvas, ctx;
var player1, player2;
const NUMBER_TILES_ACROSS = 8;
const CANVAS_LENGTH = 400;
const TILE_LENGTH = CANVAS_LENGTH/NUMBER_TILES_ACROSS;


function init() {
  canvas = document.createElement('canvas');
  canvas.width = canvas.height = CANVAS_LENGTH;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  for (var i = 0; i < NUMBER_TILES_ACROSS; i++) {
    for (var j = 0; j < NUMBER_TILES_ACROSS; j++) {
      var color = ((i+j)%2 === 0) ? 'white' : 'black';
      ctx.fillStyle = color;
      ctx.fillRect(i*TILE_LENGTH, j*TILE_LENGTH, TILE_LENGTH, TILE_LENGTH);
    }
  }  

  var pieces = [];

  
}

function update() {}

function draw() {}

function play() {
  


}

window.onload = function() {
  init();
  play();

}
 
})();