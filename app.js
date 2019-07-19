window.addEventListener("resize", () => {
    let heightVar = window.innerHeight;
    let bodyVar = document.getElementsByTagName("body");
    bodyVar[0].style.height = heightVar;
});
window.addEventListener("load", () => {
    let heightVar = window.innerHeight;
    let bodyVar = document.getElementsByTagName("body");
    bodyVar[0].style.height = heightVar + "px";
})