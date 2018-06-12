class Place {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cost = 0;
        this.heuristic = 0;
        this.estimation = 0; // Estimation of the distance between the origin and the target if going through this point
        this.neighbors = [];
        this.elder = null;

        return this;s
    }

    show(color) {
        fill(color);
        noStroke();
        rect(this.x * canvasWidth / cols, this.y * canvasHeight / rows,
            canvasWidth / cols - 1,      canvasHeight / rows - 1);
    }

    addNeighbors(grid){
        if(this.x < cols - 1){
            this.neighbors.push(grid[this.x+1][this.y]);
        }
        if(this.x > 0){
            this.neighbors.push(grid[this.x-1][this.y]);
        }
        if(this.y < rows - 1){
            this.neighbors.push(grid[this.x][this.y+1]);
        }
        if(this.y > 0){
            this.neighbors.push(grid[this.x][this.y-1]);
        }
    }

}