console.log("wczytano plik Net.js");

class Net {
	constructor() {
		console.log("konstruktor klasy Net");
		this.sendFirstData();
	}

	sendFirstData() {
		$.ajax({
			url: "../server.js",
			data: { action: "first" },
			type: "POST",
			success: function(data) {
				var obj = JSON.parse(data);
				console.log(obj);
			},
			error: function(xhr, status, error) {
				console.log(xhr);
			},
		}).then((res) => {ui.createDom(JSON.parse(res))});
	}

	sendNextData(albumName){
		$.ajax({
			url: "server.js",
			data: { action: "next", album: albumName},
			type: "POST",
			success: function(data) {
				var obj = JSON.parse(data);
				console.log(obj);
			},
			error: function(xhr, status, error) {
				console.log(xhr);
			},
		}).then((res) => {ui.createDom(JSON.parse(res))});
	}

	sendPlaylist(elementData){ //elementData : album, file, size - ktory jest Stringiem stworzony z JSON.stringify
		$.ajax({
			url: "server.js",
			data: { action: "playlist", playlist: elementData},
			type: "POST",
			contentType: 'application/json; charset=UTF-8',
			success: function(data) {
				var obj = JSON.parse(data);
				console.log(obj);
			},
			error: function(xhr, status, error) {
				console.log(xhr);
			},
		});
	}

}
