console.log("wczytano plik Ui.js");

class Ui {
    constructor() {
        console.log("konstruktor klasy Ui");
        net.doSth(); // wywołanie funkcji z innej klasy
        this.clicks();
    }

    //obsługa kliknięć w Ui

    clicks() {
        $("#div1").click(function() {
            net.sendData();
		});
	
	}
	createDom(){
		console.log("tutaj tworzenie calego htmla")
	}
}
