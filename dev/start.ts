class Start {

    private startGame : HTMLElement
    private p : HTMLElement
    private newGame : Game

    constructor() {

        let game = document.getElementsByTagName("game")[0]
        this.startGame = document.createElement("startgame")
        game.appendChild(this.startGame)
        this.startGame.innerHTML = `Start game`
        // this.startGame.style.transform = `translate(${window.innerWidth/4}px, ${window.innerHeight/4}px)`


        this.p = document.createElement("p")
        game.appendChild(this.p)
        this.p.innerHTML = `Resize window to change difficulty.`
        // this.p.style.transform = `translate(${window.innerWidth/4}px, ${window.innerHeight/4}px)`



        this.startGame.addEventListener("click", ()=> this.startNewGame())
    }

    startNewGame(){
        this.newGame = new Game()
        this.startGame.style.display = "none"
        this.p.style.display = "none"
    }

}

window.addEventListener("load", () => new Start())