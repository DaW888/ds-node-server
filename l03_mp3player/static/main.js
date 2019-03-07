var net;
var ui;
var visual;
$(document).ready(function () {
   net = new Net() // utworzenie obiektu klasy Net
   ui = new Ui() // utworzenie obiektu klasy Ui
   music = new Music()
   visual = new Visual()

   $(document).keyup((e)=>{
      console.log(e.keyCode)
      if(e.keyCode === 32){
         $("#overlay").css("display", "block")
      }
   })
}) 