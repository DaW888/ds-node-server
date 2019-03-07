console.log("wczytano plik Ui.js");

class Ui {
    constructor() {
        console.log("konstruktor klasy Ui");
        this.pause = false
        this.playlist = []
        this.playlistOn = false
        this.raz = true
    }

	createDom(obj){
        $("nav").empty()
        $("table").empty()
        console.log(obj)
        
        // Tworzneie klikalnych Albumow
        obj.images.forEach( (img, i) => {
            $("<img>", {
                src: "../"+img,
            })
            .click(()=>{
                this.raz = true
                $(".currentPlaying").removeClass('currentPlaying')
                $(".pausePlaying").removeClass("pausePlaying")
                $("#play").off("click")
                $("#next").off("click")
                $("#prev").off("click")
                net.sendNextData(obj.dirs[i]);
            })
            .appendTo("nav");
        });

        // Tworzenie pierwszego rzedu z naglowkami
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

        // Tworzenie zawartosci tabeli
        if(this.raz){
            ui.createDefaultTable(obj, tr);
            console.log('ładowanie normalne')
            this.raz = false
        }

        $("#playlist").off("click");
        $("#playlist").click(()=>{
            this.playlistOn = !this.playlistOn
            ui.createDom(obj)
            if(this.playlistOn)
                ui.createPlaylistTable(obj.playlist, tr)
            else
                ui.createDefaultTable(obj, tr);
        })


        $("#play").click(()=>{
            if(this.pause && $("#nameOfSong").html() != ""){
                music.play()
                $(".pausePlaying").removeClass('pausePlaying').addClass("currentPlaying")
            }
            else if(!this.pause && $("#nameOfSong").html() != ""){
                music.pause()
                $(".currentPlaying").removeClass('currentPlaying').addClass("pausePlaying")
            }
        })

        $("#next").click(()=>{
            $(".currentPlaying").removeClass('currentPlaying')
            $(".pausePlaying").removeClass('pausePlaying')
            if($("#nameOfSong").html() != ""){
                music.next(obj, $("#nameOfSong").html())
            }
        })
        $("#prev").click(()=>{
            $(".currentPlaying").removeClass('currentPlaying')
            $(".pausePlaying").removeClass('pausePlaying')
            if($("#nameOfSong").html() != ""){
                music.prev(obj, $("#nameOfSong").html())
            }
        })

        $("#audio").on("ended", ()=>{
            console.log('koniec')
            music.next(obj, $("#nameOfSong").html())
        })

        $("#audio").on("loadeddata", () => {
            $("#audio").on("timeupdate", () => {
                var songDuration = $("#audio").prop("duration")

                if(isNaN(songDuration)) songDuration = 0
                
                var currentTime = $("#audio").prop("currentTime")
                var progressBar = currentTime / songDuration * 100
                $("#progress").css({ width: progressBar + "%" })                
                var timeDurationDisplay = String(Math.floor(currentTime / 60)).padStart(2, '0') + 
                ":" + String(Math.floor(currentTime % 60)).padStart(2, '0') +
                ' / ' + String(Math.floor(songDuration / 60)).padStart(2, '0') + 
                ":" + String(Math.floor(songDuration % 60)).padStart(2, '0')

                console.log(timeDurationDisplay)
                $("#time-duration").html(timeDurationDisplay)
                // console.log($("#audio").prop('paused'));
            })
        });

    }

    createDefaultTable(obj, tr){
        obj.files.forEach((file, i) =>{
            tr = $("<tr>",{id: file})

            // Nazwa Wykonawcy
            $("<td>",{
                html: obj.currentAlbum
            }).appendTo(tr)
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })

            // Nazwa Piosenki wraz z klikiem na nia, klik odtwarza piosenke od zera
            var title = $("<td>",{
                html: file
            })
            .click(function(){
                $('tr').each(function (i){  // czyszczenie / przygotowanie klasy current playing na clicku
                    if(i==0) $(this).css("backgroundColor", '#1d1d2e')
                    else{
                        $(this).removeClass("pausePlaying")
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
                this.pause = false
            })
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })
            
            title.appendTo(tr)

            // kolumna zawierajaca rozmiar pliku
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

            // dodawanie utworu do playlisty
            $("<td>")
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })
            .click(function(){
                ui.playlist.push({"album": obj.currentAlbum, "file": file, "size": obj.sizes[i]})
                var seen = {}
                ui.playlist = ui.playlist.filter((el, index,self) =>
                    index === self.findIndex((t)=>t.file === el.file))
                console.log(ui.playlist)
                net.sendPlaylist(JSON.stringify(ui.playlist));
            })
            .appendTo(tr)


            // kolumna zawierajaca przycisk play/pause sa one ustawione na background-image w odpowiednich klasach
            $("<td>",{
                class: "playPause",
            })
            .click(function(){
                if(this.pause && $("#nameOfSong").html() == ""){}
                    else if($(this).parent().hasClass('pausePlaying')){
                        $(this).parent().removeClass('pausePlaying')
                        $(this).parent().addClass('currentPlaying')
                        music.play()
                }
                    else if($(this).parent().hasClass('currentPlaying')){
                        $(this).parent().removeClass('currentPlaying')
                        $(this).parent().addClass('pausePlaying')
                        music.pause()
                        this.pause = !this.pause
                    }
            })
            .appendTo(tr)
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })
            
            tr.appendTo("table")

        })
    }

    createPlaylistTable(obj, tr){
        obj.forEach((file, i) =>{
            tr = $("<tr>",{id: file.file})

            // Nazwa Wykonawcy
            $("<td>",{
                html: file.album
            }).appendTo(tr)
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })

            // Nazwa Piosenki wraz z klikiem na nia, klik odtwarza piosenke od zera
            var title = $("<td>",{
                html: file.file
            })
            .click(function(){
                $('tr').each(function (i){  // czyszczenie / przygotowanie klasy current playing na clicku
                    if(i==0) $(this).css("backgroundColor", '#1d1d2e')
                    else{
                        $(this).removeClass("pausePlaying")
                        $(this).removeClass('currentPlaying')
                    }

                })
                $(this).parent().removeClass("hoverPlaying")
                $(this).parent().removeClass("pausePlaying")
                $(this).parent().addClass('currentPlaying')
                console.log( $(this).parent())
                console.log(file)
                console.log(obj)
                $("#audio_src").attr("src", `../mp3/${file.album}/${file.file}`)
                $("#nameOfSong").html(file)
                music.load()
                music.play()
                this.pause = false
            })
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })
            
            title.appendTo(tr)

            // kolumna zawierajaca rozmiar pliku
            $("<td>",{
                html: file.size
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

            // dodawanie utworu do playlisty
            $("<td>")
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })
            .click(function(){
                // ui.playlist.push({"album": obj.currentAlbum, "file": file, "size": obj.sizes[i]})
                // var seen = {}
                // ui.playlist = ui.playlist.filter((el, index,self) =>
                //     index === self.findIndex((t)=>t.file === el.file))
                // console.log(ui.playlist)
                // net.sendPlaylist(JSON.stringify(ui.playlist));
            })
            .appendTo(tr)


            // kolumna zawierajaca przycisk play/pause sa one ustawione na background-image w odpowiednich klasach
            $("<td>",{
                class: "playPause",
            })
            .click(function(){
                if(this.pause && $("#nameOfSong").html() == ""){}
                    else if($(this).parent().hasClass('pausePlaying')){
                        $(this).parent().removeClass('pausePlaying')
                        $(this).parent().addClass('currentPlaying')
                        music.play()
                }
                    else if($(this).parent().hasClass('currentPlaying')){
                        $(this).parent().removeClass('currentPlaying')
                        $(this).parent().addClass('pausePlaying')
                        music.pause()
                        this.pause = !this.pause
                    }
            })
            .appendTo(tr)
            .mouseover(function(){
                $(this).parent().addClass("hoverPlaying")
            })
            .mouseout(function(){
                $(this).parent().removeClass("hoverPlaying")
            })
            
            tr.appendTo("table")

        })
    }
}
//https://stackoverflow.com/questions/27195402/irregular-polygons-that-can-be-inscribed-on-a-circle-html5-canvas
//https://stackoverflow.com/questions/16494262/how-to-draw-a-circle-with-centered-fadeing-out-gradients-with-html5-canvas