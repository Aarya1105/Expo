// REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);


// LOCOMOTIVE SCROLL
const locoScroll = new LocomotiveScroll({
el: document.querySelector("#main"),
smooth: true,
lerp:0.08
});

// UPDATE SCROLLTRIGGER
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
scrollTop(value) {
return arguments.length
? locoScroll.scrollTo(value, 0, 0)
: locoScroll.scroll.instance.scroll.y;
},
getBoundingClientRect() {
return {top:0, left:0, width:window.innerWidth, height:window.innerHeight};
}
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


// IMAGE ANIMATION
gsap.utils.toArray("img").forEach(img=>{
gsap.to(img,{
opacity:1,
y:0,
scale:1,
duration:1.2,
scrollTrigger:{
trigger:img,
scroller:"#main",
start:"top 75%"
}
});
});
document.querySelectorAll("img").forEach(img=>{
img.onload = () => locoScroll.update();
});

// TYPEWRITER EFFECT
document.querySelectorAll(".typing").forEach(el=>{

let text = el.dataset.text || el.textContent;

el.textContent="";
let i=0;

function type(){
if(i < text.length){
el.textContent += text.charAt(i);
i++;
setTimeout(type,30);
}
}

ScrollTrigger.create({
trigger:el,
scroller:"#main",
start:"top 75%",
once:true,
onEnter:type
});

});


// MUSIC FIX
document.body.addEventListener("click",()=>{
document.getElementById("bgMusic").play();
});

window.addEventListener("load",()=>{
ScrollTrigger.refresh();
});

// WAIT UNTIL EVERYTHING LOADS
window.addEventListener("load", () => {

setTimeout(()=>{
locoScroll.update();
ScrollTrigger.refresh();
},1000);

});