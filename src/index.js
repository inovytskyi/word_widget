import 'phaser';
import config from './config/config';
import PreloaderScene from './scenes/PreloaderScene';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

class Game extends Phaser.Game {
	constructor() {
		super(config);
		this.scene.add('Boot', BootScene);
		this.scene.add('Preloader', PreloaderScene);
		this.scene.add('MVCGame', GameScene);
		this.scene.start('Boot');
	}

	resize() {
		let canvas = document.querySelector('canvas');
		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;
		if (windowHeight > windowWidth) {
			this.canvas.style.width = windowWidth + 'px';
			this.canvas.style.height = windowWidth + 'px';
		} else {
			this.canvas.style.width = windowHeight + 'px';
			this.canvas.style.height = windowHeight + 'px';
		}
	}
}

window.addEventListener('load', () => {
	let game = new Game();
	game.resize();
	window.addEventListener(
		'resize',
		event => {
			game.resize();
		},
		false
	);
});
