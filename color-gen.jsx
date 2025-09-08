if (app.documents.length > 0 && app.selection.length > 0) {

    var bloc = app.selection[0];

    var couleurs = ["Rouge", "Bleu", "Vert", "Jaune"];

    function choisirUneCouleur(noms) {
        return noms[Math.floor(Math.random() * noms.length)];
    }

    var nomCouleur = choisirUneCouleur(couleurs);

    try {
        var couleur = app.activeDocument.swatches.itemByName(nomCouleur);
        bloc.fillColor = couleur;
    } catch (e) {
        alert("La couleur '" + nomCouleur + "' n'existe pas dans le nuancier.");
    }

} else {
    alert("Veuillez sélectionner un bloc avant d’exécuter le script.");
}
