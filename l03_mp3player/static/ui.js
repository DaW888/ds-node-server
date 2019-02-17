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
        
        obj.images.forEach( (img, i) => {
            $("<img>", {
                src: "../"+img,
            }).click(()=>{
                net.sendNextData(obj.dirs[i]);
            }).appendTo("nav");
        });

        let tr = $("<tr>")
        $("<th>",{
            html: 'Performer'
        }).appendTo(tr)

        $("<th>",{
            html: 'Songs'
        }).appendTo(tr)
        tr.appendTo("table")

        $("<th>",{
            html: 'Size'
        }).appendTo(tr)
        tr.appendTo("table")

        obj.files.forEach((file, i) =>{
            tr = $("<tr>",{id: file})
            $("<td>",{
                html: obj.currentAlbum
            }).appendTo(tr)

            $("<td>",{
                html: file
            }).click(()=>{
                console.log('elo')
            }).appendTo(tr)

            $("<td>",{
                html: obj.sizes[i]
            }).click(()=>{
                console.log('elo')
            }).appendTo(tr)
            
            tr.appendTo("table")
        })
    }
}
