/**
 * 
 * @param {string} word 
 */
function invertir(word){
    return word.split("").reverse().join("");
}

/**
 * 
 * @param {string} text 
 */
function contarVocales(text){
    let contador=0
    for (const letra of text) {
        if("aeiou".includes(letra.toLocaleLowerCase())){
            contador++
        }
    }
    return contador;
}
/**
 * 
 * @param {{nombre:string , edad:number}} 
 */
function agruparPersonas(personas){
const lista={}
    for (const persona of personas) {
        lista.push(persona.edad,persona.nombre);
    }
    return lista 
}


const contador={
    a:1
}
contador.a+1
contador.contains('z');
console.log(contador)