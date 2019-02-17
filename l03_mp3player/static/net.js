console.log("wczytano plik Net.js");

class Net {
	constructor() {
		this.a = 100; // użycie zmiennych
		this.b = 200;
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
		}).then((res) => {ui.createDom(JSON.parse(res))});;
	}

	doSth(){
		console.log('dosth')
	}
}
