let btAnade = document.getElementById("btAnade")
let lista = document.getElementById("lista");

btAnade.addEventListener("click", function(){
        const li=document.createElement("li");
        li.textContent="Elemento añadido";
        lista.appendChild(li);

})