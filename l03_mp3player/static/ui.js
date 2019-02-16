console.log("wczytano plik Ui.js");

class Ui {
    constructor() {
        console.log("konstruktor klasy Ui");
        net.doSth(); // wywołanie funkcji z innej klasy
    }

	createDom(obj){
        $("nav").empty()
        $("table").empty()
        console.log(obj)
        obj.dirs.forEach( album => {
            $("<div>", {
                id: album,
                html: album
            }).click(()=>{
                net.sendNextData(album);
            }).appendTo("nav");
        });

        obj.files.forEach(file =>{
            let td = $("<ul>",{id: file})
            $("<td>",{
                html: file
            }).click(()=>{
                console.log('elo')
            }).appendTo(td)
            td.appendTo("table")
        })
    }
}
