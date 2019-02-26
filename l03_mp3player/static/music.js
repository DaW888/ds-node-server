class Music{
	constructor(){
		console.log('ladowanie pliku');
	}

	load(){
		document.getElementById("audio").load()
	}

	play(){
		$("#play").attr("src", "/img/music-player-pause-lines.png")
		document.getElementById("audio").play()
	}

	pause(){
		$("#play").attr("src", "/img/music-player-play.png")
		document.getElementById("audio").pause()
	}
	
	next(obj, current){
		var currentSong = obj.files.indexOf(current)
		var nextSong = currentSong + 1
		if(nextSong>= obj.files.length) nextSong = 0
		console.log(`../mp3/${obj.currentAlbum}/${obj.files[currentSong]}`)
		$("#audio_src").attr("src", `../mp3/${obj.currentAlbum}/${obj.files[nextSong]}`)
		$("#nameOfSong").html(obj.files[nextSong])
		this.load()
		this.play()
		return false //pause
	}
	prev(obj, current){
		var currentSong = obj.files.indexOf(current)
		var prevSong = currentSong - 1
		if(prevSong < 0) prevSong = obj.files.length -1
		console.log(`../mp3/${obj.currentAlbum}/${obj.files[currentSong]}`)
		$("#audio_src").attr("src", `../mp3/${obj.currentAlbum}/${obj.files[prevSong]}`)
		$("#nameOfSong").html(obj.files[prevSong])
		this.load()
		this.play()
		return false //pause
	}
}