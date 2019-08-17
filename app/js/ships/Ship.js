import {Map} from './../Map';
import {rand, setSpeed} from './../functions';
import {images} from './../images';

export const defaultShip = {
	w: 70,
	h: 70,
	speedUp: 1000,
	speedBrake: 50,
	speedX: 0,
	speedY: 0,
	maxSpeed: 300,
	rotate: 0,
	fireSpeed: 50
};


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
	}


	// obj - ship's cords
	spawn(obj) {
		if (this.team == "blue") {
			if (obj) {
				this.x = obj.x;
				this.y = obj.y;
				return;
			};
			this.x = 100;
			this.y = 100;
		};

		if (this.team == "red") {
			if (obj) {
				this.x = obj.x;
				this.y = obj.y;
				return;
			};
			this.x = 100;
			this.y = 100;
		};

		this.speedX = rand(-300, 300);
		this.speedY = rand(-300, 300);
	};


	// Physics of moving
	moving() {
		// For readability
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

		(function stopShip() {
			if (that.speedX > 0)
				that.speedX -= setSpeed(that.speedBrake);
			if (that.speedX < 0)
				that.speedX += setSpeed(that.speedBrake);
			if (that.speedY > 0)
				that.speedY -= setSpeed(that.speedBrake);
			if (that.speedY < 0)
				that.speedY += setSpeed(that.speedBrake);

			// Stop if speed is too slow. Else it will shake
			if (that.speedX >= that.speedBrake && that.speedX <= 0) that.speedX = 0;
			if (that.speedX <= -that.speedBrake && that.speedX >= 0) that.speedX = 0;
			if (that.speedY >= that.speedBrake && that.speedY <= 0) that.speedY = 0;
			if (that.speedY <= -that.speedBrake && that.speedY >= 0) that.speedY = 0;
		})();

		(function move() {
			// Changing the ship cords depends on timeSpent. Using for optimisation
			that.x += setSpeed(that.speedX);
			that.y += setSpeed(that.speedY);
		})();

		(function breakNearMapBorder() {
			// If the ship collided with the edge of the map - stop it
			if (that.x <= 0) {
				that.x = 0;
				that.speedX = 0;
			}
			if (that.x + that.w >= Map.w) {
				that.x = Map.w - that.w;
				that.speedX = 0;
			}
			if (that.y <= 0) {
				that.y = 0;
				that.speedY = 0;
			}
			if (that.y + that.h >= Map.h) {
				that.y = Map.h - that.h;
				that.speedY = 0;
			}
		})();
	};


};
