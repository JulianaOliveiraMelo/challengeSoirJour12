// le prompt on steroids qui s'occupe :
// - de transformer ce qu'a saisi l'utilisateur en entier
// - de re-poser la question tant que l'utilisateur s'obstine à ne pas saisir un entier
// - (super bonus) comme le prompt classique, de proposer un préremplissage du champ de réponse, si on veut, pas d'obligation

var game = {
    "numeroAChercher" : [],
    "numeroEssais" : [],
}
function play(){
    function askNumber(phrase, prefill = "") {
        var number = parseInt(prompt(phrase, prefill), 10);
    
        while (isNaN(number)) {
            number = parseInt(prompt("Saisie invalide. " + phrase, prefill), 10);
        }
    
        return number;
    }
    
    var minBoundary = askNumber("Indiquez une borne inférieure", 0);
    
    var maxBoundary = askNumber("Indiquez une borne supérieure", 100);
    
    // la fonction définit ses paramètres en lui donnant des noms qui lui sont propres
    function getRandom(minValue, maxValue) {
        // le mot clé return va se charger de retourner à quiconque appelle la fonction le résultat de ce charmant calcul
        return Math.round(Math.random() * (maxValue - minValue)) + minValue;
    }
    
    // un nombre aléatoire entre 0 et 500
    // maintenant que j'utilise une fonction et que je stocke son résultat dans une variable, il faut que ma fonction retourne ce résultat
    // et au moment d'exécuter la fonction, on lui passe en arguments des valeurs que nous avons ici stockées dans les variables minBoundary et maxBoundary
    var randomNumber = getRandom(minBoundary, maxBoundary);
    console.log(randomNumber);
    game.numeroAChercher.push(randomNumber);
    // on demande à l'utilisateur un nombre
    var proposition = askNumber("Choisissez un nombre entre " + minBoundary + " et " + maxBoundary);
    
    // on initialise le compteur à 1 plutôt que 0, parce qu'on ne peut essayer 0 fois
    var tries = 1;
    
    // tant que le nombre n'est pas le bon, on redemande
    while (proposition !== randomNumber) {
        // je prépare ma variable indication car je sais que je vais en avoir besoin
        // et je l'initialise avec une chaîne vide, comme ça je sais déjà que c'est une string
        var indication = '';
    
        // après avoir indiqué si c'est plus petit ou plus grand
        if (proposition > randomNumber) {
            indication = "C'est plus petit que " + proposition;
        } else {
            indication = "C'est plus grand que " + proposition;
        }
    
        // on redemande un nombre à l'utilisateur
        proposition = askNumber(indication + ". Choisissez un nombre entre " + minBoundary + " et " + maxBoundary);
    
        // on incrémente le compteur d'essais
        tries++;
    }
    game.numeroEssais.push(tries);
    
    alert("Bravo ! Vous avez trouvé en " + tries + " essai(s)");

    console.log("numero à trouver " + game.numeroAChercher);
    console.log("nombre d'essais " + game.numeroEssais);

    var resultat = window.confirm("Veux tu continuer à jouer ?")

    if(resultat === true){
        play();

    }else if(resultat === false){
        for(var x = 0; x < game.numeroAChercher.length; x++){
           var scoreEssais = game.numeroEssais[x];
           var scoreFinal = "Partie " + (x+1) + " : " + scoreEssais;
           console.log(scoreFinal);
        }
        
    }
}
play();
