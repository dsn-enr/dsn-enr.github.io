if (app.documents.length > 0 && app.selection.length > 0 && app.selection[0].constructor.name === "TextFrame") {

    var textFrame = app.selection[0];

    var groupe1 = ["chat", "chien", "oiseau", "dragon"];
    var groupe2 = ["court", "vole", "mange", "dort"];
    var groupe3 = ["vite", "lentement", "bruyamment", "joyeusement"];

    function choisirUnMot(groupe) {
        return groupe[Math.floor(Math.random() * groupe.length)];
    }

    var mot1 = choisirUnMot(groupe1);
    var mot2 = choisirUnMot(groupe2);
    var mot3 = choisirUnMot(groupe3);

    var phrase = "Le " + mot1 + " " + mot2 + " " + mot3 + ".";

    textFrame.contents = phrase;

} else {
    alert("Attention, sélectionner un bloc de texte avant de lancer le script.");
}
