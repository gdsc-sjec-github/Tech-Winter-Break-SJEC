var page = document.querySelector("#page");
var cursor = document.querySelector("#cursor");



const notescontainer = document.querySelector(".container");
const createbtn = document.querySelector(".btn");

function updateStorage(){
    localStorage.setItem("notes",notescontainer.innerHTML);


}
function loadNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notescontainer.innerHTML = savedNotes;
    }
}

createbtn.addEventListener("click", () => {
    
    let inputbox = document.createElement("p");
    let img = document.createElement("img");

    inputbox.className = "inputbox";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.className = "delete-icon"; 
    inputbox.appendChild(img);
    notescontainer.appendChild(inputbox);
});

notescontainer.addEventListener("click", function(dets) {
    if (dets.target.tagName === "IMG") {
       
        dets.target.parentElement.remove();
        updateStorage();
    }
});

window.addEventListener("load", loadNotes);

    
    

