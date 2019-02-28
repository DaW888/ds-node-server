class Music{
	constructor(){
		console.log('ladowanie pliku');
	}

	load(){
		$("#audio").trigger('load')
	}

	play(){
		$("#play").attr("src", "/img/music-player-pause-lines.png")
		$("#audio").trigger("play");
		ui.pause = false
	}
	
	pause(){
		$("#play").attr("src", "/img/music-player-play.png")
		$("#audio").trigger('pause');
		ui.pause = true
	}
	
	next(obj, current){
		var currentSong = obj.files.indexOf(current)
		var nextSong = currentSong + 1
		if(nextSong>= obj.files.length) nextSong = 0

		$(".currentPlaying").removeClass('currentPlaying')
		var nextSongHighlight = document.getElementById(obj.files[nextSong])
		$(nextSongHighlight).addClass('currentPlaying')

		$("#audio_src").attr("src", `../mp3/${obj.currentAlbum}/${obj.files[nextSong]}`)
		$("#nameOfSong").html(obj.files[nextSong])
		this.load()
		this.play()
	}
	prev(obj, current){
		var currentSong = obj.files.indexOf(current)
		var prevSong = currentSong - 1
		if(prevSong < 0) prevSong = obj.files.length -1
		
		$(".currentPlaying").removeClass('currentPlaying')
		var prevSongHighlight = document.getElementById(obj.files[prevSong])
		$(prevSongHighlight).addClass('currentPlaying')

		console.log(`../mp3/${obj.currentAlbum}/${obj.files[currentSong]}`)
		$("#audio_src").attr("src", `../mp3/${obj.currentAlbum}/${obj.files[prevSong]}`)
		$("#nameOfSong").html(obj.files[prevSong])
		this.load()
		this.play()
	}
}