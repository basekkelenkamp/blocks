/// <reference path="gameOjbect.ts" />


class Ball extends GameObject {
    
    private speedX : number = 1
    private speedY : number = 1


    constructor() {
        super()
        
        
        this.div = document.createElement("ball")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
        this.div.style.height = "40px"
        this.div.style.width = "40px"
        this.div.style.background = "black"

        

        this.speedX = Math.random() * 2
        this.speedY = Math.random() * 2

        this._x = Math.random() * (window.innerWidth - this.div.clientWidth)
        this._y = Math.random() * (window.innerHeight - this.div.clientHeight)

        if(this._x < 250 && this._y < 250){
            this._x +=250
            this._y +=250
        }
        
      
        if(Math.floor(Math.random() * 2) == 0) {
            this.speedX *= -1
        }
        if(Math.floor(Math.random() * 2) == 0) {
            this.speedY *= -1
        }

    }
    
   public updateBall() : void {
    super.update()

    this._x += this.speedX
    this._y += this.speedY

    let rightWall = window.innerWidth - this.div.clientWidth
    let bottomWall = window.innerHeight - this.div.clientHeight


    if(this.x > rightWall || this.x < 0){
        this.speedX *= -1
    }

    if(this.y > bottomWall || this.y < 0){
        this.speedY *= -1
    }

    }

    public hit(){
        this.speedX *= -1
        this.speedY *= -1
    }

}