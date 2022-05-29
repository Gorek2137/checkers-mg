class Net {
    constructor() {
        this.playerWhiteLoggedIn = false;
        this.playerBlackLoggedIn = false;

        this.intervalid = 0;
    }

    login(onLogin) {
        const login = document.getElementById("login-input").value

        console.log("login");

        if (login != "") {
            const body = JSON.stringify({ login: login })

            const headers = { "Content-Type": "application/json" }

            fetch("/login", { method: "post", body, headers })
                .then(response => response.json())
                .then(
                    data => {
                        if (data.isPlayer) {
                            onLogin(login, data.color)
                            window.game.isWhite = data.color == 0
                            document.getElementById("login-errors").innerHTML = ""
                        } else {
                            switch (data.error) {
                                case 0:
                                    document.getElementById("login-errors").innerHTML = "two players already in game"
                                    break;
                                case 1:
                                    document.getElementById("login-errors").innerHTML = "user with that name is already in the game"
                                    break;
                                default:
                                    document.getElementById("login-errors").innerHTML = "unknown error"
                            }
                        }
                    }
                )
        }

        clearInterval(this.intervalid)
        this.intervalid = setInterval(this.update, 1000);
    }

    update() {
        let body = null

        if (!window.game.isPlaying) {
            body = JSON.stringify({
                isPlaying: window.game.isPlaying,
                isWhite: window.game.isWhite,
            })
        }
        else {
            body = JSON.stringify({
                isPlaying: window.game.isPlaying,
                isWhite: window.game.isWhite,
            })
        }


        const headers = { "Content-Type": "application/json" }

        fetch("/update", { method: "post", body, headers })
            .then(response => response.json())
            .then(
                data => {
                    if (data.state == 4) {
                        window.game.hasMove = false
                        console.log("end")
                        document.getElementById("display").style.display = "flex"
                        document.getElementById("display").innerHTML = data.winner ? "You won" : "You lost "
                    }
                    else if (data.state == 3) {
                        document.getElementById("display").style.display = "none"
                        console.log("Recieved Move:", data)
                        window.game.hasMove = true
                        window.game.enemyMove(data.move.from, data.move.to, data.move.isTaking)
                    } else if (data.state == 2) {
                        console.log(window.game.hasMove + "mr pawn do you hahve the move?")
                        if (!window.game.hasMove) {
                            document.getElementById("display").style.display = "flex"
                            document.getElementById("display").innerHTML = "Your opponent has " + data.time + " seconds left";
                        }


                        //document.getElementById("status").innerHTML = (window.game.hasMove ? "You have " : "Your opponent has ") + data.time + " seconds left to move";
                    } else if (data.state == 1) {
                        console.log("game start")

                        document.getElementById("display").style.display = "none"
                        window.game.load()
                    } else {

                    }
                }
            )
    }

    move(from, to, taking) {
        console.log("sent move")

        const body = JSON.stringify({
            isWhite: window.game.isWhite,
            isTaking: taking,
            from: from,
            to: to,
        })

        const headers = { "Content-Type": "application/json" }

        fetch("/move", { method: "post", body, headers })
            .then(response => response.json())
            .then(data => {

            }
            )
    }

    reset() {
        const body = JSON.stringify({ reset: "reset" })
        const headers = { "Content-Type": "application/json" }

        document.getElementById("login-errors").innerHTML = "players reset"

        fetch("/reset", { method: "post", body, headers })
            .then(response => response.json())
            .then(
                data => {
                    clearInterval(this.intervalid)
                    console.log("Reset")
                }
            )
    }
}

export default Net