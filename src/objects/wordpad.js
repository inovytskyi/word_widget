export default class WordPad extends Phaser.GameObjects.Sprite {
	constructor(scene, radius, count, x, y) {
		super(scene, x, y);
		scene.add.existing(this);
		let circle = new Phaser.Geom.Circle(x, y, radius);
		this.bg = scene.add.circle(x, y, radius + 100, 0xcccccc, 0.6);
		this.letters = [];
		this.bg_circles = [];
		let l = this.getRandomWord(count);
		for (let i = 0; i < count; i++) {
			let bg_circle = new BGCircle(scene, x, y, l[i]);
			let letter = scene.add
				.bitmapText(x, y, 'gothic', l[i], 75)
				.setOrigin(0.5, 0.5);
			this.letters.push(letter);
			this.bg_circles.text = l[i];
			this.bg_circles.push(bg_circle);

			window.bg = this.bg_circle;
		}
		Phaser.Actions.PlaceOnCircle(this.bg_circles, circle);
		Phaser.Actions.PlaceOnCircle(this.letters, circle);
		this.current_buttons = [];
		this.curent_word_text = scene.add
			.bitmapText(x, y, 'gothic', '', 60)
			.setOrigin(0.5, 0.5);
		scene.input.on('gameobjectdown', this.mouseDownHander, this);
		scene.input.on('gameobjectmove', this.mouseMoveHander, this);
		scene.input.on('pointerup', this.mouseUpHander, this);
	}

	getRandomWord(count) {
		let alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		let letter_chain = [];
		for (let i = 0; i < count; i++) {
			let n = Math.floor(Math.random() * alph.length);
			letter_chain += alph.splice(n, 1);
		}

		return letter_chain;
	}

	mouseDownHander(pointer, gameObject) {
		this.current_buttons.push(gameObject);
		this.curent_word_text.setText(gameObject.letter);
		gameObject.turnOn();
	}
	mouseMoveHander(pointer, gameObject) {
		if (
			this.current_buttons.length > 0 &&
			this.current_buttons.indexOf(gameObject) === -1
		) {
			this.current_buttons.push(gameObject);
			gameObject.turnOn();
			this.curent_word_text.setText(
				this.curent_word_text.text + gameObject.letter
			);
		}
	}
	mouseUpHander(pointer) {
		let button = this.current_buttons.pop();
		while (button) {
			button.turnOff();
			button = this.current_buttons.pop();
		}
		// this.curent_word_text.setText('');
	}
}

class BGCircle extends Phaser.GameObjects.Container {
	constructor(scene, x, y, letter) {
		super(scene, x, y);
		scene.add.existing(this);
		this.color = 0x999999;
		this.highlight_color = 0xff0000;
		this.shape = scene.add.circle(0, 0, 90, this.color);
		this.shape.setAlpha(0);
		this.add(this.shape);
		this.letter = letter;
		this.setInteractive(
			new Phaser.Geom.Circle(0, 0, 90),
			Phaser.Geom.Circle.Contains
		);
	}
	turnOn() {
		this.shape.setFillStyle(this.highlight_color);
		this.shape.setAlpha(1);
	}
	turnOff() {
		this.shape.setFillStyle(this.color);
		this.shape.setAlpha(0);
	}
}
