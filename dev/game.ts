class Game {
    
    private h1 : HTMLElement
    private h2 : HTMLElement 
    private h3 : HTMLElement
    private game : Element = document.getElementsByTagName("game")[0]

    private balls : Ball[] = []
    private player : Player
    private lives : number = 3
    private growTime : number = 30
    private growing : boolean = false
    
    private counter : number = 0
    private counterMax : number = 180
    private points : number = 0



    constructor() {

        //lives
        this.h2 = document.createElement("h2")
        this.game.appendChild(this.h2)
        this.h2.innerHTML = `Lives: ${this.lives}`
        this.h2.style.transform = `translate(${window.innerWidth/2}px, ${10}px)`

        //Points
        this.h3 = document.createElement("h3")
        this.game.appendChild(this.h3)
        this.h3.innerHTML = `Points: ${this.points}`
        this.h3.style.transform = `translate(${window.innerWidth/2}px, ${50}px)`

        //Game Over
        this.h1 = document.createElement("h1")
        this.game.appendChild(this.h1)
        this.h1.style.display = "none"
        this.h1.innerHTML = `GAME OVER`


        document.body.style.backgroundColor = "rgb(93, 160, 84)";

        this.player = new Player()
        


        for (let i = 0; i < 20; i++) {
            this.balls.push(new Ball())
        }

        this.gameLoop()
    }


    gameLoop() : void {

        this.player.update()
        console.log(this.lives)

        if(this.lives > 0){
            this.counter++
        }


        if(this.counter > this.counterMax){
            this.counter = 0
            this.points++
            this.h3.innerHTML = `Points: ${this.points}`

            if(this.balls.length < this.growTime){
                this.balls.push(new Ball())
            }
        }

        
        if(this.growing && this.lives == 1){
            this.player.speed = 2
        }


        for (const ball of this.balls) {
            ball.updateBall()


            if(!this.growing) {
                for (const otherBall of this.balls) {
                    if(this.checkCollision(ball.getRectangle(),otherBall.getRectangle())){
                        ball.hit()
                        otherBall.hit()
                    }
                }
            }

            if(this.balls.length == this.growTime) {
                this.growing = true
                ball.grow()
            }


            
            if(this.checkCollision(ball.getRectangle(),this.player.getRectangle())){
                this.lives -= 1
                // this.player.reset()
                this.h2.innerHTML = `Lives: ${this.lives}`

                if(this.lives == 2){
                    
                    this.removeBalls()
                    this.player.speed = 4
                    document.body.style.backgroundColor = "rgb(136, 67, 67)";
                    this.counterMax = 30
                    this.growTime = 20
                }

                    if(this.lives == 1) {

                        this.removeBalls()
                        this.player.speed = 1
                        document.body.style.backgroundColor = "rgb(61, 61, 128)";
                        this.counterMax = 20
                        this.growTime = 30
                    }

                    if(this.lives == 0) {
                        this.removeBalls()
                        this.h2.remove()
                        this.counterMax = 180
                        this.player.speed = 8

                        this.h1.style.display = "block"
                        document.body.style.backgroundColor = "darkslategray";

                    }
            }
        }



        requestAnimationFrame(() => this.gameLoop())

    }

        
    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }

    removeBalls(){
        for (const b of this.balls) {
            b.div.remove()
        }
        this.balls = []
    }
        


}
