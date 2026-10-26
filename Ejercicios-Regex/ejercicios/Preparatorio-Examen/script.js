// Script primer documento

const tabla=document.createElement("table");

for (let index = 0; index < 2; index++){
    const fila= document.createElement("tr");
    const celda= document.createElement("th");

    celda.style.color="blue";celda.style.fontSize="12px"

    celda.innerHTML=`${index+1} Fila`;
    fila.appendChild(celda);
    tabla.appendChild(fila);
}
document.body.appendChild(tabla);


const input1=document.createElement("input");
const input2=document.createElement("input");


    
document.body.appendChild(input1);
document.body.appendChild(input2);

const button=document.createElement("button");
button.style.width="60px";
button.style.width="60px";
button.style.backgroundColor="red";
button.innerHTML="Pulsa el boton";

document.body.appendChild(button);

button.addEventListener("click", function(){
    if(input1.value!= '' && input2.value!=''){
        alert(Number.parseInt(input1.value)+ Number.parseInt(input2.value))
    }else{
        const p =document.createElement("p").textContent='Inserte valores en los input'
        alert(p)
    }
})

const img= document.createElement('img');
img.src='Captura de pantalla 2026-10-11 a las 18.18.32.png'
img.style.width='500px'
img.style.height='500px'
document.body.appendChild(img);

const button1=document.createElement("button");
button1.style.width="60px";
button1.style.width="60px";
button1.style.backgroundColor="red";
button1.innerHTML="Pulsa el boton";
document.body.appendChild(button1)


const input3=document.createElement("input");
const input4=document.createElement("input");

document.body.appendChild(input3);
document.body.appendChild(input4);
button1.addEventListener("click", function(){
    if(input3.value!='' && input4.value!=''){
        img.style.width=Number.parseInt(input3.value)+'px'
        img.style.height=Number.parseInt(input4.value)+'px'    
    }
})
