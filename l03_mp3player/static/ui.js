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
            tr = $("<tr>",{id: file}).mouseover(function(){
                this.style.backgroundColor = "#30304d"
            }).mouseout(function(){
                this.style.backgroundColor = ""
            })
            $("<td>",{
                html: obj.currentAlbum
            }).appendTo(tr)

            $("<td>",{
                html: file
            }).click(()=>{
                console.log(file)
                $("#audio_src").attr("src", `../mp3/${obj.currentAlbum}/${file}`)
            }).appendTo(tr)

            $("<td>",{
                html: obj.sizes[i]
            }).click(()=>{
                console.log(file)
            }).appendTo(tr)
            
            tr.appendTo("table")
        })
    }
}
