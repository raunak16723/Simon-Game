let isGameStarted = false;
let lvl = 0;
let seq = [];
let copySeq = [];

// document.body.addEventListener("keydown", function () {
//     if (lvl == 0) {
//         console.log("hi");
//         startGame();
//     }
// })
document.body.addEventListener("click", function () {
    if (lvl == 0 ) {
        console.log("hi");
        startGame();
    }
})

function startGame() {
    isGameStarted = true;
    lvl++;
    document.querySelector("p").innerHTML = `Level ${lvl}`;
    let randomBox = Math.floor(Math.random() * 4 + 1);
    let boxClass = `.box${randomBox}`;
    let box = document.querySelector(boxClass);
    flick(box);
    console.log(box.id);
    console.log(lvl);
    seq.push(box.id);

}

let boxes = document.querySelectorAll(".colorBox");
for (let box of boxes) {
    box.addEventListener("click", function () {
        if (isGameStarted) {
            flick(box);
            let id = seq.shift();
            console.log(id);
            if (box.id == id) {
                copySeq.push(id);
                if (seq.length === 0) {
                    while (copySeq.length != 0) {
                        seq.push(copySeq.shift());
                    }
                    window.setTimeout(startGame, 500);
                }
            }
            else {
                console.log("wrong answer");
                flickForGameOver();
                while (seq.length != 0) {
                    seq.shift();
                }
                console.log("Game over");
                document.querySelector("p").innerHTML = `GAME OVER! Your score was ${lvl} <br> Tap to restart`;
                setTimeout(()=>{
                    lvl=0
                },2000);
            }
        }
    })
}

function flickForGameOver() {
    document.body.style.backgroundColor = "red";
    isGameStarted = false;
    setTimeout(function () {
        document.body.style.backgroundColor = "white";
    }, 500);
}

function flick(box) {
    box.classList.add("flick");
    setTimeout(function () {
        box.classList.remove("flick");
    }, 500);
}