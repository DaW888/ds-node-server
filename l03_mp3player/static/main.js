var net;
var ui;
var visual;
$(document).ready(function () {
   net = new Net() // utworzenie obiektu klasy Net
   ui = new Ui() // utworzenie obiektu klasy Ui
   music = new Music()
   visual = new Visual()
   
   var off = true
   $(document).keyup((e)=>{
      console.log(e.keyCode)
      if(e.keyCode === 32 && off){
         $("#overlay").css("display", "flex")
         off = false
      } else if(e.keyCode === 32 && !off){
         $("#overlay").css("display", "none")
         off = true
      }
   })
}) 