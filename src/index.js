const getWidth = function(n) {
  if (n < 0) {
    return 1;
  }
  if (n % 2 === 0) {
    return Math.pow(2, (n / 2) + 2) - 3;
  } else {
    return Math.pow(2, ((n + 1) / 2) + 1) - 1;
  }
}

const getHeight = function(n) {
  if (n < 0) {
    return 1;
  }
  if (n % 2 === 0) {
    return Math.pow(2, (n + 2) / 2) - 1;
  } else {
    return Math.pow(2, (n + 1) / 2) - 1;
  }
}

const createBoard = function(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const drawLine = function(board, pos, scale, type) {
  if (type === 'up' || type === 'down') {
    const length = getHeight(scale);
    var startX = pos.x - parseInt(getHeight(scale) / 2);
    for (let i = 0; i < length; i++) {
      if (type === 'up' && i === parseInt(length / 2)) {
        board[pos.y][startX + i] = '┬';
      } else if (type === 'down' && i === parseInt(length / 2)) {
        board[pos.y][startX + i] = '┴';
      } else {
        board[pos.y][startX + i] = '─';
      }
    }
  } else if (type === 'left' || type === 'right') {
    const length = getHeight(scale - 1);
    var startY = pos.y - parseInt(getHeight(scale - 1) / 2);
    for (let i = 0; i < length; i++) {
      if (type === 'left' && i === parseInt(length / 2)) {
        board[startY + i][pos.x] = '├';
      } else if (type === 'right' && i === parseInt(length / 2)) {
        board[startY + i][pos.x] = '┤';
      } else {
        board[startY + i][pos.x] = '│';
      }
    }
  } else {
    const length = getHeight(scale);
    var startX = pos.x - parseInt(getHeight(scale) / 2);
    for (let i = 0; i < length; i++) {
      board[pos.y][startX + i] = '─';
    }
  }
}

const htree = function(n, scale, board, pos, type) {
  drawLine(board, pos, scale, type);

  if (n > 0) {
    if (type === undefined || type === 'up' || type === 'down') {
      htree(n - 1, scale - 1, board, { x: pos.x - (parseInt(getHeight(scale) / 2)) - 1, y: pos.y }, 'left');
      htree(n - 1, scale - 1, board, { x: pos.x + (parseInt(getHeight(scale) / 2)) + 1, y: pos.y }, 'right');
    } else {
      htree(n - 1, scale - 1, board, { x: pos.x, y: pos.y - (parseInt(getHeight(scale - 1) / 2)) - 1 }, 'up');
      htree(n - 1, scale - 1, board, { x: pos.x, y: pos.y + (parseInt(getHeight(scale - 1) / 2)) + 1 }, 'down');
    }
  }
}

const draw = function(board) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += board[i][j];
    }
    result += '\n ';
  }
  return result;
}

const create = function(n, scale) {
  if (n === undefined || n < 0) {
    return '';
  }
  if (scale === undefined || scale < n) {
    scale = n;
  }

  const board = createBoard(getWidth(scale), getHeight(scale)); 
  htree(n, scale, board, { x: parseInt(getWidth(scale) / 2.0), y: parseInt(getHeight(scale) / 2.0) }); 

  return draw(board);
}

module.exports = {
  create: create
};