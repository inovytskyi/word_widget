import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
	constructor() {
		super('Preloader');
	}

	preload() {
		this.load.bitmapFont(
			'gothic',
			'assets/fonts/gothic.png',
			'assets/fonts/gothic.xml'
		);
		this.load.image('bg', 'assets/images/bg.jpeg');
	}

	create() {
		this.scene.start('Game');
	}
}
