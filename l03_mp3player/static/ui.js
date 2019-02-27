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
            })
            .click(()=>{
                net.sendNextData(obj.dirs[i]);
            })
            .appendTo("nav");
        });

        let tr = $("<tr>")
        $("<th>",{
            html: 'Performer'
        })
        .appendTo(tr)

        $("<th>",{
            html: 'Songs'
        })
        .appendTo(tr)
        tr.appendTo("table")

        $("<th>",{
            html: 'Size'
        })
        .appendTo(tr)
        tr.appendTo("table")

        obj.files.forEach((file, i) =>{
            tr = $("<tr>",{id: file})

            $("<td>",{
                html: obj.currentAlbum
            }).appendTo(tr)
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })


            var pause = true
            var title = $("<td>",{
                html: file
            })
            .click(function(){
                $('tr').each(function (i){
                    if(i==0) $(this).css("backgroundColor", '#1d1d2e')
                    else{
                        $(this).removeClass("pausePlaying")
                        $(this).css({class: "notPlayingNow"})
                        $(this).removeClass('currentPlaying')
                    }

                })
                $(this).parent().removeClass("hoverPlaying")
                $(this).parent().removeClass("pausePlaying")
                $(this).parent().addClass('currentPlaying')
                console.log( $(this).parent())
                console.log(file)
                console.log(obj)
                $("#audio_src").attr("src", `../mp3/${obj.currentAlbum}/${file}`)
                $("#nameOfSong").html(file)
                music.load()
                music.play()
                pause = false
            })
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })
            
            title.appendTo(tr)

            $("<td>",{
                html: obj.sizes[i]
            })
            .click(()=>{
                console.log(file)
            })
            .appendTo(tr)
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })


            $("<td>",{
                class: "playPause",
            })
            .click(function(){
                if(pause && $("#nameOfSong").html() == ""){}
                else if(pause){
                    // console.log($(this).parent().hasClass('currentPlaying'))
                    if($(this).parent().hasClass('pausePlaying')){
                        $(this).parent().removeClass('pausePlaying')
                        $(this).parent().addClass('currentPlaying')
                        music.play()
                    }
                }
                else {
                    if($(this).parent().hasClass('currentPlaying')){
                        $(this).parent().removeClass('currentPlaying')
                        $(this).parent().addClass('pausePlaying')
                        music.pause()
                    }
                }
                pause = !pause
            })
            .appendTo(tr)
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })
            
            tr.appendTo("table")


            $("#play").click(()=>{
                if(pause && $("#nameOfSong").html() != ""){

                    music.play()
                    pause = !pause
                }
                else if($("#nameOfSong").html() != ""){
                    music.pause()
                    pause = !pause
                }
            })


            
        })
        $("#next").click(()=>{
            if($("#nameOfSong").html() != ""){
                music.next(obj, $("#nameOfSong").html())
            }
        })
        $("#prev").click(()=>{
            if($("#nameOfSong").html() != ""){
                music.prev(obj, $("#nameOfSong").html())
            }
        })

        $("#audio").on("ended", ()=>{
            console.log('koniec')
            music.next(obj, $("#nameOfSong").html())
        })

        $("#audio").on("timeupdate", () => {
            var SongDuration = $("#audio").prop("duration")
            var currentTime = $("#audio").prop("currentTime")
            var progressBar = currentTime / SongDuration * 100
            $("#progress").css({width: progressBar+"%"})
        });

    }
}
