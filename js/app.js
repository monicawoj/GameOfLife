document.addEventListener('DOMContentLoaded', function() {

    var play = document.querySelector('#play');
    var pause = document.querySelector('#pause');
    var startButton = document.querySelector('.start');

    var GameOfLife = function(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.querySelector('#board');
        this.blocks = [];
        this.numberCells = boardWidth * boardHeight;
        this.createBoard = function() {
            this.board.style.width = (boardWidth * 15) + 'px';
            this.board.style.height = (boardHeight * 15) + 'px';
            for (i=0; i<this.numberCells; i++) {
                    var block = document.createElement('div');
                    this.blocks.push(block);
                    this.board.appendChild(block);
            }
            this.blocks.forEach(function(element) {
                element.addEventListener('click', function(event) {
                    if (element.className.indexOf('live') === -1) {
                        element.classList.add('live');
                    } else {
                        element.classList.remove('live');
                    }
                });
            });
        };
        this.blockIndex = function(x,y) {
            return this.blocks[x + (y * boardWidth)];
        };
        this.setCellState = function(x,y,state) {
            if (state==='live') {
                this.blockIndex(x,y).classList.add('live');
            } else {
                this.blockIndex(x,y).classList.remove('live');
            }
        };
        this.firstGlider = function() {
            this.setCellState(0,2,'live');
            this.setCellState(1,2,'live');
            this.setCellState(2,2,'live');
            this.setCellState(2,1,'live');
            this.setCellState(1,0,'live');
        };
        this.neighborState = function(x,y) {
            if (typeof this.blockIndex(x,y) !== 'undefined') {
                if (this.blockIndex(x,y).className.indexOf('live') !== -1) {
                    //console.log('1');
                    return 1;
                } else {
                    //console.log('0');
                    return 0;
                }
            }
            else {
                //console.log('undefined and 0');
                return 0;
            }
        };
        this.computeCellNextState = function(x,y) {
            var neighbors = [];
            neighbors[0] = this.neighborState(x-1,y-1);
            neighbors[1] = this.neighborState(x,y-1);
            neighbors[2] = this.neighborState(x+1,y-1);
            neighbors[3] = this.neighborState(x-1,y);
            neighbors[4] = this.neighborState(x+1,y);
            neighbors[5] = this.neighborState(x-1,y+1);
            neighbors[6] = this.neighborState(x,y+1);
            neighbors[7] = this.neighborState(x+1,y+1);

            var numberLiveNeighbors = neighbors.filter(function(x){return x==1}).length;

            //if currently alive
            if (this.blockIndex(x,y).className.indexOf('live') !== -1) {
                //if less than two neighbors, dies
                if (numberLiveNeighbors < 2) {
                    return 0;
                }
                // //if two or three neighbors, lives
                if (numberLiveNeighbors === 2 || numberLiveNeighbors === 3) {
                    return 1;
                }
                //if greater than three neighbors, dies
                if (numberLiveNeighbors > 3) {
                    return 0;
                }
            }
            //if not currently alive
            else {
                //if exactly three neighbors, comes alive
                if (numberLiveNeighbors === 3) {
                    return 1;
                } else {
                    return 0;
                }
            }
        };
        this.computeNextGeneration = function() {
            var nextGenerationStates = [];
            for (var i=0; i<this.height; i++) {
                for (var j=0; j<this.width; j++) {
                    nextGenerationStates.push(this.computeCellNextState(j,i));
                }
            }
            return nextGenerationStates;
        };
        this.printNextGeneration = function() {
            var nextGenerationArray = this.computeNextGeneration();
            for (var i=0; i<nextGenerationArray.length; i++) {
                if (nextGenerationArray[i] === 1) {
                    this.blocks[i].classList.add('live');
                } else {
                    this.blocks[i].classList.remove('live');
                }
            }
        };

        var self = this;
        play.addEventListener('click', function(event) {
            self.intervalId = setInterval(function() {
                self.printNextGeneration();
            }, 500);
        });

        pause.addEventListener('click', function(event) {
            clearInterval(self.intervalId);
        });
    };

    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        var userWidth = document.querySelector('#width-set').value;
        var userHeight = document.querySelector('#height-set').value;
        var game = new GameOfLife(parseInt(userWidth),parseInt(userHeight));
        game.createBoard();
        game.firstGlider();
        document.querySelector('#game-set').style.display = 'block';
    });
});