//Made by Declan

var spaceship
var laser_arrs = []
var ast_arrs = []
var score = 0
var score_text;
//event emitter
var emitter = new Phaser.Events.EventEmitter();
export default class Shooter extends Phaser.Scene {
	constructor(){
		super("Shooter")
	}
	preload(){
		this.load.image("spaceship", "Assets/spaceship.png")
		this.load.image("laser", "Assets/laser.png")
		this.load.image("asteriod", "Assets/asteriod.png")
	}
	create(){
		//pyhsics
		console.log(Phaser)
		console.log(this)
		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
		spaceship = this.add.sprite(window.innerWidth/2, 800, "spaceship")
		spaceship.scale = 0.3
		score_text = this.add.text(window.innerWidth/14, window.innerHeight/15, `Score: ${score}`, {
			"fontSize": "40px"
		})
		var score_text2 = this.add.text(window.innerWidth/14, window.innerHeight * 2, "TEST")

		this.input.keyboard.on('keydown-SPACE', async function(){
			let laser = this.physics.add.sprite(spaceship.x, spaceship.y, "laser")
			console.log(laser_arrs)
			this.physics.add.collider(laser, ast_arrs, function(laser, asteriod){
				score += 100
				score_text.setText(`Score: ${score}`)
				asteriod.destroy()
				asteriod.speed = 0
				laser.destroy()
			}, null ,this)
			laser.scale = 0.1
			laser_arrs.push(laser)
		}, this)
		this.input.keyboard.on('keydown-A', function(){
			spaceship.x -= 20
		})
		this.input.keyboard.on('keydown-D', function(){
			spaceship.x += 20
		})

		if(ast_arrs){
				for(let i = 0; i < 2;i++){
					let random_num = Math.floor(Math.random() * window.innerWidth)
					let asteriod = this.physics.add.sprite(random_num, 40, "asteriod")
					asteriod.speed = Math.floor(Math.random() * 25)
					ast_arrs.push(asteriod)					
				}
		}
		let that = this
		setInterval(function(){
			if(ast_arrs){
				let random_num = Math.floor(Math.random() * window.innerWidth)
				let asteriod = that.physics.add.sprite(random_num, 40, "asteriod")
				asteriod.speed = Math.floor(Math.random() * 25) + 4;
				ast_arrs.push(asteriod)
			}
		}, 3000)
		emitter.on("score_decrease", function(value, index){
			score -= value
			ast_arrs[index].destroy()
			ast_arrs.splice(index, 1)
			score_text.setText(`Score: ${score}`)
		}, this)
	}
	update(){
		let that = this
		if(laser_arrs.length >= 1){
			laser_arrs.forEach(function(laser){
				laser.y -= 25
				if(laser.y >= window.innerHeight){
					laser.destroy()
				}
			})
		}
		if(ast_arrs){
			ast_arrs.forEach(function(asteriod, index){
				asteriod.y += asteriod.speed
				if(asteriod.y > that.game.config.height){
					console.log("hello")
					emitter.emit("score_decrease", 200, index)
				}
			})
		}
	}
}

