import {Map} from './../Map';
import {rand, getDistBetween2dots, setSpeed} from './../functions';
import {images} from './../images';


export const defaultShip = {
	w: 20,
	h: 20,
	speedUp: 350,
	speedBrake: 30,
	speedX: 0,
	speedY: 0,
	maxSpeed: 900,
	rotate: 0,
	fireSpeed: 15
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


	// obj - ship cords
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

		this.speedX = rand(0, 700);
		this.speedY = rand(-700, 700);
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


	// Detects the nearest enemy and rotate in it's direction
	setTargetForShooting() {

		// Rotate ship to targetForShooting
		function setRotate() {
			this.rotate = 180 / Math.PI *
				Math.atan2(this.targetForShooting.y - this.y, this.targetForShooting.x - this.x);
		};

		// At start this variable doesn't contains the nearest ship. Passing standart params 
		let nearestShip = {
			x: this.x,
			y: this.y,
			dist: 99999
		};

		// Iterate over all enemy ships and set the nearest
		for (let i = 0; i < ships.length; i++) {
			//if (this.team != ships[i].team) {
			// Little by little reduce the dist
			let dist = getDistBetween2dots( [this.x, this.y], [ships[i].x, ships[i].y] );
			if (dist < 300 && dist != 0) {
				// If current ship are near then previous nearestShip - update nearestShip
				if (dist < nearestShip.dist) {
					nearestShip.x = ships[i].x;
					nearestShip.y = ships[i].y;
					nearestShip.dist = dist;
				};
			};
		};

		// After finding nearestShip - save it as targetForShooting
		this.targetForShooting = {
			x: nearestShip.x,
			y: nearestShip.y
		};

		setRotate();
	};


	setTeammaterForAttack() {
	};

	
	// This function must contain all actions for ship. Calling in Ships.draw()
	behavior() {
		this.moving();
	};

};
