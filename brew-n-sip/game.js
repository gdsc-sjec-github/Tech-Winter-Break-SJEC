const bg = document.querySelector("#bgame");
const cup = document.querySelector(".empty");
const locs = document.querySelectorAll(".loc");
const audio = document.getElementById('bgmusic');
const MButton = document.getElementById('MusicButton');
const sugarbtn = document.querySelector(".sugar");
const newpos = document.getElementById("new");
const sugarimg = document.getElementById("sugarImage");

cup.addEventListener("drag", dragging);
cup.addEventListener("dragstart", dragStart);

let beingDragged;
let text2Displayed = false;

locs.forEach(loc => {
    loc.addEventListener("dragover", dragover);
    loc.addEventListener("dragenter", dragEnter);
    loc.addEventListener("dragleave", dragLeave);
    loc.addEventListener("drop", dragDrop);
    loc.addEventListener("dragend", dragEnd);
});

gsap.to("#text1", {
    y: -100,
    duration: 5,
    delay: 1,
    ease: "power2.out",
    onComplete: function () {
        gsap.to("#text1", {
            y: 0,
            duration: 3,
            delay: 1,
            ease: "power2.out",
        });
    }
});

sugarbtn.addEventListener('click', function () {
    sugarimg.style.display = "block";
    sugarbtn.style.display = "none";

    setTimeout(function () {
        sugarimg.style.display = "none";
    }, 5000);
});

function dragging(e) {
    console.log(e);
}

function dragStart(e) {
    beingDragged = e.target;
    console.log(e);
    e.dataTransfer.setData("text", e.target.id);
}

function dragover(e) {
    e.preventDefault();
    console.log("dragged over " + e.target.classList);
}

function dragEnter(e) {
    console.log("entering  " + e.target.classList);
}

function dragLeave(e) {
    console.log("it left  " + e.target.classList);
}

function dragDrop(e) {
    console.log("dropped on " + e.target.classList);

    e.target.append(beingDragged);

    bg.innerHTML = '<img src="images/filling3 (1).png" >';
    cup.src = "images/filledcup.png";

    setTimeout(function () {
        console.log("bg back to normal");
        bg.innerHTML = '<img src="images/gamebg.png" >';
    }, 2000);

    if (e.target === newpos) {
        sugarbtn.style.display = "block";
    }

    if (!text2Displayed) {
        gsap.to("#text2", {
            y: -100,
            duration: 3,
            delay: 1,
            ease: "power2.out",
            onComplete: function () {
                gsap.to("#text2", {
                    y: 0,
                    duration: 2,
                    delay: 1,
                    ease: "power2.out",
                });
            }
        });
        text2Displayed = true;
    }
}

function dragEnd(e) {
    console.log("you finished dragging " + e.target.classList);
}

MButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();  
    } else {
        audio.pause();  
    }
});
