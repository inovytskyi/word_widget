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
		if (windowHeight >= windowWidth) {
			canvas.style.width = windowWidth + 'px';
			canvas.style.height = windowWidth + 'px';
		} else {
			canvas.style.width = windowHeight + 'px';
			canvas.style.height = windowHeight + 'px';
		}
	}
}

let game = new Game();
window.game = game;
// window.addEventListener('resize', game.resize, false);
