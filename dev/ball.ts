/// <reference path="gameOjbect.ts" />


class Ball extends GameObject {
    
    private speedX : number = 0
    private speedY : number = 0
    private speedRotate : number = 0
    private growSpeed : number = 0
    private maxSize : number = 0

    private size : number = 40
    private randomNr : number = 0


    constructor() {
        super()
        
        
        this.div = document.createElement("ball")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
        this.div.style.height = `${this.size}px`
        this.div.style.width = `${this.size}px`
        this.div.style.background = "black"

        

        this.speedX = Math.random() * 2
        this.speedY = Math.random() * 2
        this.speedRotate = Math.random() / 2
        this.growSpeed = Math.random() / 3
        this.maxSize = Math.random() * (250 - 150) + 150;

        this._x = Math.random() * (window.innerWidth - this.div.clientWidth)
        this._y = Math.random() * (window.innerHeight - this.div.clientHeight)

        if(this._x < 250 && this._y < 250){
            this._x +=250
            this._y +=250
        }
        
      
        if(Math.floor(Math.random() * 2) == 0) {
            this.speedX *= -1
            this.randomNr = 1
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

    public grow(){
        this.size+=this.growSpeed
        this.div.style.height = `${this.size}px`
        this.div.style.width = `${this.size}px`


        if(this.size > this.maxSize){
            this.size = this.maxSize
            if(this.randomNr == 1){
                this._rotate+=this.speedRotate
            }else{
                this._rotate-=this.speedRotate
            }
        }


    }

}