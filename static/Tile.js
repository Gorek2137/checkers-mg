class Tile extends THREE.Mesh {
    constructor(white) {
        let tileGeometry = new THREE.BoxGeometry(10, 2, 10);

        let boardBlack = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('textures/darkoak.png'), // plik tekstury
            opacity: 1, // stopień przezroczystości

        })

        let boardWhite = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('textures/birch.png'), // plik tekstury
            opacity: 1, // stopień przezroczystości

        })

        super(tileGeometry, white ? boardWhite : boardBlack) // wywołanie konstruktora klasy z której dziedziczymy czyli z Meshas
        this.isWhite = white
    }

    select() {
        this.material.color.setHex(0x00ff00)
    }

    deselect() {
        this.material.color.setHex(this.isWhite ? 0xaaaaaa : 0xaaaaaa)
        //this.material.color.setHex(this.isWhite ? 0xaaaaaa : 0xff0000)
    }
}

export default Tile