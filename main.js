var cols = 30;
var rows = 30;
var wallsDropRate = 0.50


var closedList = Array();
var openList = Array();

var origin;
var target;
var path = [];

var grid;

var canvasWidth = window.innerHeight - 12;
var canvasHeight = window.innerHeight - 12;


function setup() {


    createCanvas(canvasWidth, canvasHeight);

    grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Place(i, j);
            if (Math.random() < wallsDropRate) {
                grid[i][j].wall = true;
            }
        }
    }


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    origin = grid[0][0];
    target = grid[cols - 1][rows - 1];
    origin.wall = false;
    target.wall = false;
    openList.push(origin);

}

// execution loop
function draw() {

    background(255);

    if (openList.length > 0) {
        let lowestIndex = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].heuristic < openList[lowestIndex].heuristic) {
                lowestIndex = i;
            }
        }

        var actual = openList[lowestIndex];

        if (actual === target) {
            console.log("Path found !");
            noLoop();
        }

        closedList.push(actual);
        openList.remove(actual);

        actual.neighbors.forEach(neighbor => {
            if (!closedList.includes(neighbor) && !neighbor.wall) {
                var tempCost;
                var newPath = false;
                if (actual.x !== neighbor.x && actual.y !== neighbor.y) {
                    tempCost = actual.cost + Math.sqrt(2);
                }
                else {
                    tempCost = actual.cost + 1;
                }

                if (openList.includes(neighbor)) {
                    if (tempCost < neighbor.cost) {
                        neighbor.cost = tempCost;
                        newPath = true;
                    }
                } else {
                    neighbor.cost = tempCost;
                    openList.push(neighbor);
                    newPath = true;
                }

                if (newPath) {
                    neighbor.heuristic = heuristic(neighbor, target);
                    neighbor.estimation = neighbor.heuristic + neighbor.cost;
                    neighbor.elder = actual;
                }
            }
        });


    } else {
        console.log("No solution for path");
        noLoop();
    }


    // Debug and visual effects
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    closedList.forEach(item => {
        item.show(color(222, 35, 50));
    });

    openList.forEach(item => {
        item.show(color(24, 200, 28));
    });


    let temp = actual;
    path = [];
    path.push(temp);
    while (temp && temp.elder != null) {
        path.push(temp.elder);
        temp = temp.elder;
    }

    if(path.length > 0){
        noFill();
        stroke(180, 24, 180);
        strokeWeight(canvasWidth / cols / 2);
        beginShape();
        path.forEach(item => {
            vertex(item.x * canvasWidth / cols, item.y * canvasHeight / rows);
        });
        endShape();
    }
}


Array.prototype.remove = function (item) {
    let index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
}

function heuristic(a, b) {
    return dist(a.x, a.y, b.x, b.y);
}