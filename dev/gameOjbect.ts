class GameObject {

    public div : HTMLElement
    protected _x : number = 0
    protected _y : number = 0
    protected _rotate : number = 0

    
    public get x() : number {
        return this._x
    }

    public get y() : number {
        return this._y
    }

    public get rotate() : number {
        return this._rotate
    }
    


    constructor() {

        console.log("i'm a game object")
        
    }

        
    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    protected update() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotate}deg)`
    }
}