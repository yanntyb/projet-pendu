let divLetters = document.getElementById("lettres");
let input = document.getElementById("input");
let divMot = document.getElementById("mot");
let buttonInput = document.getElementById("submit");
let divEnd = document.getElementById("end");

let step = 1



let letters = ["a","b","c","d","e","f", "g","h","i","j","k","l","m","n","o", "p","q","r","s","t","u","v","w","x","y","z"];
let mots = ["chat","chien","maison","voiture","chaise","lion","fenetre","ordinateur","telephone","clef","abrit","planete","illustration","chemin"]

function afficherImage(step){
    console.log("step",step)
    let img = document.createElement("img");
    let divImg = document.getElementById("imagePendu");

    for(let i of divImg.children){
        divImg.removeChild(i);
    }

    switch (step){
        case 1:
            img.src = "image/1.webp";
            img.style.width = "50%";
            divImg.appendChild(img);
            break;
        case 2:
            img.src = "image/2.webp";
            img.style.width = "50%";
            divImg.appendChild(img);
            break;
        case 3:
            img.src = "image/3.webp";
            img.style.width = "50%";
            divImg.appendChild(img);
            break;
        case 4:
            img.src = "image/4.webp";
            img.style.width = "50%";
            divImg.appendChild(img);
            break;
        case 5:
            img.src = "image/5.webp";
            img.style.width = "50%";
            divImg.appendChild(img);
            break;
        case 6:
            img.src = "image/6.webp";
            img.style.width = "50%";
            divImg.appendChild(img);
            break;
        case 7:
            img.src = "image/7.webp";
            img.style.width = "50%";
            divImg.appendChild(img);
            break;

    }
}

function initafficherLettre(mot, end){
    for(let i = (divMot.children.length - 1); i >= 0; i--){
        console.log(divMot.children[i])
        divMot.removeChild(divMot.children[i]);
    }
    for(let letter in mot){
        let div = document.createElement("div");
        if(end){
            div.innerHTML = mot[letter];
        }
        div.id = letter;
        div.className = "lettreAffiche";
        divMot.appendChild(div);
    }
}

function initLetter(letters, mot){
    for(let i = divLetters.children.length; i > 0; i--){
        divLetters.removeChild(divLetters.lastChild);
    }
    for(let i of letters){
        let slotLettre = document.createElement("div");
        slotLettre.innerHTML = i;
        slotLettre.addEventListener("click",function (){
            if(slotLettre.innerHTML !== ""){
                checkLetters(slotLettre.innerHTML,mot)
                slotLettre.style.border = "none";
                slotLettre.innerHTML = "";
            }
        })
        divLetters.appendChild(slotLettre);
    }
}

function tabRandomMot(mots){
    let random = Math.trunc(Math.random() * mots.length);
    let mot = mots[random];
    return mot.split("");
}

function checkLetters(lettre,mot){
    if(mot.includes(lettre)){
        if(step < 7){
            let indexLettre = [];
            for(let choixLettre in mot){
                if(mot[choixLettre] === lettre){
                    indexLettre.push(choixLettre);
                }
            }
            for(let i of indexLettre){
                let posLettre = document.getElementsByClassName("lettreAffiche");
                posLettre[i].innerHTML = lettre;
            }
        }
    }
    else{
        if(step > 6){
            divEnd.innerHTML = "PERDU"
            divEnd.style.display = "block"
            initafficherLettre(mot,true);
            step = 1;
        }
        else{
            step ++;
            let nbRestant = document.getElementById("essaiRestant");
            nbRestant.innerHTML = "il te rest " + (7-step) + " essaie";
        }

    }
    afficherImage(step);
}

function initGame(letters,mots){
    step = 1;
    afficherImage(step);
    let mot = tabRandomMot(mots);
    initLetter(letters, mot);
    initafficherLettre(mot);
    console.log(mot);
    console.log(step)
    return mot
}

let mot = initGame(letters,mots)

buttonInput.addEventListener("click",function (){
    if(input.value.length > 0){
        if(JSON.stringify(input.value.split("")) === JSON.stringify(mot)){
            console.log("ok")

            divEnd.innerHTML = "WIN"
            divEnd.style.display = "block"
        }
        else {
            console.log(step);
            step++;
            afficherImage(step);
        }
    }
})

divEnd.addEventListener("click",function(){
    divEnd.style.display = "none"
    mot = initGame(letters,mots)
})
