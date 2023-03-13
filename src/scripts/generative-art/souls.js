let canvas;
let ctx;
let animationRequest;
let newParticle;

const random_rgb = () => {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	return {r: r, g: g, b: b}
};

function random_color (num){
	let aux = []
    for(let i=0; i < num; i++){
		aux.push(random_rgb())
	}
    return aux;
};

window.onload = function(){ 
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    slider()
}

class Particle{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.size = 1;

        this.colors = random_color(4)

        this.a = -11
        this.b = .05
        this.c = .5
        // this.d = Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1)

        console.log(this.colors)
    }
    draw(color){
        let xb = Math.floor(canvas.width*this.x / 990)
        let yb = Math.floor(canvas.height*this.y / 990)

        // console.log(xb)
        // console.log(yb)

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect((canvas.width - xb)/2, (canvas.height - yb)/2, this.size, this.size);
    }
    hopalong(){
        let x = this.x;
        let y = this.y;

        this.x =  y-Math.sqrt(Math.abs(this.b * x - 1 - this.c)) * Math.sin(x) * (Math.round(Math.random()) ? 1 : -1)
        this.y = this.a - x
    }
    map(n, start1, stop1, start2, stop2){
        return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    }
    update(){
        for(let i =0; i < 999999; i++){
            this.hopalong();
            this.draw('rgba(255,255,255,.3)');
        }

        const pixelData = ctx.getImageData(0,0, canvas.width, canvas.height)

        for (let y = 0; y < canvas.height; y++){
            for (let x = 0; x < canvas.width; x++){
                let aux = pixelData.data[(y * 4 * pixelData.width) + (x*4 + 3)];
                const alpha = this.map(aux, 0, 255, 0, 1)
                let color;
                if(alpha > .9)      color = 'rgba(' + this.colors[0].r + ',' + this.colors[0].g + ',' + this.colors[0].b + ',' + (alpha - .2) +')'
                else if(alpha > .8) color = 'rgba(' + this.colors[1].r + ',' + this.colors[1].g + ',' + this.colors[1].b + ',' + alpha +')'
                else if(alpha > .6) color = 'rgba(' + this.colors[2].r + ',' + this.colors[2].g + ',' + this.colors[2].b + ',' + alpha +')'
                else if(alpha > 0)  color = 'rgba(' + this.colors[3].r + ',' + this.colors[3].g + ',' + this.colors[3].b + ',' + alpha +')'
                else color = false;

                if(color != false){
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.fillRect(x, y, 1, 1)
                    ctx.closePath();
                }
            }
        }

        // animationRequest = requestAnimationFrame(this.update.bind(this))
    }
}

function slider(){
    newParticle = new Particle()    
    newParticle.update();
}