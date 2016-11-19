function pronto(){
    var $btn = document.getElementById("salvar_btn");
    $btn.addEventListener("click", function(evt){
        evt.preventDefault();

        var $input = document.getElementById("info_id");
        var texto = $input.value;

        window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
            fs.root.getFile("meu.txt", {create:true, exclusive:false}, function(fe){
                escrever_arquivo(fe, texto);
            })
        }, console.error);
    });

    window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
        fs.root.getFile("meu.txt", {create:false, exclusive:false}, function(fe){
            ler_arquivo(fe);
        })
    }, console.error)
}

function ler_arquivo(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
        };

        reader.readAsText(file);

    }, console.error);
}

function escrever_arquivo(fileEntry, conteudo) {
    fileEntry.createWriter(function (writer) {

        writer.onwriteend = function() {
            console.log("Successful file write...");
        };

        writer.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        if (!conteudo) {
            conteudo = new Blob(['some file data'], { type: 'text/plain' });
        }

        writer.write(conteudo);
    });
}

document.addEventListener("deviceready",pronto);