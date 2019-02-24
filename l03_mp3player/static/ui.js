console.log("wczytano plik Ui.js");

class Ui {
    constructor() {
        console.log("konstruktor klasy Ui");
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
            tr = $("<tr>",{id: file}).click(function(){
                console.log('dziala')
                
                $("tr").each( function(i){
                    if(i==0) $(this).css("backgroundColor", '#1d1d2e')
                    else{
                        $(this).css({class: "notPlayingNow"})
                        $(this).removeClass('currentPlaying')
                        $(this).children().last().html("")
                    } 
                    
                })

                console.log($(this).children().last())
                $(this).removeClass('notPlayingNow')
                $(this).addClass('currentPlaying')
                $("<img>").attr("src", "/img/music-player-play.png").appendTo($(this).children().last())
                
            })

            tr.mouseover(function(){
                $(this).addClass("hoverPlaying")
                $("<img>").attr("src", "/img/music-player-play.png").appendTo($(this).children().last())
            })
            tr.mouseout(function(){
                $(this).removeClass("hoverPlaying")
                $(this).children().last().html("")
            })


            $("<td>",{
                html: obj.currentAlbum
            }).appendTo(tr)

            var title = $("<td>",{
                html: file
            }).click(()=>{
                console.log(file)
                console.log(obj)
                $("#audio_src").attr("src", `../mp3/${obj.currentAlbum}/${file}`)
                $("#nameOfSong").html(file)
                music.load()
                music.play()
            })
            
            title.appendTo(tr)

            $("<td>",{
                html: obj.sizes[i]
            }).click(()=>{
                console.log(file)
            }).appendTo(tr)

            $("<td>",{
                class: "playPause",
            }).appendTo(tr)
            
            tr.appendTo("table")
        })




        var pause = false 
        $("#play").click(()=>{
            if(pause && $("#nameOfSong").html() != ""){
                music.pause()
            }
            else if($("#nameOfSong").html() != ""){
                music.play()

            }
            pause = !pause

        })
    }
}
