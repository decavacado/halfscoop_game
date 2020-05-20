export default class Title extends Phaser.Scene {
	constructor(){
		super("Title")
	}
	preload(){

	}
	create(){
		//event emitter
		var emitter = new Phaser.Events.EventEmitter()

		var title = this.add.text(window.innerWidth/2, window.innerHeight/2, "Made with ❤️ by Declan")
		var play;
		emitter.on('show', function(){
			play = this.add.text(window.innerWidth/2, window.innerHeight/2 + 40, "P L A Y").setInteractive();
			play.on('pointerover', function(){
				play.setText("[ P L A Y ]")
			})
			play.on('pointerout', function(){
				play.setText("P L A Y")
			})
			play.on('pointerdown', function(){
				this.scene.start("Shooter")
			}, this)
		}, this)
		setTimeout(function(){
			title.setText("Air Shooter")
			emitter.emit('show')	
		}, 4000)
	}
	update(){

	}
}