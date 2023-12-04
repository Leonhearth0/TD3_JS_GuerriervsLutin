/* V2 = Ajout PVMax, remplacement Do...While par While*/

const prompt = require("prompt-sync")()

/*Entités*/

let GuerrierFeu = {
    cname: "Guerrier du Feu",
    PV: 100,
    PVMax : 100
}

let SombreLutin = {
    cname: "Sombre Lutin",
    PV: 100,
    PVMax : 100
}

let moveset = [
    { attname: "Frappe rapide", effect: -10, hit: () => hitchance(100, 50), choix: "1." },
    { attname: "Coup Puissant", effect: -20, hit: () => hitchance(100, 66.66), choix: "2." },
    { attname: "Frappe Dévastatrice", effect: -30, hit: () => hitchance(100, 75), choix: "3." },
    { attname: "Soin Léger", effect: 15, hit: () => hitchance(100, 66.66), choix: "4." }
]

/*Fonctions de Gameplay */

function hitchance(max, resultToGetForHit) {
    let drawResult = Math.floor(Math.random() * max);
    console.log('Résultat du tirage : ' + drawResult + "/" + resultToGetForHit);
    return drawResult > resultToGetForHit;
}

function playerMoveChoice() {
    console.log("A votre tour.");
    moveset.forEach(element => {
        console.log(element.choix + element.attname)
    });
    let reponseuser = prompt("Que faites-vous? ") // Check si valide
    while (reponseuser != "1" && reponseuser != "2" && reponseuser != "3" && reponseuser != "4") {
        console.log("Choix invalide.");
        reponseuser = prompt("Que faites-vous? ")
    }
    let chosenMove = moveset[reponseuser - 1] // Pour choix user 1 à 3
    if (reponseuser != "4" && chosenMove.hit()) {
        console.log(chosenMove.attname + " a réussi");
        SombreLutin.PV += chosenMove.effect;
        console.log("Il reste " + SombreLutin.PV + " PV au " + SombreLutin.cname)
    }
    else if (reponseuser == "4" && moveset[3].hit()) { // Pour choix user 4
        console.log(moveset[3].attname + " a réussi");
        GuerrierFeu.PV += moveset[3].effect;
        if (GuerrierFeu.PV > GuerrierFeu.PVMax){
            GuerrierFeu.PV = GuerrierFeu.PVMax
        }
        console.log("Vous regagnez de la vie. Vous avez maintenant " + GuerrierFeu.PV + " PV.")
    } else {
        console.log("Attaque échouée")
    }
}

function cpuMoveChoice() {
    console.log("Au tour de l'ennemi"); // Choix aléatoire du CPU
    let reponsecpu = Math.floor(Math.random() * 4) + 1;

    let chosenMove = moveset[reponsecpu - 1]  // Pour choix cpu 1 à 3
    console.log(SombreLutin.cname + " tente d'effectuer " + chosenMove.attname)
    if (reponsecpu != "4" && chosenMove.hit()) {
        console.log(chosenMove.attname + " du " + SombreLutin.cname + " a réussi.");
        GuerrierFeu.PV += chosenMove.effect;
        console.log("Il vous reste " + GuerrierFeu.PV + " PV.")
    }
    else if (reponsecpu == "4" && moveset[3].hit()) { // Pour choix cpu 4
        console.log(moveset[3].attname + " du " + SombreLutin.cname + " a réussi.");
        SombreLutin.PV += moveset[3].effect;
        if (SombreLutin.PV > SombreLutin.PVMax){
            SombreLutin.PV = SombreLutin.PVMax
        }
        console.log(SombreLutin.cname + " regagne de la vie. Il a maintenant " + SombreLutin.PV + " PV.")
    } else {
        console.log(SombreLutin.cname + " regarde un papillon passer. Il rate son attaque.")
    }
}

/* Boucle de Gameplay */

console.log("Vous recontrez le " + SombreLutin.cname + ". Préparez vous à combattre.");

let GameOverCondition = false; //Fin de boucle si statut change
let combatTurn = 0; // Compteur du tour

while (!GameOverCondition) {
    
    console.log("PV " + GuerrierFeu.cname + " : " + GuerrierFeu.PV + " | " + "PV " + SombreLutin.cname + " : " + SombreLutin.PV)
        if (combatTurn % 2 == 0) { // Tour impair = joueur, tour pair = CPU
            playerMoveChoice();
        } else {
            cpuMoveChoice();
        }
    
        if (GuerrierFeu.PV <= 0) {
            console.log("Vous avez perdu.");
            GameOverCondition = true;
        }
        else if (SombreLutin.PV <= 0) {
            console.log("Vous remportez le combat.");
            GameOverCondition = true;
        }
    
        combatTurn++;
    }









