console.log("wczytano plik Net.js")

class Net {
    constructor() {
        this.a = 100 // użycie zmiennych
        this.b = 200
        console.log("konstruktor klasy Net")
		this.doSth() // wywołanie funkcji z tej samej klasy
		this.sendData()
    }

    doSth() {
        console.log("funcja doSth " + this.a + " - " + this.b)
    }

    sendData() {
		$.ajax({
			url: "../server.js",
			data: { action: 'first'},
			type: "POST",
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
