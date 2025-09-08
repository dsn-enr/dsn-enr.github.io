if (app.documents.length > 0 && app.selection.length > 0 && app.selection[0].constructor.name === "Rectangle") {

    var imageFrame = app.selection[0];

    // Dossier contenant les images
    var dossierImages = Folder.selectDialog("Sélectionner le dossier contenant les images");

    if (dossierImages != null) {
        var fichiersImages = dossierImages.getFiles(function (f) {
            return f instanceof File && /\.(jpg|jpeg|png|tif|tiff)$/i.test(f.name);
        });

        if (fichiersImages.length > 0) {
            var imageAleatoire = fichiersImages[Math.floor(Math.random() * fichiersImages.length)];

            // Vider le bloc d'image s'il contient déjà quelque chose
            if (imageFrame.allGraphics.length > 0) {
                imageFrame.allGraphics[0].remove();
            }

            // Placer l'image
            imageFrame.place(imageAleatoire);
            imageFrame.fit(FitOptions.PROPORTIONALLY); // Ajuster l’image au bloc
        } else {
            alert("Aucune image trouvée dans ce dossier.");
        }
    }

} else {
    alert("Veuillez sélectionner un bloc graphique (rectangle vide) avant d’exécuter le script.");
}
