const gameInfo = document.querySelector(".game-info") ;
const gameOverBtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");
let currentPlayer ;
let gameGrid ;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X" ;
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box , index) =>{
        boxes[index].innerText = "";
        boxes[index].style.pointerEvents = "all" ;

        // When the game is over, and the winner is found , then after clicking the new game button green color will not be removed...so for this , we have to initialise the css property again...
        box.classList = `box box${index+1}` ;
    });

    gameInfo.innerText = `Current Player -${currentPlayer}`;
    gameOverBtn.classList.remove("active");
}
initGame();

function swapTurn(){
    if(currentPlayer === "X")
    {
        currentPlayer = "0" ;
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player -${currentPlayer}`;
}

function checkGameOver()
{
    let answer = "" ;
    winningPosition.forEach((position) =>
    {
        
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
        ((gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) )){
            if(gameGrid[position[0]] === "X")
            {
                answer = "X" ;
            }
            else{
                answer = "0";
            }

            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })
           
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== "")
    {
        gameInfo.innerText = `Winner - ${answer}`;
        gameOverBtn.classList.add("active");
        return ;
    }

    // We can use return as  well as else condition here...

    let fillCount = 0 ;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++ ;
        }  
    });

    if(fillCount === 9)
    {
        gameInfo.innerText = "Game tie !!" ;
        gameOverBtn.classList.add("active");
    }
}
function handleClick(index)
{
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer ;
        gameGrid[index] = currentPlayer ;
        boxes[index].pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}

gameOverBtn.addEventListener("click" , () =>{
    initGame();
});

boxes.forEach((box , index) =>{
    box.addEventListener("click" , () =>{
        handleClick(index);
    });
})