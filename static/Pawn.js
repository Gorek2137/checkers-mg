class Pawn extends THREE.Mesh {

    //let pawnGeometry = new THREE.CylinderGeometry(5, 5, 5, 4);

    //static pawnGeometry = new THREE.BoxGeometry(5, 5, 5)

    constructor(white, creator) {
        let pawnGeometry = new THREE.CylinderGeometry(5, 5, 5, 30);
        console.log(window.document.getElementById('type-selector').value + "amogus ussususususususuwruhygerug")
        let type = window.document.getElementById('type-selector').value
        if (type == "round") {
            pawnGeometry = new THREE.CylinderGeometry(5, 5, 5, 30);
        } else if (type == "sphere") {
            pawnGeometry = new THREE.SphereGeometry(5, 30, 30)
        } else if (type == "cube") {
            pawnGeometry = new THREE.BoxGeometry(5, 5, 5)
        } else {
            pawnGeometry = new THREE.CylinderGeometry(5, 5, 5, 30);
        }

        let pawnWhite = new THREE.MeshBasicMaterial({
            //color: 0xffffff,
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('textures/birch.png'), // plik tekstury
            opacity: 1, // stopień przezroczystości
            transparent: true,
        })

        let pawnBlack = new THREE.MeshBasicMaterial({
            //color: 0xff0000,
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('textures/darkoak.png'), // plik tekstury
            opacity: 1, // stopień przezroczystości
            transparent: true,
        })

        super(pawnGeometry, white ? pawnWhite : pawnBlack) // wywołanie konstruktora klasy z której dziedziczymy czyli z Meshas
        this.isWhite = white
        this.active = true
        this.isPromoted = false
        this.game = creator
    }

    select() {
        this.material.color.setHex(0xff0000)

        new TWEEN.Tween(this.position) // co
            .to({
                x: this.position.x,
                y: 5,
                z: this.position.z
            }, 100) // do jakiej pozycji, w jakim czasie
            .repeat() // liczba powtórzeń
            .easing(TWEEN.Easing.Sinusoidal.InOut) // typ easingu (zmiana w czasie)
            .onUpdate(() => { })
            .onComplete(() => { this.game.isMoving = false }) // funkcja po zakończeniu animacji
            .start()
    }

    deselect() {
        this.material.color.setHex(this.isWhite ? 0xffffff : 0xffffff)

        new TWEEN.Tween(this.position) // co
            .to({
                x: this.position.x,
                y: 0,
                z: this.position.z
            }, 100) // do jakiej pozycji, w jakim czasie
            .repeat() // liczba powtórzeń
            .easing(TWEEN.Easing.Sinusoidal.InOut) // typ easingu (zmiana w czasie)
            .onUpdate(() => { })
            .onComplete(() => { this.game.isMoving = false }) // funkcja po zakończeniu animacji
            .start()
    }

    moveTo(pos, taking) {
        new TWEEN.Tween(this.position) // co
            .to({
                x: pos.x,
                z: pos.z
            }, 500) // do jakiej pozycji, w jakim czasie
            .repeat() // liczba powtórzeń
            .easing(TWEEN.Easing.Sinusoidal.InOut) // typ easingu (zmiana w czasie)
            .onUpdate(() => { })
            .onComplete(() => {
                window.game.isMoving = false
                this.deselect();
            }) // funkcja po zakończeniu animacji
            .start()
    }

    fullMove(pos, taking) {
        new TWEEN.Tween(this.position) // co
            .to({
                x: this.position.x,
                y: 5,
                z: this.position.z
            }, 500) // do jakiej pozycji, w jakim czasie
            .repeat() // liczba powtórzeń
            .easing(TWEEN.Easing.Sinusoidal.InOut) // typ easingu (zmiana w czasie)
            .onUpdate(() => { })
            .onComplete(() => this.moveTo(pos, taking)) // funkcja po zakończeniu animacji
            .start()
    }

    take() {
        let original = { x: this.position.x, z: this.position.z }

        this.active = false
        //this.material.opacity = 0

        new TWEEN.Tween(this.position) // co
            .to({
                x: this.position.x,
                y: -2.1,
                z: this.position.z
            }, 700) // do jakiej pozycji, w jakim czasie
            .repeat() // liczba powtórzeń
            .easing(TWEEN.Easing.Sinusoidal.InOut) // typ easingu (zmiana w czasie)
            .onUpdate(() => { })
            .onComplete(() => {
                this.position.x = 2137
                this.position.y = 2137
                this.position.z = 2137

            }) // funkcja po zakończeniu animacji
            .start()
    }
}

export default Pawn