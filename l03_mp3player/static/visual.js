
console.log('visual')
class Visual {

    constructor() {
        this.render()
    }

    render() {
		requestAnimationFrame(this.render.bind(this)); 
		console.log(music.getData())
    }

}
