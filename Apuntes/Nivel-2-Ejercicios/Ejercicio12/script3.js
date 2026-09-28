let enlace= document.getElementById("enlace");
console.log(1);

enlace.addEventListener("click", function(){
    enlace.classList.toggle("oculto");
    let adicional= document.getElementById("adicional");
    adicional.classList.toggle("visible");

})