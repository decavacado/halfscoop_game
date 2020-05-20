import Title from './js/title.js'
import Shooter from './js/shooter.js'

var game = new Phaser.Game({
	type: Phaser.AUTO,
	width: window.innerWidth - 20,
	height: window.innerHeight,
	parent: "game",
	physics: {
		default: "arcade",
		acrade: {
			debug: false,
		}
	},
	scene: [Title, Shooter]
})