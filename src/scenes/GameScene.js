import 'phaser';
import WordPad from '../objects/wordpad';
import { throws } from 'assert';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game');
	}

	preload() {}

	create() {
		let { width, height } = this.sys.game.canvas;
		let size = Math.min(width, height);
		this.bg = this.add.image(0, 0, 'bg').setOrigin(0);
		this.bg.setDisplaySize(width, height);
		this.wordpad = new WordPad(
			this,
			0.7 * size * 0.5,
			6,
			width / 2,
			height / 2,
			0x999999,
			0xb500b5,
			0xcccccc
		);
	}

	update() {
		this.wordpad.update_line();
	}
}
