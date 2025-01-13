var door=document.getElementById("transparent");

door.addEventListener("click",function(){
    window.location.href="game.html"
})

gsap.to("#text",{
    y:-100,
    duration:3,
    delay:1,
    ease: "power2.out",

})
window.addEventListener('load', function() {
   
    const bgMusic = document.getElementById('music');
    
    
    bgMusic.play().then(() => {
        console.log("Music is playing!");
    }).catch(error => {
        console.error("Music autoplay failed: ", error);
    });
});