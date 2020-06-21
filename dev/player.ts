class Player extends GameObject {

    private _speed : number = 2

    private left : number = 0
    private right : number = 0
    private up : number = 0
    private down : number = 0


    public set speed(speed : number) {this._speed = speed;}



    constructor() {
        super()

        this.div = document.createElement("player")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.reset()

        this.div.style.transform = `translate(${100}px, ${100}px)`
        this.div.style.height = "30px"
        this.div.style.width = "30px"

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    private onKeyDown(e: KeyboardEvent) : void {
        switch (e.keyCode) {
            case 38:
                this.up = this._speed
                break
        
            case 39:
                this.right = this._speed
                break
            
            case 40:
                this.down = this._speed
                break
            
            case 37:
                this.left = this._speed
                break
        }
    }

    private onKeyUp(e: KeyboardEvent) : void {
        switch (e.keyCode) {
            case 38:
                this.up = 0
                break
        
            case 39:
                this.right = 0
                break
            
            case 40:
                this.down = 0
                break
            
            case 37:
                this.left = 0
                break
        }
    }

    public reset(){
        this._x = 50
        this._y = 50

        console.log("reset")
        this.div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    public update() {
        let newY = this.y - this.up + this.down
        let newX = this.x - this.left + this.right

        if (newY > 0 && newY + this.div.clientHeight < window.innerHeight) this._y = newY
        if (newX > 0 && newX + this.div.clientWidth < window.innerWidth) this._x = newX

        if (this._x > window.innerWidth) {
            this.reset()
        }

        if (this._y > window.innerHeight) {
            this.reset()
        }

        super.update()

    }


}