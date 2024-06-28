let size = storedValue;

let numberOfTiles = size*size;

let moves =0;

let width = "30";
let height = "30";

let spacing = 0.5;

let tileWidth = (width-2-spacing*(size+1))/size;
let tileHeight = (height-2-spacing*(size+1))/size;

box = document.getElementById("box");

box.style.width = width + "vw";
box.style.height = height + "vw";

let reference = [];

for(let i=0; i< numberOfTiles-1; i++){
    let col = i % size;
    let row = Math.floor(i/size);
    reference.push(`assets/${size}-${col}${row}.jpg`);
}

reference.push(`assets/${size}-${size-1}${size-1}.jpg`)

let newdata = dataBase[0];

//for checking of win condition uncomment the following code

// let newdata = [];

// for(let i =0; i<numberOfTiles ; i++){
//     newdata.push(i);
// }

let data = [];

for(let j =0;j<size;j++){
    data.push([]);
}

for(let i =0;i<numberOfTiles;i++){
    let row = Math.floor(i/size);
    let imgcol = newdata[i]%size;
    let imgrow = Math.floor(newdata[i]/size);
    data[row].push(`assets/${size}-${imgcol}${imgrow}.jpg`);
}

switch (size) {
    case 3:
        box.style.border = "1vw solid #FFCD00";
        break;
    case 4:
        box.style.border = "1vw solid #810177";
        break;
    case 5:
        box.style.border = "1vw solid #D70000";
        break;            
    default:
        box.style.border = "1vw solid grey";
};

document.addEventListener("keydown",tileArrow);

//Function to create tiles
function makeTiles(){
    for(let i =0;i < numberOfTiles;i++){
        let row = Math.floor(i/ size);       
        let col = i% size;
        if(data[row][col]!= `assets/${size}-${size-1}${size-1}.jpg`){
            let tile = document.createElement("img");
            tile.style.width = tileWidth + "vw";
            tile.style.height = tileHeight + "vw";
            tile.className = "number-tile";
            tile.src = `${data[row][col]}`;
            box.appendChild(tile);
            positionTiles(tile, col, row);
            tile.addEventListener("click",tileClicked);
        }
    }
}

//Function to position tiles
function positionTiles(tile, col, row) {
    var x = col *(tileWidth + spacing) + spacing;
    var y = row * (tileHeight+ spacing) + spacing;
  
    tile.style.left = x + "vw";
    tile.style.top = y + "vw";

    tile.style.transition = 'left 0.5s, top 0.5s';
}

//Click functionality
function tileClicked(event){
    let tile = event.currentTarget;
    let value = tile.src;
    let x,y;
    loop1:
    for(x=0 ; x < data.length ; x++) {
        for(y=0 ; y < data.length; y++) {
            if(data[x][y] == value.slice(-15)){
                break loop1;
            }
        }
    }
    moveTile(tile,x,y);
}

//Arrow functonality 
let numberTiles = document.getElementsByClassName("number-tile");

function tileArrow(event){
    if (event.key === "ArrowUp") {
        loop1:
        for(let i=0 ; i < size ; i++) {
            for(let j=0 ; j < size ; j++) {
                if(data[i][j] == `assets/${size}-${size-1}${size-1}.jpg`){
                    for(let k=0;k<numberOfTiles-1; k++){
                        let img = numberTiles[k].src;
                        if(img.slice(-15) === data[i+1][j]){
                            moveTile(numberTiles[k],i+1,j);
                            break loop1;
                        }
                    }
                    break loop1;     
                }
            }
        }
    }

    else if (event.key === "ArrowDown") {
        loop1:
        for(let i=0 ; i < size ; i++) {
            for(let j=0 ; j < size ; j++) {
                if(data[i][j] == `assets/${size}-${size-1}${size-1}.jpg`){
                    for(let k=0;k<numberOfTiles-1; k++){
                        let img = numberTiles[k].src;
                        if(img.slice(-15) === data[i-1][j]){
                            moveTile(numberTiles[k],i-1,j);
                            break loop1;
                        }
                    }
                    break loop1;     
                }
            }
        }
    } 

    else if (event.key === "ArrowLeft") {
        loop1:
        for(let i=0 ; i < size ; i++) {
            for(let j=0 ; j < size ; j++) {
                if(data[i][j] == `assets/${size}-${size-1}${size-1}.jpg`){
                    for(let k=0;k<numberOfTiles-1; k++){
                        let img = numberTiles[k].src;
                        if(img.slice(-15) === data[i][j+1]){
                            moveTile(numberTiles[k],i,j+1);
                            break loop1;
                        }
                    }
                    break loop1;     
                }
            }
        }
    }
    
    else if (event.key === "ArrowRight") {
        loop1:
        for(let i=0 ; i < size ; i++) {
            for(let j=0 ; j < size ; j++) {
                if(data[i][j] == `assets/${size}-${size-1}${size-1}.jpg`){
                    for(let k=0;k<numberOfTiles-1; k++){
                        let img = numberTiles[k].src;
                        if(img.slice(-15) === data[i][j-1]){
                            moveTile(numberTiles[k],i,j-1);
                            break loop1;
                        }
                    }
                    break loop1;     
                }
            }
        }
    }
}

//Function to move a tile
function moveTile(tile,row,col){
    document.getElementById("moves").innerHTML = moves;
    let dx=0;
    let dy=0;
    if(col>0 && data[row][col-1] == `assets/${size}-${size-1}${size-1}.jpg`){
        dx = -1;
        moves++;
    }
    else if(col<size-1 && data[row][col + 1] == `assets/${size}-${size-1}${size-1}.jpg`){
        dx = 1;
        moves++;
    }
    else if( row> 0 && data[row -1 ][col ] == `assets/${size}-${size-1}${size-1}.jpg`){
        dy = -1;
        moves++;
    }
    else if( row <size -1 && data[row+1][col] == `assets/${size}-${size-1}${size-1}.jpg`){
        dy = 1;
        moves++;
    }
    else{
        return;
    }
    let value = data[row][col];
    data[row + dy][col + dx] = value;
    data[row][col] = `assets/${size}-${size-1}${size-1}.jpg`;
    positionTiles(tile,col + dx ,row + dy);

    checkWinGame();
}

//Function to check win condition
function checkWinGame(){
    let flag = 1;
    loop1:
    for(let row = 0; row < size;row++){
        for(let col = 0 ; col< size ; col++){
            if(data[row][col] != reference[row*size+col]){
                flag = 0;
                break loop1;
            }
        }
    }
    if(flag == 1 ){
        let opacity = 0;
        pauseTimer();
        let tile = document.createElement("img");
        tile.style.width = tileWidth + "vw";
        tile.style.height = tileHeight + "vw";
        tile.className = "number-tile";
        tile.src = `assets/${size}-${size-1}${size-1}.jpg`;
        tile.style.opacity = opacity;
        box.appendChild(tile);
        positionTiles(tile,size-1,size-1)
        let intervalId = setInterval(function(){
            opacity += 0.1;
            tile.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(intervalId);
            }
        },100)
        let game = document.getElementById("game");
        let win = document.getElementById("win_stats");
        setTimeout(function(){
            finalImage.style.opacity = 1;
            let numbersTiles = document.getElementsByClassName("number-tile");
            for(let i = 0; i < numbersTiles.length; i++) {
                numbersTiles[i].style.display = "none";
            }
        }
        ,1500);

        setTimeout(function(){
            game.style.display = "none";
            win.style.display = "block";
        },2500);

        document.getElementById("play").style.display = "none";

        let finalImage = document.getElementById("finalImg");
        finalImage.innerHTML = `<img src="assets/${size}.jpg" alt="" srcset="">`;

        let noMoves = document.getElementById("move");
        noMoves.innerHTML = `You used ${moves} moves to win`;

        let timeTaken = document.getElementById("minutes")
        timeTaken.innerHTML = `You took ${minutes}:${seconds} minutes to complete the game`;
    }
}

makeTiles();