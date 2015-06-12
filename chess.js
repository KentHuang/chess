;(function () {

var canvas, ctx;
// var player1, player2;
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
var GAME_OVER = false;
var TURN = 0; // 0 is white, 1 is black

// import sprite images
var piecesImages = new Image();
piecesImages.src = 'Chess_Pieces_Sprite.png';
var pieceImageWidth = piecesImages.width / 6;
var pieceImageHeight = piecesImages.height / 2;

// contains all pieces objects
var pieces = [];

// constructor for a piece object
function Piece(x, y, color, type) {
    // the position of a piece is defined by the positon 
    // of the top left corner of the tile it sits on
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;
}

// draw the sprite using sprite sheet
function drawPiece(piece) {
  var sx, sy; // positions on the sprite sheet
  if (piece.color === pieceColor.WHITE) {
    sy = 0;
  } else if (piece.color === pieceColor.BLACK) {
    sy = 1;
  }

  switch (piece.type) {
    case pieceType.PAWN: sx = 5; break;
    case pieceType.ROOK: sx = 4; break;
    case pieceType.KNIGHT: sx = 3; break;
    case pieceType.BISHOP: sx = 2; break;
    case pieceType.QUEEN: sx = 1; break;
    case pieceType.KING: sx = 0; break;
    default: console.log('piece type error');
  }
  
  ctx.drawImage(piecesImages, sx*pieceImageWidth, sy*pieceImageHeight, pieceImageWidth, pieceImageHeight, piece.x, piece.y, TILE_LENGTH, TILE_LENGTH);
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
      var color = ((i+j)%2 === 0) ? '#FFFFFF' : '#808080';
      ctx.fillStyle = color;
      ctx.fillRect(i*TILE_LENGTH, j*TILE_LENGTH, TILE_LENGTH, TILE_LENGTH);
    }
  }  

  function constructMiscPieces(color) {
    var pos = (color === pieceColor.WHITE) ? 7 : 0

    var rook1 = new Piece(0*TILE_LENGTH, pos*TILE_LENGTH, color, pieceType.ROOK);
    var knight1 = new Piece(1*TILE_LENGTH, pos*TILE_LENGTH, color, pieceType.KNIGHT);
    var bishop1 = new Piece(2*TILE_LENGTH, pos*TILE_LENGTH, color, pieceType.BISHOP);
    var queen = new Piece(3*TILE_LENGTH, pos*TILE_LENGTH, color, pieceType.QUEEN);
    var king = new Piece(4*TILE_LENGTH, pos*TILE_LENGTH, color, pieceType.KING);
    var bishop2 = new Piece(5*TILE_LENGTH, pos*TILE_LENGTH, color, pieceType.BISHOP);
    var knight2 = new Piece(6*TILE_LENGTH, pos*TILE_LENGTH, color, pieceType.KNIGHT);
    var rook2 = new Piece(7*TILE_LENGTH, pos*TILE_LENGTH, color, pieceType.ROOK);
    pieces.push(rook1);
    pieces.push(rook2);
    pieces.push(knight1);
    pieces.push(knight2);
    pieces.push(bishop1);
    pieces.push(bishop2);
    pieces.push(queen);
    pieces.push(king);
  }

  // construct the pawns
  for (var i = 0; i < NUMBER_TILES_ACROSS; i++) {
    var newWhitePawn = new Piece(i*TILE_LENGTH, 6*TILE_LENGTH, pieceColor.WHITE, pieceType.PAWN);
    var newBlackPawn = new Piece(i*TILE_LENGTH, 1*TILE_LENGTH, pieceColor.BLACK, pieceType.PAWN);
    pieces.push(newWhitePawn);
    pieces.push(newBlackPawn);
  }
  // construct all other pieces
  constructMiscPieces(pieceColor.WHITE);
  constructMiscPieces(pieceColor.BLACK);

  // draw all the pieces in their initial positions
  for (var i = 0; i < pieces.length; i++) {
    drawPiece(pieces[i]);
  }
}


function isValidType(type) {
  return type === pieceType.ROOK ||
    type === pieceType.KNIGHT ||
    type === pieceType.BISHOP ||
    type === pieceType.QUEEN ||
    type === pieceType.KING ||
    type === pieceType.PAWN;
}

function isValidCoord(coord) {
  if (coord.length != 2) {
    return false
  } else {
    var sx = coord[0].charCodeAt(0) - 97;
    var sy = parseInt(coord[1]) - 1;
    return (sx >= 0 && sx <= 7) && (sy >= 0 && sy <= 7);
  }
}

function moveSyntaxIsValid(type, curr, dest) {
  if (!isValidType(type)) { console.log('Invalid piece type'); return false; }
  
  if (!isValidCoord(curr)) { console.log('Invalid current coords'); return false; }

  if (!(dest === 'castling' || dest === 'promote' || isValidCoord(dest))) { console.log('Invalid destination or command'); return false; }
  else if (dest === 'castling' && type !== pieceType.ROOK) { console.log('Only Rooks can castle'); return false; }
  else if (dest === 'promote' && type !== pieceType.PAWN) { console.log('Only Pawns can be promoted'); return false; }
  return true;
}

// console.assert(moveSyntaxIsValid('rook e3 castling'));
// console.assert(moveSyntaxIsValid('pawn b3 promote'));
// console.assert(moveSyntaxIsValid('rook b3 b6'));
// console.assert(moveSyntaxIsValid('rook b3 promote'));
// console.assert(moveSyntaxIsValid('pawn b3 castling'));
// console.assert(moveSyntaxIsValid('rook b99 promote'));
// console.assert(moveSyntaxIsValid('rok b3 promote'));
// console.assert(moveSyntaxIsValid('rook b3 b7'));

function moveIsValid(type, curr, dest) {
  if (!moveSyntaxIsValid(type, curr, dest)) { 
    return false; 
  } else {
    return true;
  }
}

function update(curr, dest) {
  for (var i = 0; i < pieces.length; i++) {
    var sx = (curr[0].charCodeAt(0) - 97)*TILE_LENGTH;
    var sy = (parseInt(curr[1]) - 1)*TILE_LENGTH;
    if (pieces[i].x == sx && pieces[i].y == sy) {
      pieces[i].x = (dest[0].charCodeAt(0) - 97)*TILE_LENGTH;
      pieces[i].y = (parseInt(dest[1]) - 1)*TILE_LENGTH;
    }
    drawPiece(pieces[i]);
  }
}


window.onload = function() {
  init();

  // a String in the form of "[piece] [current coord] [destination coord]"
  // or "[rook] [current coord] ['castling']"
  // or "[pawn] [current coord] ['promote']"
  var move = ''; 
  var input = document.getElementById('inputMove');
  var button = document.getElementById('inputButton');

  button.addEventListener('click', function () {
    move = input.value;
    input.value = '';
    var parsedMove = move.split(/[ ,]+/);
    if (parsedMove.length !== 3) { 
      console.log('Invalid sytnax. Try again.');
      return; 
    } 

    var type = parsedMove[0],
        curr = parsedMove[1],
        dest = parsedMove[2];

    if (moveIsValid(type, curr, dest)) {
      update(curr, dest);
    }
  }, false);
}






 
})();



