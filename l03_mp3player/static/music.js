class Music{
	constructor(){
		console.log('ladowanie pliku');
		this.fromVisualSetting = this.loadVisualizationSetting()
		this.dataArray = this.fromVisualSetting[0]
		this.analyser = this.fromVisualSetting[1]
		this.audioContext = this.fromVisualSetting[2]
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

	loadVisualizationSetting(){
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		var audioContext = new AudioContext();
		var audioElement = document.getElementById("audio");
		var source = audioContext.createMediaElementSource(audioElement);
		var analyser = audioContext.createAnalyser();
		source.connect(analyser);
		analyser.connect(audioContext.destination);
		analyser.fftSize = 64;
		var dataArray = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(dataArray);
		console.log(dataArray);
		return [dataArray, analyser, audioContext];
	}

	getData(){
		this.analyser.getByteFrequencyData(this.dataArray);
		return this.dataArray.toString();
	}
	clicks() {
		var that = this
		$(".").on("click", function () {
			that.audioContext.resume().then(function () {
				console.log("audioContext lives!")
			})
		})
		$(".hoverPlaying").click(()=>{
			this.audioContext.resume().then(()=>{
				console.log("audioContext Lives!")
			})
		})
	}
}