import {Ship, defaultShip} from './Ship';
import {setSpeed, keyboardPressed, cursor} from '../functions';
import {shoots} from '../shoots';
import {canvas} from '../init';



export let MainShip = new class MsainShip extends Ship {

	constructor() {
		super(defaultShip, 'blue')
	}

	move() {
		this.x += setSpeed(this.speedX)
		this.y += setSpeed(this.speedY)
	}

	behavior() {
	
		let that = this;

		that.moving();
		// Разгоняет корабль, если нажата клавиша
		(function changeSpeed() {
			if (keyboardPressed.w) that.speedY -= setSpeed(that.speedUp)
			if (keyboardPressed.a) that.speedX -= setSpeed(that.speedUp)
			if (keyboardPressed.s) that.speedX += setSpeed(that.speedUp)
			if (keyboardPressed.d) that.speedY += setSpeed(that.speedUp)
		})();
	
	
		(function rotate() {
			// Поворачивает корабль
	
			// Находим угол А между центром корабля (точкой a) и координатой мышки (точкой b)
			// Math.atan2(a - координаты точки a(курсора), b - координаты центра корабля)
			//     .b
			//    ..
			//   . . A
			// a....
			//   B
	
			that.rotate = 180 / Math.PI * Math.atan2(cursor.y - (canvas.height / 2),
				cursor.x - (canvas.width / 2)
			)
		})();

		
		(function makeShoot() {
			// fpsAfterShoot - регулятор частоты выстрелов. Каждый кадр он прибавляется и при достижении определенной отметки он позволяет сделать новый выстрел
			// Затем он обнулятеся
			that.fpsAfterShoot++

			if (cursor.isPressed) {
				// Если прошло достаточно времени с прошлого выстрела
				if (that.fpsAfterShoot > that.fireSpeed) {

					shoots.push({
						w: 7,
						h: 20,
						x: that.x + 43,
						y: that.y,
						team: "blue",
						rotate: that.rotate - 90,
						speed: 20,
						color: "#00FFA9",
						timeAlive: 0
					})
					that.fpsAfterShoot = 0

				}
			}
		})();

	}
}
