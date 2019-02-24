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
	
	stop(){

	}
}