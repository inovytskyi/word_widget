export default class WordPad extends Phaser.GameObjects.Container {
	constructor(scene, radius, count, x, y, color, hcolor, bcolor) {
		super(scene, x, y);
		scene.add.existing(this);
		let circle = new Phaser.Geom.Circle(0, 0, radius);
		//		this.bg = scene.add.circle(0, 0, radius + 100, bcolor, 0.6);
		this.bg = scene.add
			.image(0, 0, 'circle')
			.setOrigin(0.5)
			.setAlpha(0.6)
			.setTint(bcolor);
		this.add(this.bg);

		this.letters = [];
		this.bg_circles = [];
		let l = this.getRandomWord(count);
		for (let i = 0; i < count; i++) {
			let bg_circle = new BGCircle(scene, 0, 0, l[i], color, hcolor);
			this.add(bg_circle);
			let letter = scene.add
				.bitmapText(x, y, 'gothic', l[i], 75)
				.setOrigin(0.5, 0.5)
				.setTint(0x000000);
			this.add(letter);
			letter.setDepth(6);
			this.letters.push(letter);
			this.bg_circles.text = l[i];
			this.bg_circles.push(bg_circle);
		}
		Phaser.Actions.PlaceOnCircle(this.bg_circles, circle);
		Phaser.Actions.PlaceOnCircle(this.letters, circle);
		this.current_buttons = [];
		this.curent_word_text = scene.add
			.bitmapText(0, 0, 'gothic', '', 60)
			.setOrigin(0.5, 0.5)
			.setTint(0x000000);
		this.add(this.curent_word_text);
		scene.input.on('gameobjectdown', this.mouseDownHander, this);
		scene.input.on('gameobjectmove', this.mouseMoveHander, this);
		scene.input.on('pointerup', this.mouseUpHander, this);
		this.line_start = undefined;
		this.current_line = undefined;
		this.lines = [];
		this.hcolor = hcolor;
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
		let x = gameObject.x;
		let y = gameObject.y;
		this.current_line = this.scene.add
			.line(0, 0, x, y, x, y, this.hcolor)
			.setLineWidth(6);
		this.addAt(this.current_line, 2);
		this.line_start = { x: x, y: y };
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
			let x = gameObject.x;
			let y = gameObject.y;
			this.current_line.setTo(this.line_start.x, this.line_start.y, x, y);
			this.lines.push(this.current_line);
			this.current_line = this.scene.add
				.line(0, 0, x, y, x, y, this.hcolor)
				.setLineWidth(6);
			this.addAt(this.current_line, 2);

			this.line_start = { x: x, y: y };
		}
	}
	mouseUpHander(pointer) {
		let button = this.current_buttons.pop();
		while (button) {
			button.turnOff();
			button = this.current_buttons.pop();
		}
		for (let line of this.lines) {
			line.destroy();
		}
		this.current_line.destroy();
		this.lines = [];
		this.current_line = undefined;
		// this.curent_word_text.setText('');
	}

	update_line() {
		if (this.current_line) {
			let x = this.scene.input.x - this.x;
			let y = this.scene.input.y - this.y;
			this.current_line.setTo(this.line_start.x, this.line_start.y, x, y);
		}
	}
}

class BGCircle extends Phaser.GameObjects.Container {
	constructor(scene, x, y, letter, color, hcolor) {
		super(scene, x, y);
		scene.add.existing(this);
		this.color = color;
		this.highlight_color = hcolor;
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
