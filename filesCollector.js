var files = [];
loadFiles(e.originalEvent.dataTransfer.items, files).then(function() {
    //do here something with the file in files
});

function recoverFiles(items, files) {

    var promises = [];

    for (var i=0; i<items.length; i++) {
        var item = items[i].webkitGetAsEntry();
        if (item) {
            promises.push(traverseFileTree(item, files));
        }
    }

    return Promise.all(promises);
}

// pour votre santé mentale, ne lisez jamais cette fonction
var traverseFileTree = function (entry, list) {

    // la function readEntries doit être appelée dans une Promise
    // pour détecté la fin de l'exécution de la function envoyée en paramètre de cette dernière
    // ce, en appelant resolve() à l'intérieur de la function envoyée en paramètre
    return new Promise(function (resolve, reject) {

        if (entry.isFile) {

            entry.file(function (file) {
                list.push(file);
                resolve();
            });

        } else if (entry.isDirectory) {

            var dirReader = entry.createReader();

            var recursiveReadEntries = function () {

                dirReader.readEntries(function (entries) {

                    var promises = [];

                    for (var i = 0; i < entries.length; i++) {
                        promises.push(traverseFileTree(entries[i], list));
                    }

                    Promise.all(promises).then(function () {

                        // si il y a eu des entrées, la méthode readEntries n'a peut-être pas retourner toutes les fichiers du répertoire
                        // (comme chrome qui ne retourne que les 100 premiers)
                        if (entries.length) {
                            //on appel donc récursivement la méthode readEntries mais toujours dans une nouvelle Promise
                            var recursiveReadEntriesPromise = new Promise(function (resolve, reject) {
                                recursiveReadEntries();
                            });

                            Promise.resolve(recursiveReadEntriesPromise).then(function () {
                                resolve();
                            });

                        } else {
                            resolve();
                        }
                    });
                });
            };
            recursiveReadEntries();
        }
    });
};
