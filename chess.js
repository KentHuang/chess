;(function () {

var canvas, ctx;
var player1, player2;
const NUMBER_TILES_ACROSS = 8;
const CANVAS_LENGTH = 400;
const TILE_LENGTH = CANVAS_LENGTH/NUMBER_TILES_ACROSS;
var pieceType = {
  PAWN: 'pawn',
  ROOK: 'rook',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  QUEEN: 'queen',
  KING: 'king'
}
var pieceColor = {
  WHITE: 'white',
  BLACK: 'black'
}

// import sprite images
var piecesImages = new Image();
piecesImages.src = 'Chess_Pieces_Sprite.png';
var pieceImageWidth = piecesImages.width / 6;
var pieceImageHeight = piecesImages.height / 2;

// draw the sprite using sprite sheet
function drawPiece(type, color, dx, dy) {
  var sx, sy; // positions on the sprite sheet
  if (color === pieceColor.WHITE) {
    sy = 0;
  } else if (color === pieceColor.BLACK) {
    sy = 1;
  }

  switch (type) {
    case pieceType.PAWN: sx = 5; 
    case pieceType.ROOK: sx = 4;
    case pieceType.KNIGHT: sx = 3;
    case pieceType.BISHOP: sx = 2;
    case pieceType.QUEEN: sx = 1;
    case pieceType.KING: sx = 0;
  }
  
  ctx.drawImage(piecesImages, 5*pieceImageWidth, 0*pieceImageHeight, pieceImageWidth, pieceImageHeight, dx, dy, TILE_LENGTH, TILE_LENGTH);
}

// constructor for a piece object
function Piece(x, y, color, type) {
    // the position of a piece is defined by the positon 
    // of the top left corner of the tile it sits on
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;
    this.isDead = false;
}


function init() {
  // initialize canvas
  canvas = document.createElement('canvas');
  canvas.width = canvas.height = CANVAS_LENGTH;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  // draw the tiles
  for (var i = 0; i < NUMBER_TILES_ACROSS; i++) {
    for (var j = 0; j < NUMBER_TILES_ACROSS; j++) {
      var color = ((i+j)%2 === 0) ? pieceColor.WHITE : pieceColor.BLACK;
      ctx.fillStyle = color;
      ctx.fillRect(i*TILE_LENGTH, j*TILE_LENGTH, TILE_LENGTH, TILE_LENGTH);
    }
  }  

  var pieces = [];

  for (var i = 0; i < NUMBER_TILES_ACROSS; i++) {
    var newWhitePawn = new Piece(i*TILE_LENGTH, 6*TILE_LENGTH, pieceColor.WHITE, pieceType.PAWN);
    var newBlackPawn = new Piece(i*TILE_LENGTH, 1*TILE_LENGTH, pieceColor.BLACK, pieceType.PAWN);
    pieces.push(newWhitePawn);
    pieces.push(newBlackPawn);
  }

  // draw all the pieces in their initial positions
  for (var i = 0; i < pieces.length; i++) {
    drawPiece(pieces[i].type, pieces[i].color, pieces[i].x, pieces[i].y);
  }

}

function update() {}

function draw() {}

function play() {
  


}

window.onload = function() {
  init();
}
 
})();