import 'phaser';
import WordPad from '../objects/wordpad';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game');
	}

	preload() {}

	create() {
		this.bg = this.add.image(0, 0, 'bg').setScale(0.8);
		this.wordpad = new WordPad(this, 300, 5, 410, 410);
	}

	update() {}
}
