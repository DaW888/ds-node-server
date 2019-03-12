console.log("visual");
class Visual {
	constructor() {
        this.canvas = document.getElementById('canvas')
        // this.canvas.style.width = 700
        // this.canvas.style.height = 700
        // this.canvas.style.border = '1px solid red'
        this.canvas.style.backgroundColor = '#11111a'
        this.ctx = this.canvas.getContext("2d");
        this.render();
        this.rotate = 1;
	}

	render() {
        requestAnimationFrame(this.render.bind(this));
		// console.log(music.getData());
        // this.ctx.strokeStyle = "orange";
        // this.ctx.beginPath()
        this.ctx.lineWidth = 1
        // this.ctx.moveTo(20,20)
        // this.ctx.lineTo(120,20)
        // this.ctx.stroke()
        this.poly(music.getData())
        
    }
    
    poly(data) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var tab = [...data, ...data]
        // tab = tab.filter(e => {return e>0 /*&& e<250*/})
        console.log(tab)
        var size = 150,
            sides = tab.length,
            Xcenter = 425,
            Ycenter = 425;

        this.ctx.beginPath();
        this.ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));
        // this.ctx.moveTo(Xcenter, Ycenter)

        for (var i = 1; i <= sides; i++) {
            this.ctx.lineTo(Xcenter + (size + tab[i-1]) * Math.cos(i * 2 * Math.PI / sides), Ycenter + (size + tab[i-1]) * Math.sin(i * 2 * Math.PI / sides))
        }
        console.log('stop')
        this.ctx.closePath()
        this.ctx.stroke()

        // var grd = this.ctx.createLinearGradient(0,0,this.canvas.width - 100,this.canvas.height - 100);
        // grd.addColorStop(0,"red");
        // grd.addColorStop(0.7,"white");
        // grd.addColorStop(1,"red");

        var grd = this.ctx.createRadialGradient(425, 425, 0, 425, 425, 425);
      
      // Add colors
    //   grd.addColorStop(0, 'rgba(10, 0, 178, 1)');
    //   grd.addColorStop(0.5, 'rgba(255, 0, 0, 1)');
    //   grd.addColorStop(1, 'rgba(255, 252, 0, 0.5)');

    //   grd.addColorStop(0, '#920d3e')
    //   grd.addColorStop(0.5, '#f13756')
    //   grd.addColorStop(1, '#33333d')
    //   grd.addColorStop(0, `rgb(${tab[0]}, ${tab[1]}, ${tab[2]})`)
    //   grd.addColorStop(0.5, `rgb(${tab[10]}, ${tab[12]}, ${tab[14]})`)
    //   grd.addColorStop(1, `rgb(${tab[20]}, ${tab[24]}, ${tab[26]})`)
      grd.addColorStop(0, `rgb(${tab[4]}, ${tab[14]}, ${tab[24]})`)
      grd.addColorStop(0.5, `rgb(${tab[2]}, ${tab[12]}, ${tab[22]})`)
      grd.addColorStop(1, `rgb(${tab[8]}, ${tab[10]}, ${tab[28]})`)

        this.ctx.fillStyle = grd
        this.ctx.fill()

        this.ctx.translate(425, 425);
        this.ctx.rotate(2*Math.PI/tab[9]*1.5)
        this.ctx.translate(-425, -425);
        this.rotate++;
        if(this.rotate>720) this.rotate = 1
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
