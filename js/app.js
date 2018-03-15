document.addEventListener('DOMContentLoaded', function() {

    var GameOfLife = function(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.querySelector('#board');
        this.blocks = [];
        this.numberCells = boardWidth * boardHeight;
        this.createBoard = function() {
            this.board.style.width = (boardWidth * 10) + 'px';
            this.board.style.height = (boardHeight * 10) + 'px';
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
            } if (state === 'dead') {
                this.bloackIndex(x,y).classList.remove('live');
            }
        };
        this.firstGlider = function() {
            this.setCellState(2,3,'live');
            this.setCellState(3,3,'live');
            this.setCellState(4,3,'live');
            this.setCellState(4,2,'live');
            this.setCellState(3,1,'live');
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
            for (var i=0; i<this.width; i++) {
                for (var j=0; j<this.height; j++) {
                    nextGenerationStates.push(this.computeCellNextState(i,j));
                }
            }
            console.log(nextGenerationStates);
        };
        this.printNextGeneration = function() {

        };
    };

    var game = new GameOfLife(10,10);
    console.log(game);
    game.createBoard();
    console.log(game.board.style.width);
    console.log(game.blocks);
    console.log(game.blockIndex(3,3));
    game.firstGlider();
    //game.neighborState(0,0);
    //game.computeCellNextState(3,3);
    console.log(game.computeCellNextState(0,0));
    game.computeNextGeneration();


});
