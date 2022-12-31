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

const LINES = {
  '─': {
    STANDARD: '─',
    BOLD: '━',
    DOUBLE: '═',
  },
  '│': {
    STANDARD: '│',
    BOLD: '┃',
    DOUBLE: '║',
  },
  '┌': {
    STANDARD: '┌',
    BOLD: '┏',
    DOUBLE: '╔',
  },
  '┐': {
    STANDARD: '┐',
    BOLD: '┓',
    DOUBLE: '╗',
  },
  '┘': {
    STANDARD: '┘',
    BOLD: '┛',
    DOUBLE: '╝',
  },
  '└': {
    STANDARD: '└',
    BOLD: '┗',
    DOUBLE: '╚',
  },
  '┼': {
    STANDARD: '┼',
    BOLD: '╋',
    DOUBLE: '╬',
  },
  '├': {
    STANDARD: '├',
    BOLD: '┣',
    DOUBLE: '╠',
  },
  '┤': {
    STANDARD: '┤',
    BOLD: '┫',
    DOUBLE: '╣',
  },
  '┬': {
    STANDARD: '┬',
    BOLD: '┳',
    DOUBLE: '╦',
  },
  '┴': {
    STANDARD: '┴',
    BOLD: '┻',
    DOUBLE: '╩',
  }
};

const getLine = function(lineId, lineType) {
  if (LINES[lineId] !== undefined && lineType !== undefined) {
    return LINES[lineId][lineType.toUpperCase()];
  } else if (LINES[lineId] !== undefined) {
    return LINES[lineId].STANDARD;
  } else {
    return ' ';
  }
}

const getLineType = function(line) {
  if (line !== undefined && (line.toLowerCase() === 'standard' || line.toLowerCase() === 'double' || line.toLowerCase() === 'bold')) {
    return line.toLowerCase();
  }
  return 'standard';
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

const drawLine = function(board, pos, size, type) {
  if (type === 'up' || type === 'down') {
    const length = getHeight(size);
    var startX = pos.x - parseInt(getHeight(size) / 2);
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
    const length = getHeight(size - 1);
    var startY = pos.y - parseInt(getHeight(size - 1) / 2);
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
    const length = getHeight(size);
    var startX = pos.x - parseInt(getHeight(size) / 2);
    for (let i = 0; i < length; i++) {
      board[pos.y][startX + i] = '─';
    }
  }
}

const htree = function(n, size, board, pos, type) {
  drawLine(board, pos, size, type);

  if (n > 0) {
    if (type === undefined || type === 'up' || type === 'down') {
      htree(n - 1, size - 1, board, { x: pos.x - (parseInt(getHeight(size) / 2)) - 1, y: pos.y }, 'left');
      htree(n - 1, size - 1, board, { x: pos.x + (parseInt(getHeight(size) / 2)) + 1, y: pos.y }, 'right');
    } else {
      htree(n - 1, size - 1, board, { x: pos.x, y: pos.y - (parseInt(getHeight(size - 1) / 2)) - 1 }, 'up');
      htree(n - 1, size - 1, board, { x: pos.x, y: pos.y + (parseInt(getHeight(size - 1) / 2)) + 1 }, 'down');
    }
  }
}

const draw = function(board, lineType) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += getLine(board[i][j], lineType);
    }
    result += '\n ';
  }
  return result;
}

const create = function(n, config) {
  if (n === undefined || n < 0) {
    return '';
  }
  
  let size = n;
  if (config && config.size && config.size > n) {
    size = config.size;
  }

  const lineType = config !== undefined ? getLineType(config.line) : undefined;

  const board = createBoard(getWidth(size), getHeight(size)); 
  htree(n, size, board, { x: parseInt(getWidth(size) / 2.0), y: parseInt(getHeight(size) / 2.0) }); 

  return draw(board, lineType);
}

module.exports = {
  create: create
};