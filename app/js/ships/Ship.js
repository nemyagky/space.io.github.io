import {map} from './../map';
import {rand, getDistBetween2dots, setSpeed} from './../functions';
import {images} from './../images';

export const defaultShip = {
	w: 20,
	h: 20,
	speedUp: 250,
	speedBrake: 30,
	speedX: 0,
	speedY: 0,
	maxSpeed: 400,
	rotate: 0,
	fireSpeed: 15
}

export class Ship {

	constructor(shipSettings, team) {
		// Характеристики всех кораблей при их создании
		this.w = shipSettings.w;
		this.h = shipSettings.h;
		this.team = team;
		if (team == "blue")
			this.image = images.ships.standart_blue;
		if (team == "red")
			this.image = images.ships.standart_red;
		this.speedUp = shipSettings.speedUp;
		this.speedBrake = shipSettings.speedBrake;
		this.speedX = shipSettings.speedX;
		this.speedY = shipSettings.speedY;
		this.maxSpeed = shipSettings.maxSpeed;
		this.rotate = shipSettings.rotate;
		this.fireSpeed = shipSettings.fireSpeed;
		this.fpsAfterShoot = this.fireSpeed;
		this.moveTo = {}
	}

		spawn(obj) {
			if (this.team == "blue") {
				if (obj) {
					this.x = obj.x;
					this.y = obj.y;
					return;
				}
				this.x = 100;
				this.y = 100;
			}
			if (this.team == "red") {
				if (obj) {
					this.x = obj.x;
					this.y = obj.y;
					return;
				}
				this.x = 100;
				this.y = 100;
			}
			this.speedX = rand(0, 700);
			this.speedY = rand(-700, 700);
		};

		// Физика движения
		moving() {
			// Сохраняем контекст вызова костылем для читабельности
			var that = this;
			(function maxSpeed() {
				if (that.speedX > that.maxSpeed)
					that.speedX = that.maxSpeed;
				if (that.speedX < -that.maxSpeed)
					that.speedX = -that.maxSpeed;
				if (that.speedY > that.maxSpeed)
					that.speedY = that.maxSpeed;
				if (that.speedY < -that.maxSpeed)
					that.speedY = -that.maxSpeed;
			})();
			// Тормозит корабль (в зависимости от +/- скорости -/+ speedBrake)
			(function stopShip() {
				if (that.speedX > 0)
					that.speedX -= setSpeed(that.speedBrake);
				if (that.speedX < 0)
					that.speedX += setSpeed(that.speedBrake);
				if (that.speedY > 0)
					that.speedY -= setSpeed(that.speedBrake);
				if (that.speedY < 0)
					that.speedY += setSpeed(that.speedBrake);
				/* // Тормозит, если слишком медленная скорость
				if (that.speedX <= that.speedBrake && that.speedX >= 0) that.speedX = 0
				if (that.speedX >= -that.speedBrake && that.speedX <= 0) that.speedX = 0
				if (that.speedY <= that.speedBrake && that.speedY >= 0) that.speedY = 0
				if (that.speedY <= that.speedBrake && that.speedY >= 0) that.speedY = 0 */
			})();
			(function move() {
				// Изменяем координаты корабля
				that.x += setSpeed(that.speedX);
				that.y += setSpeed(that.speedY);
			})();
			// Протестить
			(function breakNearTheBorder() {
				// Если корабль столкнулся  с краем карты - остановить
				if (that.x <= 0) {
					that.x = 0;
					that.speedX = 0;
				}
				if (that.x + that.w >= map.w) {
					that.x = map.w - that.w;
					that.speedX = 0;
				}
				if (that.y <= 0) {
					that.y = 0;
					that.speedY = 0;
				}
				if (that.y + that.h >= map.h) {
					MainShip.y = map.h - that.h;
					that.speedY = 0;
				}
			})();
		};
		// Определяет ближайщего врага и направляет курсор по его направлению
		setTargetForShooting() {
			this.setRotate = function () {
				this.rotate = 180 / Math.PI *
					Math.atan2(this.targetForShooting.y - this.y, this.targetForShooting.x - this.x);
			};
			var nearestShip = {
				x: this.moveTo.x,
				y: this.moveTo.y,
				dist: 99999
			};
			// Проходится по всем вражеским кораблям и определяет ближайший
			for (var i = 0; i < ships.length; i++) {
				//if (this.team != ships[i].team) {
				var dist = getDistBetween2dots([this.x, this.y], [ships[i].x, ships[i].y]);
				if (dist < 300 && dist != 0) {
					if (dist < nearestShip.dist) {
						nearestShip.x = ships[i].x;
						nearestShip.y = ships[i].y;
						nearestShip.dist = dist;
					}
				}
			}
			this.targetForShooting = {
				x: nearestShip.x,
				y: nearestShip.y
			};
			this.setRotate();
		};
		setTeammaterForAttack() {
		};
		// Стандартное поведение для всех кораблей. Используется для того, чтобы не перезаписывать одну и ту же функцию дважды для главного корабля
		standartBehavior() {
			this.moving();
		};
		behavior() {
			this.standartBehavior();
		};

};
